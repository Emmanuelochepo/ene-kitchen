"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard, Building2, ChevronRight,
  CheckCircle2, Copy, Check, Loader2,
  AlertCircle, MessageCircle
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { submitOrder } from "@/lib/orders";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  HeadlineXl, HeadlineLg, HeadlineMd,
  BodyLg, BodyMd, LabelMd, LabelSm,
} from "@/components/ui/Typography";

type PaymentMethod = "paystack" | "bank-transfer" | null;
type Step = "details" | "payment" | "whatsapp" | "done";

const DELIVERY_FEE = 1500;
const VIRTUAL_ACCOUNT = {
  bank: "Wema Bank",
  accountName: "Ene's Kitchen / ORDER",
  accountNumber: "9901234567",
};

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }
function genRef() { return "ENE-" + Math.random().toString(36).substring(2, 8).toUpperCase(); }

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const total = subtotal + (items.length > 0 ? DELIVERY_FEE : 0);

  const [step, setStep] = useState<Step>("details");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [orderRef] = useState(genRef);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", note: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.id]: "" }));
  }

  function validateDetails() {
    const errs: Partial<typeof form> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    if (!form.address.trim()) errs.address = "Delivery address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleContinueToPayment() {
    if (validateDetails()) setStep("payment");
  }

  async function handleSaveOrder() {
    if (!paymentMethod) return;
    setSubmitting(true);
    setSubmitError("");

    const result = await submitOrder({
      ref: orderRef,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email || undefined,
      deliveryAddress: form.address,
      note: form.note || undefined,
      paymentMethod,
      items,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      total,
    });

    setSubmitting(false);

    if (!result.success) {
      setSubmitError("Something went wrong saving your order. Please try again.");
      return;
    }

    // Save order to Supabase — NOW tell the user to send via WhatsApp
    clear();
    setWhatsappUrl(result.whatsappUrl ?? "");
    setStep("whatsapp");
  }

  function copyAccount() {
    navigator.clipboard.writeText(VIRTUAL_ACCOUNT.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Empty cart guard
  if (items.length === 0 && step === "details") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <HeadlineLg>Nothing to check out</HeadlineLg>
        <BodyLg>Your cart is empty.</BodyLg>
        <Link href="/menu"><Button variant="primary">Browse the Menu</Button></Link>
      </main>
    );
  }

  // Step: "Almost there" — order saved, waiting for WhatsApp send
  if (step === "whatsapp") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center gap-6 max-w-lg mx-auto">
        {/* Warning state — not confirmed yet */}
        <div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center">
          <MessageCircle size={38} className="text-tertiary" />
        </div>

        <div className="flex flex-col gap-3">
          <HeadlineXl as="h1">Almost there!</HeadlineXl>
          <BodyLg className="max-w-md">
            Your order <span className="font-bold text-on-surface">{orderRef}</span> has been saved.
          </BodyLg>
        </div>

        {/* Clear warning */}
        <div className="bg-tertiary-fixed rounded-lg px-6 py-5 flex gap-3 text-left w-full max-w-md">
          <AlertCircle size={20} className="text-on-tertiary-fixed-variant shrink-0 mt-0.5" />
          <BodyMd className="text-on-tertiary-fixed-variant">
            <span className="font-bold text-on-surface">Your order is not confirmed yet.</span> Tap
            the button below to send it to our kitchen on WhatsApp. We&apos;ll confirm and begin
            preparing once we receive your message.
          </BodyMd>
        </div>

        {/* Bank transfer details — shown if that's the payment method */}
        {paymentMethod === "bank-transfer" && (
          <div className="bg-surface-container-low rounded-lg p-5 text-left w-full max-w-md flex flex-col gap-3">
            <LabelMd className="text-secondary">Also transfer payment to:</LabelMd>
            <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.bank}</BodyMd>
            <BodyMd className="text-on-surface">{VIRTUAL_ACCOUNT.accountName} — {orderRef}</BodyMd>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-[24px] text-primary tracking-wider">
                {VIRTUAL_ACCOUNT.accountNumber}
              </span>
              <button onClick={copyAccount} className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <LabelSm>{copied ? "Copied!" : "Copy"}</LabelSm>
              </button>
            </div>
            <BodyMd className="text-[12px] text-on-surface-variant">
              Transfer exactly <span className="font-bold text-on-surface">{fmt(total)}</span> using your order ref as the narration.
            </BodyMd>
          </div>
        )}

        {/* Primary WhatsApp action — real <a> tag, opens directly on click, no popup */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setTimeout(() => setStep("done"), 1500)}
          className="flex items-center justify-center gap-3 w-full max-w-md bg-[#25d366] text-white rounded-full px-8 py-4 font-body font-bold text-[16px] hover:brightness-95 active:scale-95 transition-all shadow-raised"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send Order to Kitchen on WhatsApp
        </a>

        <BodyMd className="text-on-surface-variant text-[13px]">
          WhatsApp will open with your order pre-filled. Just tap <span className="font-bold text-on-surface">Send</span>.
        </BodyMd>
      </main>
    );
  }

  // Step: done — order sent via WhatsApp
  if (step === "done") {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center">
          <CheckCircle2 size={38} className="text-primary" />
        </div>
        <HeadlineXl as="h1">Order confirmed!</HeadlineXl>
        <BodyLg className="max-w-md">
          Your order <span className="font-bold text-on-surface">{orderRef}</span> has been sent
          to our kitchen. We&apos;ll reply on WhatsApp to confirm and give you a delivery time.
        </BodyLg>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/"><Button variant="secondary">Back to Home</Button></Link>
          <Link href="/menu"><Button variant="primary">Order Again</Button></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 pb-20 md:pt-16 md:pb-24">
        <HeadlineXl as="h1" className="mb-2">Checkout</HeadlineXl>
        <BodyMd className="mb-10">
          Order ref: <span className="font-bold text-on-surface">{orderRef}</span>
        </BodyMd>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">

            {/* Step 1 — Delivery details */}
            <div className={`rounded-lg border-2 overflow-hidden ${step === "details" ? "border-primary" : "border-outline-variant"}`}>
              <div className="flex items-center justify-between px-6 py-4 bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-bold ${step !== "details" ? "bg-primary text-on-primary" : "bg-secondary text-on-secondary"}`}>
                    {step !== "details" ? <Check size={14} /> : "1"}
                  </span>
                  <HeadlineMd className="text-[18px]">Delivery Details</HeadlineMd>
                </div>
                {step === "payment" && (
                  <button onClick={() => setStep("details")} className="font-body text-[13px] text-secondary hover:underline cursor-pointer">Edit</button>
                )}
              </div>

              {step === "details" && (
                <div className="p-6 flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input id="name" label="Full name *" placeholder="Your name" value={form.name} onChange={handleChange} error={errors.name} />
                    <Input id="phone" label="Phone number *" placeholder="+234 800 000 0000" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} />
                  </div>
                  <Input id="email" label="Email (optional)" placeholder="you@example.com" type="email" value={form.email} onChange={handleChange} />
                  <Input id="address" label="Delivery address *" placeholder="Street, area, Lagos" value={form.address} onChange={handleChange} error={errors.address} />
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="note" className="font-body text-[13px] font-medium text-on-surface">Special instructions (optional)</label>
                    <textarea id="note" rows={3} placeholder="Notes for the kitchen or delivery..." value={form.note} onChange={handleChange}
                      className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface placeholder:text-outline border border-outline-variant outline-none hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all" />
                  </div>
                  <Button variant="primary" onClick={handleContinueToPayment} className="w-full sm:w-auto justify-center">
                    Continue to Payment <ChevronRight size={16} />
                  </Button>
                </div>
              )}

              {step === "payment" && (
                <div className="px-6 py-4 bg-surface-container-lowest">
                  <BodyMd className="text-on-surface font-medium">{form.name} · {form.phone}</BodyMd>
                  <BodyMd>{form.address}</BodyMd>
                </div>
              )}
            </div>

            {/* Step 2 — Payment */}
            {step === "payment" && (
              <div className="rounded-lg border-2 border-primary overflow-hidden">
                <div className="flex items-center gap-3 px-6 py-4 bg-surface-container-low">
                  <span className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[13px] font-bold">2</span>
                  <HeadlineMd className="text-[18px]">Payment Method</HeadlineMd>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  {/* Paystack */}
                  <button onClick={() => setPaymentMethod("paystack")}
                    className={`w-full text-left rounded-lg border-2 p-5 transition-all cursor-pointer ${paymentMethod === "paystack" ? "border-primary bg-primary-fixed/20" : "border-outline-variant hover:border-outline"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#00C3F7]/15 flex items-center justify-center shrink-0">
                        <CreditCard size={20} className="text-[#00C3F7]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <HeadlineMd as="span" className="text-[16px]">Pay with Paystack</HeadlineMd>
                          <span className="text-[11px] font-bold bg-[#00C3F7] text-white px-2 py-0.5 rounded-full shrink-0">Recommended</span>
                        </div>
                        <BodyMd className="text-[13px]">Card, bank, USSD, or mobile money — secured by Paystack</BodyMd>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "paystack" ? "border-primary" : "border-outline-variant"}`}>
                        {paymentMethod === "paystack" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </button>

                  {/* Bank transfer */}
                  <button onClick={() => setPaymentMethod("bank-transfer")}
                    className={`w-full text-left rounded-lg border-2 p-5 transition-all cursor-pointer ${paymentMethod === "bank-transfer" ? "border-primary bg-primary-fixed/20" : "border-outline-variant hover:border-outline"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                        <Building2 size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <HeadlineMd as="span" className="text-[16px]">Direct Bank Transfer</HeadlineMd>
                        <BodyMd className="text-[13px]">Transfer to a generated account — confirmed on receipt</BodyMd>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === "bank-transfer" ? "border-primary" : "border-outline-variant"}`}>
                        {paymentMethod === "bank-transfer" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                  </button>

                  {/* Bank transfer details */}
                  {paymentMethod === "bank-transfer" && (
                    <div className="bg-surface-container-low rounded-lg p-5 flex flex-col gap-3 animate-fade-in">
                      <LabelMd className="text-secondary">Transfer Details</LabelMd>
                      <div className="flex flex-col gap-1">
                        <LabelSm className="text-on-surface-variant">BANK</LabelSm>
                        <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.bank}</BodyMd>
                      </div>
                      <div className="flex flex-col gap-1">
                        <LabelSm className="text-on-surface-variant">ACCOUNT NAME</LabelSm>
                        <BodyMd className="text-on-surface font-medium">{VIRTUAL_ACCOUNT.accountName} — {orderRef}</BodyMd>
                      </div>
                      <div className="flex flex-col gap-1">
                        <LabelSm className="text-on-surface-variant">ACCOUNT NUMBER</LabelSm>
                        <div className="flex items-center gap-3">
                          <span className="font-display font-bold text-[26px] text-primary tracking-wider">{VIRTUAL_ACCOUNT.accountNumber}</span>
                          <button onClick={copyAccount} className="flex items-center gap-1.5 text-secondary hover:text-primary transition-colors cursor-pointer">
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <LabelSm>{copied ? "Copied!" : "Copy"}</LabelSm>
                          </button>
                        </div>
                      </div>
                      <BodyMd className="text-[12px] text-on-surface-variant border-t border-outline-variant pt-3">
                        Transfer exactly <span className="font-bold text-on-surface">{fmt(total)}</span>. Order confirmed once payment is received.
                      </BodyMd>
                    </div>
                  )}

                  {submitError && (
                    <div className="flex items-center gap-2 bg-error-container text-on-error-container rounded-lg px-4 py-3">
                      <AlertCircle size={16} className="shrink-0" />
                      <BodyMd className="text-[13px]">{submitError}</BodyMd>
                    </div>
                  )}

                  {paymentMethod && (
                    <Button
                      variant="primary"
                      onClick={handleSaveOrder}
                      disabled={submitting}
                      className="w-full justify-center mt-2"
                    >
                      {submitting ? (
                        <><Loader2 size={16} className="animate-spin" /> Saving order...</>
                      ) : (
                        <>Continue to WhatsApp <ChevronRight size={16} /></>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 flex flex-col gap-4 lg:sticky lg:top-28">
            <HeadlineMd as="h2" className="text-[18px]">Order Summary</HeadlineMd>
            <div className="flex flex-col gap-3 max-h-48 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <BodyMd className="text-on-surface flex-1 leading-snug">{item.name} <span className="text-outline">×{item.quantity}</span></BodyMd>
                  <BodyMd className="text-on-surface font-medium shrink-0">{fmt(item.price * item.quantity)}</BodyMd>
                </div>
              ))}
            </div>
            <div className="border-t border-outline-variant pt-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <BodyMd className="text-on-surface">Subtotal</BodyMd>
                <BodyMd className="text-on-surface">{fmt(subtotal)}</BodyMd>
              </div>
              <div className="flex justify-between">
                <BodyMd className="text-on-surface">Delivery</BodyMd>
                <BodyMd className="text-on-surface">{fmt(DELIVERY_FEE)}</BodyMd>
              </div>
            </div>
            <div className="border-t border-outline-variant pt-4 flex justify-between items-center">
              <LabelMd className="text-on-surface">Total</LabelMd>
              <BodyLg as="span" className="font-bold text-secondary text-[20px]">{fmt(total)}</BodyLg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
