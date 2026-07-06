"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { HeadlineLg, HeadlineMd, BodyLg, BodyMd, LabelMd } from "@/components/ui/Typography";

const CONTACT_ITEMS = [
  { icon: Phone, label: "Phone", value: "+234 810 704 5116", href: "tel:+2348107045116" },
  { icon: Mail, label: "Email", value: "hello@eneskitchen.com", href: "mailto:hello@eneskitchen.com" },
  { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: null },
];

export function ContactContent() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact form */}
        <div className="flex flex-col gap-6">
          <HeadlineLg as="h2" className="text-[24px] md:text-[32px]">Send us a message</HeadlineLg>

          {submitted ? (
            <div className="bg-primary-fixed rounded-lg p-8 text-center flex flex-col items-center gap-4">
              <HeadlineMd className="text-primary">Message received!</HeadlineMd>
              <BodyMd>Thanks for reaching out. We&apos;ll get back to you within a few hours.</BodyMd>
              <Button variant="secondary" onClick={() => setSubmitted(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input id="name" label="Full name" placeholder="Your name" value={form.name} onChange={handleChange} />
                <Input id="phone" label="Phone number" placeholder="+234 810 704 5116" type="tel" value={form.phone} onChange={handleChange} />
              </div>
              <Input id="email" label="Email address" placeholder="you@example.com" type="email" value={form.email} onChange={handleChange} />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-body text-[14px] font-medium text-on-surface">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us about your order or event..."
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] md:text-[16px] text-on-surface placeholder:text-outline border border-outline-variant outline-none transition-all duration-150 hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              <Button variant="primary" onClick={handleSubmit} className="w-full sm:w-auto justify-center">
                Send Message
              </Button>
            </div>
          )}
        </div>

        {/* Contact info + WhatsApp */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <HeadlineLg as="h2" className="text-[24px] md:text-[32px]">Other ways to reach us</HeadlineLg>
            <BodyMd>We&apos;re most responsive on WhatsApp for quick orders and catering enquiries.</BodyMd>
          </div>

          <a
            href="https://wa.me/2348107045116"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-[#25d366]/10 border border-[#25d366]/30 rounded-lg p-5 hover:bg-[#25d366]/15 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#25d366] flex items-center justify-center shrink-0">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div>
              <HeadlineMd as="p" className="text-[18px]">Chat on WhatsApp</HeadlineMd>
              <BodyMd>Ene is usually online — get a reply in minutes.</BodyMd>
            </div>
          </a>

          <div className="flex flex-col gap-4">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <LabelMd className="text-on-surface-variant mb-1">{label}</LabelMd>
                  {href ? (
                    <a href={href} className="font-body text-[16px] text-on-surface hover:text-secondary transition-colors">{value}</a>
                  ) : (
                    <BodyMd className="text-on-surface">{value}</BodyMd>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-low rounded-lg p-6 flex flex-col gap-3">
            <HeadlineMd as="h3" className="text-[18px]">Order & Delivery Hours</HeadlineMd>
            <div className="flex flex-col gap-2">
              {[
                ["Monday – Friday", "8:00 AM – 8:00 PM"],
                ["Saturday", "9:00 AM – 6:00 PM"],
                ["Sunday", "Closed"],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between items-center border-b border-outline-variant last:border-0 pb-2 last:pb-0">
                  <BodyMd className="text-on-surface">{day}</BodyMd>
                  <BodyMd className="font-medium text-on-surface">{time}</BodyMd>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
