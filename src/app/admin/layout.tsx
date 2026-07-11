import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin | Ene's Kitchen",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-low flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 md:p-8 lg:p-10 md:pt-8 pt-20">
        {children}
      </main>
    </div>
  );
}
