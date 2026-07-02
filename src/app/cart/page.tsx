"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";

const DELIVERY_FEE = 1500;

function formatPrice(n: number) {
  return `₦${n.toLocaleString("en-NG")}`;
}

export default function CartPage() {
  const { items, totalItems, subtotal, increment, decrement, removeItem } = useCart();
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center gap-6">
        <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center">
          <ShoppingCart size={32} className="text-outline" />
        </div>
        <HeadlineLg as="h1">Your cart is empty</HeadlineLg>
        <BodyLg className="max-w-sm">Add some dishes from our menu and they&apos;ll appear here.</BodyLg>
        <Link href="/menu">
          <Button variant="primary">Browse the Menu</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-12 pb-20 md:pt-16 md:pb-24">
        <HeadlineXl as="h1" className="mb-10">
          Your cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </HeadlineXl>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">
          {/* Items list */}
          <div className="flex flex-col divide-y divide-outline-variant">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-6">
                {/* Image */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-surface-container-high shrink-0">
                  {item.image && (
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <HeadlineMd className="text-[16px] md:text-[18px] leading-snug truncate">{item.name}</HeadlineMd>
                  <BodyMd className="text-secondary font-bold">{item.priceFormatted}</BodyMd>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-1">
                    <button
                      onClick={() => decrement(item.id)}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface hover:border-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-body font-bold text-[16px] w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increment(item.id)}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:brightness-95 transition-all cursor-pointer"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>

                {/* Line total + remove */}
                <div className="flex flex-col items-end justify-between shrink-0">
                  <BodyLg as="span" className="font-bold text-on-surface text-[15px] md:text-[16px]">
                    {formatPrice(item.price * item.quantity)}
                  </BodyLg>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-outline hover:text-error transition-colors cursor-pointer p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <Link href="/menu" className="font-body text-[14px] text-secondary hover:underline">
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 md:p-8 flex flex-col gap-5 lg:sticky lg:top-28">
            <HeadlineMd as="h2" className="text-[20px]">Order Summary</HeadlineMd>

            <div className="flex flex-col gap-3 border-b border-outline-variant pb-5">
              <div className="flex justify-between">
                <BodyMd className="text-on-surface">Subtotal</BodyMd>
                <BodyMd className="text-on-surface font-medium">{formatPrice(subtotal)}</BodyMd>
              </div>
              <div className="flex justify-between">
                <BodyMd className="text-on-surface">Delivery fee</BodyMd>
                <BodyMd className="text-on-surface font-medium">{formatPrice(deliveryFee)}</BodyMd>
              </div>
              <div className="flex justify-between text-[12px] text-on-surface-variant font-body">
                <span>Lagos Island & Mainland</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <LabelMd className="text-on-surface">Total</LabelMd>
              <BodyLg as="span" className="font-bold text-secondary text-[20px]">{formatPrice(total)}</BodyLg>
            </div>

            <Link href="/checkout" className="block">
              <Button variant="primary" className="w-full justify-center">
                Proceed to Checkout
              </Button>
            </Link>

            <BodyMd className="text-center text-[12px]">
              Secure checkout · Orders confirmed via WhatsApp
            </BodyMd>
          </div>
        </div>
      </div>
    </main>
  );
}
