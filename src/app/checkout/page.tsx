"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus, Minus, Trash2, CreditCard, Building2,
  Wallet, CheckCircle2, Copy, Check, ShieldCheck,
  MessageCircle, AlertCircle, MapPin,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildWhatsAppUrl, saveOrder } from "@/lib/orders";
import { useSiteSettings, useIsOpen, useDeliveryZones } from "@/hooks/useStore";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type PaymentMethod = "paystack" | "bank-transfer" | "on-delivery" | null;

const SERVICE_CHARGE = 500;
const VIRTUAL_ACCOUNT = {
  bank: "Wema Bank",
  accountName: "Ene's Kitchen / ORDER",
  accountNumber: "9901234567",
};

const DELIVERY_TIMES = [
  "As soon as possible (45–60 min)",
  "In 1 hour",
  "In 2 hours",
  "Schedule for later today",
];

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }
function genRef() { return "ENE-" + Math.random().toString(36).substring(2, 8).toUpperCase(); }

export default function CheckoutPage() {
  const { items, subtotal, increment, decrement, removeItem } = useCart();
  const { settings } = useSiteSettings();
  const { isOpen, reason, nextOpenMsg } = useIsOpen(settings);
  const { zones } = useDeliveryZones();

  const [selectedZoneId, setSelectedZoneId] = useState<string>("");
  const selectedZone = zones.find((z) => z.id === selectedZoneId);
  const deliveryFee = selectedZone?.fee ?? (settings?.deliveryFeeDefault ?? 1500);
  const minOrder = settings?.minOrderAmount ?? 3000;
  const total = subtotal + deliveryFee + SERVICE_CHARGE;
  const belowMinimum = subtotal < minOrder;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [orderRef] = useState(genRef);
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [form, setForm] = useState({
    name: "", phone: "", address: "",
    deliveryTime: DELIVERY_TIMES[0], note: "",
  });
  const [errors, setErrors] = useState<Partial<typeof form> & { zone?: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.id]: "" }));
  }

  function validate() {
    const errs: Partial<typeof form> & { zone?: string } = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.phone.trim()) errs.phone = "Required";
    if (!form.address.trim()) errs.address = "Required";
    if (!selectedZoneId) errs.zone = "Please select your delivery area";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleConfirm() {
    if (!validate() || !paymentMethod) return;

    const payload = {
      ref: orderRef,
      customerName: form.name,
      customerPhone: form.phone,
      deliveryAddress: form.address,
      note: [
        selectedZone ? `Zone: ${selectedZone.name}` : "",
        form.deliveryTime !== DELIVERY_TIMES[0] ? `Delivery: ${form.deliveryTime}` : "",
        form.note,
      ].filter(Boolean).join(" | ") || undefined,
      paymentMethod: paymentMethod === "on-delivery" ? "bank-transfer" as const : paymentMethod as "paystack" | "bank-transfer",
      items,
      subtotal,
      deliveryFee,
      total,
    };

    const url = buildWhatsAppUrl(payload);
    window.open(url, "_blank");
    saveOrder(payload);
    setConfirmed(true);
  }

  function copyAccount() {
    navigator.clipboard.writeText(VIRTUAL_ACCOUNT.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (items.length === 0 && !confirmed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <HeadlineLg>Your cart is empty</HeadlineLg>
        <BodyLg>Add some dishes before checking out.</BodyLg>
        <Link href="/menu"><Button variant="primary">Browse the Menu</Button></Link>
      </main>
    );
  }

  // Kitchen closed — block checkout entirely
  if (!isOpen && !confirmed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center">
          <AlertCircle size={38} className="text-on-tertiary-fixed-variant" />
        </div>
        <HeadlineXl as="h1">We&apos;re closed</HeadlineXl>
        <BodyLg className="max-w-md">{reason}</BodyLg>
        <BodyMd className="text-on-surface font-medium">{nextOpenMsg}</BodyMd>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/menu"><Button variant="secondary">Browse the Menu</Button></Link>
          <a href="https://wa.me/2348107045116" target="_blank" rel="noopener noreferrer">
            <Button variant="primary">Contact Us on WhatsApp</Button>
          </a>
        </div>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center">
          <CheckCircle2 size={38} className="text-primary" />
        </div>
        <HeadlineXl as="h1">Order sent!</HeadlineXl>
        <BodyLg className="max-w-md">
          Your order <span className="font-bold text-on-surface">{orderRef}</span> has been sent
          to our kitchen on WhatsApp. We&apos;ll confirm and give you a delivery time shortly.
        </BodyLg>
        {paymentMethod === "bank-transfer" && (
          <div className="bg-surface-container-low rounded-lg p-5 text-left max-w-sm w-full flex flex-col gap-3">
            <LabelMd className="text-secondary">Complete your payment</LabelMd>
            <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.bank}</BodyMd>
            <BodyMd className="text-on-surface">{VIRTUAL_ACCOUNT.accountName} — {orderRef}</BodyMd>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-[24px] text-primary tracking-wider">{VIRTUAL_ACCOUNT.accountNumber}</span>
              <button onClick={copyAccount} className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <LabelSm>{copied ? "Copied!" : "Copy"}</LabelSm>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/"><Button variant="secondary">Back to Home</Button></Link>
          <Link href="/menu"><Button variant="primary">Order Again</Button></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-10 pb-20 md:pt-14 md:pb-24">
        <HeadlineXl as="h1" className="mb-1">Checkout</HeadlineXl>
        <BodyMd className="mb-10 text-on-surface-variant">Review your selections and complete your order.</BodyMd>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">

          {/* ── Left column ── */}
          <div className="flex flex-col gap-6">

            {/* Order items */}
            <div className="bg-surface-container-lowest rounded-lg shadow-raised overflow-hidden">
              <div className="px-6 py-5 border-b border-outline-variant">
                <HeadlineMd className="text-[18px] md:text-[20px]">Order Items</HeadlineMd>
              </div>
              <div className="divide-y divide-outline-variant">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 px-6 py-4 items-start">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-surface-container-high shrink-0">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <BodyMd className="text-on-surface font-medium leading-snug">{item.name}</BodyMd>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => decrement(item.id)} className="w-7 h-7 rounded-full border border-outline-variant flex items-center justify-center hover:border-primary hover:text-primary transition-colors cursor-pointer">
                          <Minus size={12} />
                        </button>
                        <span className="font-body font-bold text-[15px] w-5 text-center">{item.quantity}</span>
                        <button onClick={() => increment(item.id)} className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:brightness-95 transition-all cursor-pointer">
                          <Plus size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <BodyMd className="text-secondary font-bold">{fmt(item.price * item.quantity)}</BodyMd>
                      <button onClick={() => removeItem(item.id)} className="font-body text-[12px] text-outline hover:text-error transition-colors cursor-pointer flex items-center gap-1">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-outline-variant">
                <Link href="/menu" className="flex items-center gap-2 font-body text-[14px] text-secondary hover:text-primary transition-colors font-medium">
                  <Plus size={16} strokeWidth={2.5} /> Add more items
                </Link>
              </div>
            </div>

            {/* Delivery details */}
            <div className="bg-surface-container-lowest rounded-lg shadow-raised overflow-hidden">
              <div className="px-6 py-5 border-b border-outline-variant">
                <HeadlineMd className="text-[18px] md:text-[20px]">Delivery Details</HeadlineMd>
              </div>
              <div className="p-6 flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input id="name" label="Full Name" placeholder="John Doe" value={form.name} onChange={handleChange} error={errors.name} />
                  <Input id="phone" label="Phone Number" placeholder="+234 800 000 0000" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} />
                </div>

                {/* Delivery zone picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[13px] font-medium text-on-surface flex items-center gap-1.5">
                    <MapPin size={14} className="text-secondary" /> Delivery Area
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {zones.map((zone) => (
                      <button key={zone.id} type="button"
                        onClick={() => { setSelectedZoneId(zone.id); setErrors((e) => ({ ...e, zone: "" })); }}
                        className={`text-left p-3 rounded-lg border-2 transition-all cursor-pointer ${selectedZoneId === zone.id ? "border-primary bg-primary-fixed/20" : "border-outline-variant hover:border-outline"}`}>
                        <BodyMd className={`font-medium text-[13px] ${selectedZoneId === zone.id ? "text-primary" : "text-on-surface"}`}>{zone.name}</BodyMd>
                        <LabelSm className="text-secondary font-bold">{fmt(zone.fee)}</LabelSm>
                      </button>
                    ))}
                  </div>
                  {errors.zone && <span className="font-body text-[12px] text-error">{errors.zone}</span>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="address" className="font-body text-[13px] font-medium text-on-surface">Delivery Address</label>
                  <textarea id="address" rows={3} placeholder="Street address, building number, area" value={form.address} onChange={handleChange}
                    className={`w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface placeholder:text-outline border outline-none hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all ${errors.address ? "border-error" : "border-outline-variant"}`} />
                  {errors.address && <span className="font-body text-[12px] text-error">{errors.address}</span>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="deliveryTime" className="font-body text-[13px] font-medium text-on-surface">Delivery Time</label>
                    <select id="deliveryTime" value={form.deliveryTime} onChange={handleChange}
                      className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface border border-outline-variant outline-none hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer appearance-none">
                      {DELIVERY_TIMES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="note" className="font-body text-[13px] font-medium text-on-surface">Special Instructions</label>
                    <input id="note" type="text" placeholder="e.g. Ring doorbell, no onions" value={form.note} onChange={handleChange}
                      className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface placeholder:text-outline border border-outline-variant outline-none hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-surface-container-lowest rounded-lg shadow-raised overflow-hidden">
              <div className="px-6 py-5 border-b border-outline-variant">
                <HeadlineMd className="text-[18px] md:text-[20px]">Payment Method</HeadlineMd>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "paystack" as const, icon: CreditCard, label: "Pay Online", sub: "VIA PAYSTACK" },
                  { id: "bank-transfer" as const, icon: Building2, label: "Bank Transfer", sub: "MANUAL VERIF." },
                  { id: "on-delivery" as const, icon: Wallet, label: "On Delivery", sub: "CASH OR POS" },
                ].map(({ id, icon: Icon, label, sub }) => (
                  <button key={id} onClick={() => setPaymentMethod(id)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-lg border-2 transition-all cursor-pointer ${paymentMethod === id ? "border-secondary bg-secondary-fixed/30" : "border-outline-variant hover:border-outline"}`}>
                    <Icon size={24} className={paymentMethod === id ? "text-secondary" : "text-on-surface-variant"} />
                    <div className="text-center">
                      <BodyMd className={`font-bold ${paymentMethod === id ? "text-secondary" : "text-on-surface"}`}>{label}</BodyMd>
                      <LabelSm className="text-on-surface-variant tracking-wider">{sub}</LabelSm>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bank transfer details */}
              {paymentMethod === "bank-transfer" && (
                <div className="mx-6 mb-6 bg-surface-container-low rounded-lg p-5 flex flex-col gap-3 animate-fade-in">
                  <LabelMd className="text-secondary">Transfer Details</LabelMd>
                  <div className="flex flex-col gap-1">
                    <LabelSm className="text-on-surface-variant">BANK</LabelSm>
                    <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.bank}</BodyMd>
                  </div>
                  <div className="flex flex-col gap-1">
                    <LabelSm className="text-on-surface-variant">ACCOUNT NAME</LabelSm>
                    <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.accountName} — {orderRef}</BodyMd>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display font-bold text-[24px] text-primary tracking-wider">{VIRTUAL_ACCOUNT.accountNumber}</span>
                    <button onClick={copyAccount} className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer">
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      <LabelSm>{copied ? "Copied!" : "Copy"}</LabelSm>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Summary card — dark green */}
            <div className="bg-primary rounded-lg p-6 flex flex-col gap-4">
              <HeadlineMd className="text-inverse-on-surface text-[18px]">Order Summary</HeadlineMd>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <BodyMd className="text-inverse-on-surface/70">Subtotal</BodyMd>
                  <BodyMd className="text-inverse-on-surface font-medium">{fmt(subtotal)}</BodyMd>
                </div>
                <div className="flex justify-between">
                  <BodyMd className="text-inverse-on-surface/70">
                    Delivery {selectedZone ? `(${selectedZone.name.split("—")[0].trim()})` : ""}
                  </BodyMd>
                  <BodyMd className="text-inverse-on-surface font-medium">{fmt(deliveryFee)}</BodyMd>
                </div>
                <div className="flex justify-between">
                  <BodyMd className="text-inverse-on-surface/70">Service Charge</BodyMd>
                  <BodyMd className="text-inverse-on-surface font-medium">{fmt(SERVICE_CHARGE)}</BodyMd>
                </div>
                <div className="border-t border-inverse-on-surface/20 pt-3 flex justify-between items-center">
                  <LabelMd className="text-inverse-on-surface">Total</LabelMd>
                  <BodyLg as="span" className="font-bold text-secondary-container text-[20px]">{fmt(total)}</BodyLg>
                </div>
              </div>

              {/* Minimum order warning */}
              {belowMinimum && (
                <div className="bg-tertiary-fixed/20 border border-tertiary-fixed rounded-lg px-4 py-3 flex items-start gap-2">
                  <AlertCircle size={15} className="text-on-tertiary-fixed-variant shrink-0 mt-0.5" />
                  <LabelSm className="text-inverse-on-surface/80 leading-relaxed">
                    Minimum order is {fmt(minOrder)}. Add {fmt(minOrder - subtotal)} more to proceed.
                  </LabelSm>
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={!paymentMethod || belowMinimum}
                className="w-full flex items-center justify-center gap-2 bg-secondary text-on-secondary rounded-full px-6 py-4 font-body font-bold text-[15px] hover:brightness-95 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-raised"
              >
                {belowMinimum ? `Minimum order ${fmt(minOrder)}` : "Confirm & Pay →"}
              </button>

              <div className="flex items-center justify-center gap-2 text-inverse-on-surface/60">
                <ShieldCheck size={14} />
                <LabelSm>Secure 256-bit SSL Encrypted Payment</LabelSm>
              </div>
            </div>

            {/* WhatsApp help card */}
            <a href="https://wa.me/2348107045116" target="_blank" rel="noopener noreferrer"
              className="bg-surface-container-lowest rounded-lg p-5 flex items-center gap-4 shadow-raised hover:shadow-overlay transition-shadow">
              <div className="w-11 h-11 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <BodyMd className="text-on-surface font-medium">Need help with your order?</BodyMd>
                <BodyMd className="text-secondary text-[13px]">Chat with Ene now</BodyMd>
              </div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
