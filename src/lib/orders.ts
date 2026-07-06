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

export interface OrderResult {
  success: boolean;
  error?: string;
  whatsappUrl?: string;
}

const KITCHEN_WHATSAPP = "2348107045116"; // ← Temp test number — swap for real kitchen number before go-live

export async function submitOrder(payload: OrderPayload): Promise<OrderResult> {
  // 1. Save to Supabase
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
    items: payload.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      priceFormatted: item.priceFormatted,
      quantity: item.quantity,
    })),
  });

  if (error) {
    console.error("Supabase order error:", error);
    return { success: false, error: error.message };
  }

  // 2. Build WhatsApp message
  const itemLines = payload.items
    .map((i) => `  • ${i.name} x${i.quantity} — ${i.priceFormatted}`)
    .join("\n");

  const paymentLabel =
    payload.paymentMethod === "bank-transfer"
      ? "Bank Transfer (awaiting payment)"
      : "Paystack (paid online)";

  const message = [
    `🍽️ *New Order — ${payload.ref}*`,
    ``,
    `*Customer*`,
    `Name: ${payload.customerName}`,
    `Phone: ${payload.customerPhone}`,
    payload.customerEmail ? `Email: ${payload.customerEmail}` : null,
    ``,
    `*Delivery Address*`,
    payload.deliveryAddress,
    payload.note ? `\nNote: ${payload.note}` : null,
    ``,
    `*Items*`,
    itemLines,
    ``,
    `Subtotal: ₦${payload.subtotal.toLocaleString("en-NG")}`,
    `Delivery: ₦${payload.deliveryFee.toLocaleString("en-NG")}`,
    `*Total: ₦${payload.total.toLocaleString("en-NG")}*`,
    ``,
    `*Payment:* ${paymentLabel}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const whatsappUrl = `https://wa.me/${KITCHEN_WHATSAPP}?text=${encodeURIComponent(message)}`;

  return { success: true, whatsappUrl };
}
