"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase-client";
import { HeadlineXl, HeadlineMd, BodyMd, LabelMd, LabelSm } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Plus, Pencil, Trash2, X, Upload, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";

const CATEGORIES = ["Rice & Grains", "Soups & Swallow", "Proteins & Grills", "Sides", "Vegan", "Drinks"];
const BADGES = [
  { label: "None", value: "" },
  { label: "Hot", value: "Hot", variant: "spice" },
  { label: "Popular", value: "Popular", variant: "gold" },
  { label: "Vegan", value: "Vegan", variant: "forest" },
  { label: "Chef's Special", value: "Chef's Special", variant: "gold" },
  { label: "New", value: "New", variant: "spice" },
];

const EMPTY_FORM = {
  id: "", name: "", description: "", price: "",
  category: CATEGORIES[0], image_url: "",
  badge_label: "", badge_variant: "",
  in_stock: true, is_chiller: false, active: true,
};

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function fmt(n: number) { return "₦" + n.toLocaleString("en-NG"); }

export default function MenuPage() {
  const [dishes, setDishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function loadDishes() {
    const supabase = createClient();
    const { data } = await supabase.from("dishes").select("*").order("sort_order").order("created_at");
    setDishes(data ?? []);
    setLoading(false);
  }

  useEffect(() => { loadDishes(); }, []);

  function openAdd() {
    setForm({ ...EMPTY_FORM });
    setPreview("");
    setEditId(null);
    setShowForm(true);
  }

  function openEdit(dish: any) {
    setForm({
      id: dish.id, name: dish.name, description: dish.description,
      price: String(dish.price), category: dish.category,
      image_url: dish.image_url ?? "",
      badge_label: dish.badge_label ?? "", badge_variant: dish.badge_variant ?? "",
      in_stock: dish.in_stock, is_chiller: dish.is_chiller, active: dish.active,
    });
    setPreview(dish.image_url ?? "");
    setEditId(dish.id);
    setShowForm(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "enes-kitchen/dishes");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message ?? "Upload failed");
      }

      const data = await res.json();
      setForm((f) => ({ ...f, image_url: data.secure_url }));
      setPreview(data.secure_url);
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price || !form.description.trim()) return;
    setSaving(true);
    const supabase = createClient();
    const id = editId ?? slugify(form.name);
    const payload = {
      id,
      name: form.name.trim(),
      description: form.description.trim(),
      price: parseInt(form.price),
      category: form.category,
      image_url: form.image_url || null,
      badge_label: form.badge_label || null,
      badge_variant: form.badge_variant || null,
      in_stock: form.in_stock,
      is_chiller: form.is_chiller,
      active: form.active,
    };

    if (editId) {
      await supabase.from("dishes").update(payload).eq("id", editId);
    } else {
      await supabase.from("dishes").insert(payload);
    }

    await loadDishes();
    setShowForm(false);
    setSaving(false);
  }

  async function toggleStock(dish: any) {
    const supabase = createClient();
    await supabase.from("dishes").update({ in_stock: !dish.in_stock }).eq("id", dish.id);
    setDishes((prev) => prev.map((d) => d.id === dish.id ? { ...d, in_stock: !d.in_stock } : d));
  }

  async function deleteDish(id: string) {
    const supabase = createClient();
    await supabase.from("dishes").delete().eq("id", id);
    setDishes((prev) => prev.filter((d) => d.id !== id));
    setDeleteConfirm(null);
  }

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = dishes.filter((d) => d.category === cat);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <HeadlineXl as="h1" className="text-[18px] md:text-[24px]">Menu</HeadlineXl>
          <BodyMd>Add, edit, or remove dishes. Toggle stock for chiller items.</BodyMd>
        </div>
        <Button variant="primary" size="sm" onClick={openAdd} className="shrink-0">
          <Plus size={16} /> Add Dish
        </Button>
      </div>

      {loading ? <BodyMd>Loading menu...</BodyMd> : (
        <div className="flex flex-col gap-8">
          {CATEGORIES.map((cat) => {
            const items = grouped[cat] ?? [];
            if (items.length === 0) return null;
            return (
              <div key={cat}>
                <LabelMd className="text-secondary mb-3">{cat}</LabelMd>
                <div className="flex flex-col gap-3">
                  {items.map((dish) => (
                    <div key={dish.id} className={`bg-surface-container-lowest rounded-lg shadow-raised flex items-center gap-4 p-4 ${!dish.active ? "opacity-50" : ""}`}>
                      {/* Image */}
                      <div className="relative w-14 h-14 rounded-md overflow-hidden bg-surface-container-high shrink-0">
                        {dish.image_url && <Image src={dish.image_url} alt={dish.name} fill sizes="56px" className="object-cover" />}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-body font-bold text-[14px] text-on-surface">{dish.name}</p>
                          {dish.badge_label && (
                            <span className="text-[10px] font-bold bg-secondary text-on-secondary px-2 py-0.5 rounded-full">{dish.badge_label}</span>
                          )}
                          {dish.is_chiller && (
                            <span className="text-[10px] font-bold bg-primary-fixed text-primary px-2 py-0.5 rounded-full">Chiller</span>
                          )}
                          {!dish.active && (
                            <span className="text-[10px] font-bold bg-surface-container text-outline px-2 py-0.5 rounded-full">Hidden</span>
                          )}
                        </div>
                        <p className="font-body font-bold text-[14px] text-secondary">{fmt(dish.price)}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button onClick={() => toggleStock(dish)} className="cursor-pointer text-on-surface-variant hover:text-primary transition-colors" title={dish.in_stock ? "Mark sold out" : "Mark in stock"}>
                          {dish.in_stock ? <ToggleRight size={22} className="text-[#25d366]" /> : <ToggleLeft size={22} className="text-outline" />}
                        </button>
                        <button onClick={() => openEdit(dish)} className="p-1.5 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => setDeleteConfirm(dish.id)} className="p-1.5 text-on-surface-variant hover:text-error transition-colors cursor-pointer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-lg shadow-overlay w-full max-w-lg mt-8 mb-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <HeadlineMd className="text-[18px]">{editId ? "Edit Dish" : "Add New Dish"}</HeadlineMd>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-outline hover:text-on-surface cursor-pointer"><X size={20} /></button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              {/* Image upload */}
              <div className="flex flex-col gap-2">
                <LabelMd className="text-on-surface">Dish Photo</LabelMd>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative aspect-[4/3] max-h-48 rounded-lg border-2 border-dashed border-outline-variant hover:border-primary transition-colors cursor-pointer bg-surface-container flex items-center justify-center overflow-hidden"
                >
                  {preview ? (
                    <Image src={preview} alt="preview" fill className="object-cover" sizes="400px" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-outline">
                      {uploading ? <Loader2 size={24} className="animate-spin" /> : <Upload size={24} />}
                      <LabelSm>{uploading ? "Uploading..." : "Click to upload photo"}</LabelSm>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                {preview && (
                  <button onClick={() => { setPreview(""); setForm((f) => ({ ...f, image_url: "" })); }}
                    className="font-body text-[12px] text-error hover:underline cursor-pointer self-start">
                    Remove image
                  </button>
                )}
              </div>

              <Input id="name" label="Dish Name *" placeholder="e.g. Jollof Rice Special"
                value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />

              <div className="flex flex-col gap-1.5">
                <label className="font-body text-[13px] font-medium text-on-surface">Description *</label>
                <textarea rows={3} placeholder="Describe the dish..."
                  value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface placeholder:text-outline border border-outline-variant outline-none hover:border-outline focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all" />
              </div>

              <Input id="price" label="Price (₦) *" placeholder="e.g. 8500"
                type="number" value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[13px] font-medium text-on-surface">Category</label>
                  <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface border border-outline-variant outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-body text-[13px] font-medium text-on-surface">Badge</label>
                  <select value={form.badge_label}
                    onChange={(e) => {
                      const found = BADGES.find((b) => b.value === e.target.value);
                      setForm((f) => ({ ...f, badge_label: found?.value ?? "", badge_variant: found?.variant ?? "" }));
                    }}
                    className="w-full rounded-md bg-surface-container-low px-4 py-3 font-body text-[15px] text-on-surface border border-outline-variant outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
                    {BADGES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-col gap-3">
                {[
                  { key: "in_stock", label: "In Stock", sub: "Customers can order this dish" },
                  { key: "is_chiller", label: "Chiller Item", sub: "Pre-made item with limited stock" },
                  { key: "active", label: "Visible on Menu", sub: "Show this dish to customers" },
                ].map(({ key, label, sub }) => (
                  <div key={key} className="flex items-center justify-between gap-4 py-2 border-b border-outline-variant last:border-0">
                    <div>
                      <BodyMd className="text-on-surface font-medium text-[13px]">{label}</BodyMd>
                      <LabelSm className="text-on-surface-variant">{sub}</LabelSm>
                    </div>
                    <button onClick={() => setForm((f) => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                      className="cursor-pointer text-on-surface-variant hover:text-primary transition-colors">
                      {form[key as keyof typeof form]
                        ? <ToggleRight size={28} className="text-[#25d366]" />
                        : <ToggleLeft size={28} className="text-outline" />}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={() => setShowForm(false)} className="flex-1 justify-center">Cancel</Button>
                <Button variant="primary" onClick={handleSave} disabled={saving} className="flex-1 justify-center">
                  {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : editId ? "Save Changes" : "Add Dish"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-lg shadow-overlay p-6 max-w-sm w-full flex flex-col gap-4">
            <HeadlineMd className="text-[18px]">Delete dish?</HeadlineMd>
            <BodyMd>This action cannot be undone. The dish will be permanently removed from the menu.</BodyMd>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setDeleteConfirm(null)} className="flex-1 justify-center">Cancel</Button>
              <button onClick={() => deleteDish(deleteConfirm)}
                className="flex-1 bg-error text-on-error rounded-full py-3 font-body font-bold text-[14px] hover:brightness-95 cursor-pointer transition-all">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
