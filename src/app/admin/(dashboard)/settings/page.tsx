"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { HeadlineXl, HeadlineMd, BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ToggleLeft, ToggleRight, Plus, Trash2, Loader2, Check } from "lucide-react";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [zones, setZones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [minOrder, setMinOrder] = useState("3000");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("20:00");
  const [openDays, setOpenDays] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [accepting, setAccepting] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from("settings").select("key,value"),
      supabase.from("delivery_zones").select("*").order("fee"),
    ]).then(([{ data: s }, { data: z }]) => {
      if (s) {
        const map = Object.fromEntries(s.map((r: any) => [r.key, r.value]));
        setSettings(map);
        setMinOrder(map.min_order_amount ?? "3000");
        setOpenTime(map.open_time ?? "08:00");
        setCloseTime(map.close_time ?? "20:00");
        setOpenDays((map.open_days ?? "1,2,3,4,5,6").split(",").map(Number));
        setAccepting(map.is_accepting_orders !== "false");
      }
      setZones(z ?? []);
      setLoading(false);
    });
  }, []);

  async function saveSettings() {
    setSaving(true);
    const supabase = createClient();
    const updates = [
      { key: "min_order_amount", value: minOrder },
      { key: "open_time", value: openTime },
      { key: "close_time", value: closeTime },
      { key: "open_days", value: openDays.sort().join(",") },
      { key: "is_accepting_orders", value: String(accepting) },
    ];
    await Promise.all(updates.map((u) => supabase.from("settings").upsert(u, { onConflict: "key" })));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleDay(d: number) {
    setOpenDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  }

  async function addZone() {
    const supabase = createClient();
    const { data } = await supabase.from("delivery_zones").insert({
      name: "New Zone", areas: ["Area 1"], fee: 2000, active: true,
    }).select().single();
    if (data) setZones((prev) => [...prev, data]);
  }

  async function updateZone(id: string, field: string, value: any) {
    setZones((prev) => prev.map((z) => z.id === id ? { ...z, [field]: value } : z));
    const supabase = createClient();
    await supabase.from("delivery_zones").update({ [field]: value }).eq("id", id);
  }

  async function deleteZone(id: string) {
    const supabase = createClient();
    await supabase.from("delivery_zones").delete().eq("id", id);
    setZones((prev) => prev.filter((z) => z.id !== id));
  }

  if (loading) return <BodyMd>Loading settings...</BodyMd>;

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div>
        <HeadlineXl as="h1" className="text-[18px] md:text-[24px]">Settings</HeadlineXl>
        <BodyMd>Manage operating hours, minimum order, and delivery zones.</BodyMd>
      </div>

      {/* Kill switch */}
      <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 flex flex-col gap-4">
        <HeadlineMd className="text-[16px] md:text-[18px]">Order Acceptance</HeadlineMd>
        <div className="flex items-center justify-between gap-4 p-4 rounded-lg border-2 border-outline-variant">
          <div>
            <BodyMd className="text-on-surface font-bold">Accepting Orders</BodyMd>
            <LabelSm className="text-on-surface-variant">Turn this off to immediately stop all new orders across the site.</LabelSm>
          </div>
          <button onClick={() => setAccepting((a) => !a)} className="cursor-pointer shrink-0">
            {accepting
              ? <ToggleRight size={36} className="text-[#25d366]" />
              : <ToggleLeft size={36} className="text-outline" />}
          </button>
        </div>
      </div>

      {/* Hours */}
      <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 flex flex-col gap-5">
        <HeadlineMd className="text-[16px] md:text-[18px]">Operating Hours</HeadlineMd>

        <div className="flex flex-col gap-2">
          <LabelMd className="text-on-surface">Open Days</LabelMd>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day, i) => (
              <button key={day} onClick={() => toggleDay(i)}
                className={`rounded-full px-3 py-1.5 font-body text-[12px] font-bold transition-colors cursor-pointer border ${openDays.includes(i) ? "bg-primary text-on-primary border-primary" : "bg-transparent text-on-surface-variant border-outline-variant hover:border-outline"}`}>
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[13px] font-medium text-on-surface">Opening Time</label>
            <input type="time" value={openTime} onChange={(e) => setOpenTime(e.target.value)}
              className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface border border-outline-variant outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-[13px] font-medium text-on-surface">Closing Time</label>
            <input type="time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)}
              className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface border border-outline-variant outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" />
          </div>
        </div>

        <Input id="minOrder" label="Minimum Order Amount (₦)" placeholder="3000"
          type="number" value={minOrder} onChange={(e) => setMinOrder(e.target.value)} />
      </div>

      {/* Delivery zones */}
      <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <HeadlineMd className="text-[16px] md:text-[18px]">Delivery Zones</HeadlineMd>
          <button onClick={addZone} className="flex items-center gap-1.5 font-body text-[13px] text-secondary font-bold hover:text-primary transition-colors cursor-pointer">
            <Plus size={15} /> Add Zone
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {zones.map((zone) => (
            <div key={zone.id} className="border border-outline-variant rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-4">
                <input
                  value={zone.name}
                  onChange={(e) => updateZone(zone.id, "name", e.target.value)}
                  className="flex-1 font-body font-bold text-[14px] text-on-surface bg-transparent border-b border-outline-variant outline-none focus:border-primary pb-1 transition-colors"
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => updateZone(zone.id, "active", !zone.active)} className="cursor-pointer">
                    {zone.active ? <ToggleRight size={22} className="text-[#25d366]" /> : <ToggleLeft size={22} className="text-outline" />}
                  </button>
                  <button onClick={() => deleteZone(zone.id)} className="p-1 text-outline hover:text-error transition-colors cursor-pointer">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <LabelSm className="text-on-surface-variant">Delivery Fee (₦)</LabelSm>
                  <input type="number" value={zone.fee}
                    onChange={(e) => updateZone(zone.id, "fee", parseInt(e.target.value))}
                    className="font-body text-[14px] font-bold text-secondary bg-surface-container-low rounded-md px-3 py-2 border border-outline-variant outline-none focus:border-primary transition-colors" />
                </div>
                <div className="flex flex-col gap-1">
                  <LabelSm className="text-on-surface-variant">Areas (comma separated)</LabelSm>
                  <input value={(zone.areas ?? []).join(", ")}
                    onChange={(e) => updateZone(zone.id, "areas", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
                    className="font-body text-[13px] text-on-surface bg-surface-container-low rounded-md px-3 py-2 border border-outline-variant outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save button */}
      <Button variant="primary" onClick={saveSettings} disabled={saving} className="w-full sm:w-auto justify-center">
        {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</>
          : saved ? <><Check size={15} /> Saved!</>
          : "Save All Settings"}
      </Button>
    </div>
  );
}
