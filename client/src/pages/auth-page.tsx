import { useState } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSeo } from "@/hooks/use-seo";
import { Loader2, ArrowRight, ShieldCheck, BarChart3, Clock } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");

  useSeo({
    title: mode === "login" ? "Sign In | PathwayCheck" : "Create Account | PathwayCheck",
    description: "Sign in or create an account to save your pathway analysis results and track your recruiting journey.",
  });

  // Redirect if already logged in
  if (user) {
    navigate(user.isAdmin ? "/admin" : "/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        await login.mutateAsync({ username: form.username, password: form.password });
      } else {
        await register.mutateAsync({
          username: form.username,
          password: form.password,
          email: form.email || undefined,
        });
      }
      navigate("/dashboard");
    } catch (err: any) {
      const msg = err?.message || "Something went wrong";
      // Parse the error message from API response
      try {
        const parsed = JSON.parse(msg.replace(/^\d+:\s*/, ""));
        setError(parsed.message || msg);
      } catch {
        setError(msg);
      }
    }
  };

  const isSubmitting = login.isPending || register.isPending;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <Header />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-16 sm:pt-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center min-h-[calc(100vh-200px)]">

          {/* Left: Form */}
          <div className="mx-auto w-full max-w-md">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              {mode === "login" ? (
                <>Welcome <span className="pc-text-gradient">Back</span></>
              ) : (
                <>Create Your <span className="pc-text-gradient">Account</span></>
              )}
            </h1>
            <p className="mt-2 text-white/60">
              {mode === "login"
                ? "Sign in to view your saved pathway analyses."
                : "Save your results and track your recruiting journey."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Username</label>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                  placeholder="Enter your username"
                />
              </div>

              {mode === "register" && (
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1.5">
                    Email <span className="text-white/40">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                    placeholder="you@example.com"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                  placeholder={mode === "register" ? "At least 6 characters" : "Enter your password"}
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="pc-red-glow flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Sign In" : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              {mode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => { setMode("register"); setError(""); }}
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => { setMode("login"); setError(""); }}
                    className="text-red-400 hover:text-red-300 font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Right: Marketing */}
          <div className="hidden lg:block">
            <div className="pc-card p-8">
              <h2 className="text-xl font-semibold mb-6">Why Create an Account?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                    <BarChart3 className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Save Your Results</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Access your pathway analyses anytime. Compare results across different schools and positions.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Track Over Time</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Run multiple checks as your recruiting journey evolves. See how your options change.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/20">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Secure & Private</h3>
                    <p className="mt-1 text-sm text-white/60">
                      Your data is encrypted and never shared. Only you can see your results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
