"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase-client";
import { HeadlineXl, HeadlineMd, BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";
import { ChevronDown } from "lucide-react";

const STATUSES = ["pending", "confirmed", "preparing", "delivered"];
const STATUS_COLORS: Record<string, string> = {
  pending:   "bg-tertiary-fixed text-on-surface",
  confirmed: "bg-primary-fixed text-primary",
  preparing: "bg-secondary-fixed text-on-secondary-fixed",
  delivered: "bg-[#dcfce7] text-[#166534]",
};

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    let q = supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (filter !== "all") q = q.eq("status", filter);
    const { data } = await q;
    setOrders(data ?? []);
    setLoading(false);
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    const supabase = createClient();
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <HeadlineXl as="h1" className="text-[22px] md:text-[28px]">Orders</HeadlineXl>
        <BodyMd>Manage and update incoming orders.</BodyMd>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {["all", ...STATUSES].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-2 font-body text-[13px] font-bold capitalize transition-colors cursor-pointer ${filter === s ? "bg-primary text-on-primary" : "bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border border-outline-variant"}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <BodyMd>Loading orders...</BodyMd>
      ) : orders.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-lg p-10 text-center">
          <BodyMd>No orders found.</BodyMd>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-surface-container-lowest rounded-lg shadow-raised overflow-hidden">
              {/* Order header */}
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-surface-container transition-colors cursor-pointer">
                <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                  <div>
                    <LabelSm className="text-on-surface-variant">Ref</LabelSm>
                    <p className="font-body font-bold text-[14px] text-primary">{order.ref}</p>
                  </div>
                  <div>
                    <LabelSm className="text-on-surface-variant">Customer</LabelSm>
                    <p className="font-body text-[13px] text-on-surface truncate">{order.customer_name}</p>
                  </div>
                  <div>
                    <LabelSm className="text-on-surface-variant">Total</LabelSm>
                    <p className="font-body font-bold text-[14px] text-secondary">{fmt(order.total)}</p>
                  </div>
                  <div>
                    <LabelSm className="text-on-surface-variant">Date</LabelSm>
                    <p className="font-body text-[13px] text-on-surface">
                      {new Date(order.created_at).toLocaleString("en-NG", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
                <span className={`shrink-0 text-[11px] font-bold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.status]}`}>
                  {order.status}
                </span>
                <ChevronDown size={16} className={`shrink-0 text-outline transition-transform ${expanded === order.id ? "rotate-180" : ""}`} />
              </button>

              {/* Expanded details */}
              {expanded === order.id && (
                <div className="border-t border-outline-variant px-5 py-5 flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Customer info */}
                    <div className="flex flex-col gap-2">
                      <LabelMd className="text-secondary">Customer Details</LabelMd>
                      <BodyMd className="text-on-surface font-medium">{order.customer_name}</BodyMd>
                      <BodyMd>{order.customer_phone}</BodyMd>
                      {order.customer_email && <BodyMd>{order.customer_email}</BodyMd>}
                      <BodyMd>{order.delivery_address}</BodyMd>
                      {order.note && <BodyMd className="italic">Note: {order.note}</BodyMd>}
                    </div>

                    {/* Payment info */}
                    <div className="flex flex-col gap-2">
                      <LabelMd className="text-secondary">Payment</LabelMd>
                      <BodyMd className="capitalize text-on-surface font-medium">{order.payment_method?.replace("-", " ")}</BodyMd>
                      <div className="flex flex-col gap-1 text-[13px] font-body text-on-surface-variant">
                        <span>Subtotal: {fmt(order.subtotal)}</span>
                        <span>Delivery: {fmt(order.delivery_fee)}</span>
                        <span className="font-bold text-on-surface">Total: {fmt(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex flex-col gap-2">
                    <LabelMd className="text-secondary">Items</LabelMd>
                    <div className="flex flex-col gap-1">
                      {(order.items ?? []).map((item: any, i: number) => (
                        <div key={i} className="flex justify-between font-body text-[13px]">
                          <span className="text-on-surface">{item.name} <span className="text-outline">×{item.quantity}</span></span>
                          <span className="text-on-surface font-medium">{fmt(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status update */}
                  <div className="flex flex-col gap-2">
                    <LabelMd className="text-secondary">Update Status</LabelMd>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button key={s} onClick={() => updateStatus(order.id, s)}
                          className={`rounded-full px-4 py-2 font-body text-[12px] font-bold capitalize transition-all cursor-pointer ${order.status === s ? STATUS_COLORS[s] + " ring-2 ring-offset-1 ring-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high border border-outline-variant"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
