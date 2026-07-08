"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// ─── Types ───────────────────────────────────────────────

export interface SiteSettings {
  minOrderAmount: number;
  deliveryFeeDefault: number;
  openDays: number[];    // 0=Sun … 6=Sat
  openTime: string;      // "08:00"
  closeTime: string;     // "20:00"
  isAcceptingOrders: boolean;
}

export interface DeliveryZone {
  id: string;
  name: string;
  areas: string[];
  fee: number;
  active: boolean;
}

export interface MenuStock {
  id: string;
  inStock: boolean;
  stockCount: number | null;
  isChiller: boolean;
}

// ─── Settings ────────────────────────────────────────────

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("settings").select("key,value").then(({ data }) => {
      if (!data) return;
      const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
      setSettings({
        minOrderAmount: parseInt(map.min_order_amount ?? "3000"),
        deliveryFeeDefault: parseInt(map.delivery_fee_default ?? "1500"),
        openDays: (map.open_days ?? "1,2,3,4,5,6").split(",").map(Number),
        openTime: map.open_time ?? "08:00",
        closeTime: map.close_time ?? "20:00",
        isAcceptingOrders: map.is_accepting_orders !== "false",
      });
      setLoading(false);
    });
  }, []);

  return { settings, loading };
}

// ─── Delivery zones ───────────────────────────────────────

export function useDeliveryZones() {
  const [zones, setZones] = useState<DeliveryZone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("delivery_zones")
      .select("*")
      .eq("active", true)
      .order("fee")
      .then(({ data }) => {
        if (data) {
          setZones(
            data.map((z) => ({
              id: z.id,
              name: z.name,
              areas: z.areas,
              fee: z.fee,
              active: z.active,
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  return { zones, loading };
}

// ─── Menu stock ───────────────────────────────────────────

export function useMenuStock() {
  const [stock, setStock] = useState<Record<string, MenuStock>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("menu_items").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, MenuStock> = {};
        data.forEach((item) => {
          map[item.id] = {
            id: item.id,
            inStock: item.in_stock,
            stockCount: item.stock_count,
            isChiller: item.is_chiller,
          };
        });
        setStock(map);
      }
      setLoading(false);
    });
  }, []);

  return { stock, loading };
}

// ─── Is the kitchen open right now? ──────────────────────

export function useIsOpen(settings: SiteSettings | null): {
  isOpen: boolean;
  reason: string;
  nextOpenMsg: string;
} {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!settings) return { isOpen: false, reason: "loading", nextOpenMsg: "" };

  if (!settings.isAcceptingOrders) {
    return {
      isOpen: false,
      reason: "We are temporarily not accepting orders.",
      nextOpenMsg: "Please check back soon or contact us on WhatsApp.",
    };
  }

  const day = now.getDay();
  const timeStr = now.toTimeString().slice(0, 5); // "HH:MM"

  if (!settings.openDays.includes(day)) {
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nextOpen = settings.openDays
      .map((d) => (d > day ? d - day : 7 - day + d))
      .sort((a, b) => a - b)[0];
    const nextDay = DAYS[(day + nextOpen) % 7];
    return {
      isOpen: false,
      reason: "We're closed today.",
      nextOpenMsg: `We reopen ${nextDay} at ${settings.openTime}.`,
    };
  }

  if (timeStr < settings.openTime) {
    return {
      isOpen: false,
      reason: "We're not open yet.",
      nextOpenMsg: `We open today at ${settings.openTime}.`,
    };
  }

  if (timeStr >= settings.closeTime) {
    return {
      isOpen: false,
      reason: "We've closed for the day.",
      nextOpenMsg: `We reopen tomorrow at ${settings.openTime}.`,
    };
  }

  return { isOpen: true, reason: "", nextOpenMsg: "" };
}
