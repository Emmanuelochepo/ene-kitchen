import { supabase } from "@/lib/supabase";
import type { CartItem } from "@/context/CartContext";

export interface OrderPayload {
  ref: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  note?: string;
  paymentMethod: "paystack" | "bank-transfer";
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const KITCHEN_WHATSAPP = "2348107045116"; // ← Temp test number — swap before go-live

/** Build the WhatsApp URL synchronously — no async needed */
export function buildWhatsAppUrl(payload: OrderPayload): string {
  const itemLines = payload.items
    .map((i) => `  ${i.quantity}x ${i.name} — ${i.priceFormatted}`)
    .join("\n");

  const paymentLabel =
    payload.paymentMethod === "bank-transfer"
      ? "Bank Transfer ⏳ (awaiting payment)"
      : "Paystack ✅ (paid online)";

  const lines = [
    `🍽️ *NEW ORDER — ${payload.ref}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Customer*`,
    `${payload.customerName}`,
    `📞 ${payload.customerPhone}`,
    payload.customerEmail ? `✉️ ${payload.customerEmail}` : "",
    ``,
    `📍 *Delivery Address*`,
    `${payload.deliveryAddress}`,
    payload.note ? `📝 *Note:* ${payload.note}` : "",
    ``,
    `🛒 *Order Items*`,
    itemLines,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `Subtotal:  ₦${payload.subtotal.toLocaleString("en-NG")}`,
    `Delivery:  ₦${payload.deliveryFee.toLocaleString("en-NG")}`,
    `*Total:    ₦${payload.total.toLocaleString("en-NG")}*`,
    ``,
    `💳 *Payment:* ${paymentLabel}`,
    `━━━━━━━━━━━━━━━━━━━━`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${KITCHEN_WHATSAPP}?text=${encodeURIComponent(lines)}`;
}

/** Save order to Supabase — called in the background after WhatsApp opens */
export async function saveOrder(payload: OrderPayload): Promise<void> {
  const { error } = await supabase.from("orders").insert({
    ref: payload.ref,
    status: "pending",
    payment_method: payload.paymentMethod,
    customer_name: payload.customerName,
    customer_phone: payload.customerPhone,
    customer_email: payload.customerEmail || null,
    delivery_address: payload.deliveryAddress,
    note: payload.note || null,
    subtotal: payload.subtotal,
    delivery_fee: payload.deliveryFee,
    total: payload.total,
    items: payload.items.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      priceFormatted: i.priceFormatted,
      quantity: i.quantity,
    })),
  });
  if (error) console.error("Supabase order error:", error);
}
