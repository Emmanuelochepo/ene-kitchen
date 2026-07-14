"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";
import { HeadlineLg, BodyMd, LabelMd } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { AlertCircle, ChefHat } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="fixed inset-0 bg-surface flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
            <ChefHat size={26} className="text-on-primary" />
          </div>
          <HeadlineLg as="h1" className="text-[20px] md:text-[22px]">Ene&apos;s Kitchen</HeadlineLg>
          <BodyMd className="text-[13px]">Admin Dashboard — sign in to continue</BodyMd>
        </div>

        {/* Form */}
        <div className="bg-surface-container-lowest rounded-lg shadow-raised p-6 flex flex-col gap-4">
          <LabelMd className="text-on-surface">Sign In</LabelMd>

          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="admin@eneskitchen.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          {error && (
            <div className="flex items-center gap-2 bg-error-container text-on-error-container rounded-lg px-4 py-3">
              <AlertCircle size={15} className="shrink-0" />
              <BodyMd className="text-[13px]">{error}</BodyMd>
            </div>
          )}

          <Button variant="primary" onClick={handleLogin} disabled={loading} className="w-full justify-center mt-1">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </div>
    </div>
  );
}
