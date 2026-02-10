import { useState } from "react";
import { Link } from "wouter";
import { Mail, Clock, FileText, Send, CheckCircle } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "general", label: "General Question" },
  { value: "technical", label: "Technical Support" },
  { value: "partnership", label: "Partnership" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = form.name && form.email && form.subject && form.message;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageWrapper>
      <section className="pc-section">
        <div className="pc-container text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <Mail className="h-7 w-7" />
          </div>
          <h1 data-testid="text-contact-hero" className="text-4xl font-bold sm:text-5xl">
            <span className="pc-text-gradient">Get In Touch</span>
          </h1>
          <p data-testid="text-contact-subtitle" className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Have a question, suggestion, or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="pc-section pt-0">
        <div className="pc-container">
          <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="pc-card p-6 sm:p-8">
                {submitted ? (
                  <div data-testid="text-success-message" className="flex flex-col items-center py-10 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold">Thanks! We'll get back to you within 24 hours.</h3>
                    <p className="mt-2 text-white/60">We appreciate you reaching out.</p>
                    <button
                      data-testid="button-send-another"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-medium text-red-400 transition hover:text-red-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm text-white/70">Name *</label>
                      <input
                        data-testid="input-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-white/70">Email *</label>
                      <input
                        data-testid="input-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-white/70">Subject *</label>
                      <select
                        data-testid="select-subject"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                      >
                        {subjects.map((s) => (
                          <option key={s.value} value={s.value} className="bg-[#1a1a1a]">
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-white/70">Message *</label>
                      <textarea
                        data-testid="input-message"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                        placeholder="How can we help?"
                      />
                    </div>
                    <button
                      data-testid="button-submit"
                      type="submit"
                      disabled={!canSubmit}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6 lg:col-span-2">
              <div className="pc-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 data-testid="text-email-label" className="mb-1 font-semibold">Email Us</h3>
                <a
                  data-testid="link-email"
                  href="mailto:support@pathwaycheck.com"
                  className="text-sm text-red-400 transition hover:text-red-300"
                >
                  support@pathwaycheck.com
                </a>
              </div>

              <div className="pc-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 data-testid="text-response-label" className="mb-1 font-semibold">Response Time</h3>
                <p data-testid="text-response-time" className="text-sm text-white/60">
                  We typically respond within 24 hours
                </p>
              </div>

              <div className="pc-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 data-testid="text-faq-label" className="mb-1 font-semibold">Check Our FAQ</h3>
                <p className="mb-3 text-sm text-white/60">
                  Before you reach out, check our FAQ
                </p>
                <Link
                  href="/faq"
                  data-testid="link-faq"
                  className="text-sm font-medium text-red-400 transition hover:text-red-300"
                >
                  Visit FAQ →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
