"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-client";
import { ShoppingBag, UtensilsCrossed, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { HeadlineXl, HeadlineLg, HeadlineMd, BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";

const STATUS_COLORS: Record<string, string> = {
  pending:    "bg-tertiary-fixed text-on-surface",
  confirmed:  "bg-primary-fixed text-primary",
  preparing:  "bg-secondary-fixed text-on-secondary-fixed",
  delivered:  "bg-[#dcfce7] text-[#166534]",
};

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, today: 0, revenue: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const [{ data: orders }, { data: todayOrders }] = await Promise.all([
        supabase.from("orders").select("id,total,status,created_at,customer_name,ref,payment_method").order("created_at", { ascending: false }).limit(50),
        supabase.from("orders").select("id,total").gte("created_at", todayStart.toISOString()),
      ]);

      if (orders) {
        setRecentOrders(orders.slice(0, 8));
        const revenue = orders.filter(o => o.status !== "pending").reduce((s, o) => s + o.total, 0);
        const pending = orders.filter(o => o.status === "pending").length;
        setStats({
          total: orders.length,
          today: todayOrders?.length ?? 0,
          revenue,
          pending,
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  const STAT_CARDS = [
    { label: "Total Orders", value: stats.total, icon: ShoppingBag, color: "bg-primary-fixed text-primary" },
    { label: "Today's Orders", value: stats.today, icon: Clock, color: "bg-secondary-fixed text-secondary" },
    { label: "Total Revenue", value: fmt(stats.revenue), icon: TrendingUp, color: "bg-[#dcfce7] text-[#166534]" },
    { label: "Pending", value: stats.pending, icon: UtensilsCrossed, color: "bg-tertiary-fixed text-on-surface" },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <HeadlineXl as="h1" className="text-[22px] md:text-[28px]">Dashboard</HeadlineXl>
        <BodyMd>Welcome back. Here&apos;s what&apos;s happening today.</BodyMd>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-surface-container-lowest rounded-lg p-5 flex flex-col gap-3 shadow-raised">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center ${color}`}>
              <Icon size={17} />
            </div>
            <div>
              <p className="font-display font-bold text-[20px] md:text-[24px] text-primary leading-none">
                {loading ? "—" : value}
              </p>
              <LabelSm className="text-on-surface-variant mt-1">{label}</LabelSm>
            </div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-surface-container-lowest rounded-lg shadow-raised overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
          <HeadlineMd className="text-[16px] md:text-[18px]">Recent Orders</HeadlineMd>
          <Link href="/admin/orders" className="flex items-center gap-1 font-body text-[13px] text-secondary hover:text-primary transition-colors font-medium">
            View all <ChevronRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="px-6 py-10 text-center">
            <BodyMd>Loading orders...</BodyMd>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center">
            <BodyMd>No orders yet.</BodyMd>
          </div>
        ) : (
          <div className="divide-y divide-outline-variant">
            {recentOrders.map((order) => (
              <Link key={order.id} href={`/admin/orders?ref=${order.ref}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-body font-bold text-[14px] text-on-surface">{order.ref}</p>
                  <BodyMd className="text-[12px] truncate">{order.customer_name}</BodyMd>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-body font-bold text-[14px] text-secondary">{fmt(order.total)}</p>
                  <LabelSm className="text-on-surface-variant">
                    {new Date(order.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                  </LabelSm>
                </div>
                <span className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[order.status] ?? "bg-surface-container text-on-surface"}`}>
                  {order.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
