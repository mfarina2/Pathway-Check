import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { PathwayCheck } from "@shared/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const positions = [
  { value: "P", label: "Pitcher" },
  { value: "C", label: "Catcher" },
  { value: "1B", label: "First Base" },
  { value: "2B", label: "Second Base" },
  { value: "3B", label: "Third Base" },
  { value: "SS", label: "Shortstop" },
  { value: "LF", label: "Left Field" },
  { value: "CF", label: "Center Field" },
  { value: "RF", label: "Right Field" },
  { value: "UTIL", label: "Utility" },
];

const classYears = [
  { value: 2025, label: "Class of 2025" },
  { value: 2026, label: "Class of 2026" },
  { value: 2027, label: "Class of 2027" },
  { value: 2028, label: "Class of 2028" },
];

const currentLevels = [
  { value: "varsity_starter", label: "Varsity Starter" },
  { value: "varsity_rotation", label: "Varsity Rotation" },
  { value: "jv", label: "JV / Sophomore" },
  { value: "travel_elite", label: "Elite Travel Ball" },
  { value: "travel_competitive", label: "Competitive Travel Ball" },
];

export default function PathwayForm() {
  const [, navigate] = useLocation();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    classYear: 2026,
    targetSchools: [""],
    currentLevel: "",
    goals: "",
  });

  const mutation = useMutation<PathwayCheck, Error, typeof form>({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/pathway-check", {
        ...data,
        targetSchools: data.targetSchools.filter((s) => s.trim() !== ""),
      });
      return res.json();
    },
    onSuccess: (data) => {
      navigate(`/results/${data.id}`);
    },
  });

  const addSchool = () => {
    if (form.targetSchools.length < 5) {
      setForm({ ...form, targetSchools: [...form.targetSchools, ""] });
    }
  };

  const updateSchool = (index: number, value: string) => {
    const updated = [...form.targetSchools];
    updated[index] = value;
    setForm({ ...form, targetSchools: updated });
  };

  const removeSchool = (index: number) => {
    if (form.targetSchools.length > 1) {
      setForm({ ...form, targetSchools: form.targetSchools.filter((_, i) => i !== index) });
    }
  };

  const canProceed = () => {
    if (step === 1) return form.firstName && form.lastName && form.email;
    if (step === 2) return form.position && form.classYear && form.currentLevel;
    if (step === 3) return form.targetSchools.some((s) => s.trim() !== "");
    return true;
  };

  const handleSubmit = () => {
    mutation.mutate(form);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <Header />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 pt-24 sm:py-16 sm:pt-28">

        <div className="mb-8 text-center">
          <h1 data-testid="text-form-title" className="font-display text-3xl font-bold sm:text-4xl">
            <span className="pc-text-gradient">Check Your Pathway</span>
          </h1>
          <p data-testid="text-form-subtitle" className="mt-3 text-white/60">
            Get personalized insights about your playing-time opportunities
          </p>
        </div>

        <div className="mb-10 flex justify-center gap-3">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              data-testid={`status-step-${s}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition ${
                step === s
                  ? "border-red-500 bg-red-500/20 text-red-400"
                  : step > s
                  ? "border-green-500 bg-green-500/20 text-green-400"
                  : "border-white/20 text-white/40"
              }`}
            >
              {step > s ? <Check className="h-5 w-5" /> : s}
            </div>
          ))}
        </div>

        <div className="pc-card p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 data-testid="text-step-title" className="text-xl font-semibold">Personal Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-white/70">First Name *</label>
                  <input
                    data-testid="input-first-name"
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-white/70">Last Name *</label>
                  <input
                    data-testid="input-last-name"
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">Email Address *</label>
                <input
                  data-testid="input-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 data-testid="text-step-title" className="text-xl font-semibold">Baseball Profile</h2>
              <div>
                <label className="mb-2 block text-sm text-white/70">Primary Position *</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {positions.map((pos) => (
                    <button
                      key={pos.value}
                      data-testid={`button-position-${pos.value}`}
                      type="button"
                      onClick={() => setForm({ ...form, position: pos.value })}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                        form.position === pos.value
                          ? "border-red-500 bg-red-500/20 text-red-400"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">Class Year *</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {classYears.map((yr) => (
                    <button
                      key={yr.value}
                      data-testid={`button-year-${yr.value}`}
                      type="button"
                      onClick={() => setForm({ ...form, classYear: yr.value })}
                      className={`rounded-lg border px-3 py-2 text-sm transition ${
                        form.classYear === yr.value
                          ? "border-red-500 bg-red-500/20 text-red-400"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {yr.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/70">Current Level *</label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {currentLevels.map((lvl) => (
                    <button
                      key={lvl.value}
                      data-testid={`button-level-${lvl.value}`}
                      type="button"
                      onClick={() => setForm({ ...form, currentLevel: lvl.value })}
                      className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                        form.currentLevel === lvl.value
                          ? "border-red-500 bg-red-500/20 text-red-400"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 data-testid="text-step-title" className="text-xl font-semibold">Target Schools</h2>
              <p className="text-sm text-white/60">
                Add up to 5 colleges you're interested in. We'll analyze your pathway at each.
              </p>
              <div className="space-y-3">
                {form.targetSchools.map((school, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      data-testid={`input-school-${idx}`}
                      type="text"
                      value={school}
                      onChange={(e) => updateSchool(idx, e.target.value)}
                      className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                      placeholder={`School ${idx + 1}`}
                    />
                    {form.targetSchools.length > 1 && (
                      <button
                        data-testid={`button-remove-school-${idx}`}
                        type="button"
                        onClick={() => removeSchool(idx)}
                        className="rounded-lg border border-white/10 bg-white/5 px-4 text-white/60 transition hover:border-red-500/50 hover:text-red-400"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {form.targetSchools.length < 5 && (
                <button
                  data-testid="button-add-school"
                  type="button"
                  onClick={addSchool}
                  className="text-sm text-blue-400 transition hover:text-blue-300"
                >
                  + Add another school
                </button>
              )}
              <div>
                <label className="mb-2 block text-sm text-white/70">Goals (Optional)</label>
                <textarea
                  data-testid="input-goals"
                  value={form.goals}
                  onChange={(e) => setForm({ ...form, goals: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                  placeholder="What are your goals for playing college baseball?"
                />
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                data-testid="button-prev-step"
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                data-testid="button-next-step"
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                data-testid="button-submit"
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed() || mutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get My Results
                  </>
                )}
              </button>
            )}
          </div>

          {mutation.isError && (
            <div data-testid="text-error" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-sm text-red-400">
              Something went wrong. Please try again.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
