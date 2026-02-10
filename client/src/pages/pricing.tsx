import { useState } from "react";
import { Link } from "wouter";
import { Check, Star, Shield, ChevronDown, Users } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

const tiers = [
  {
    id: "free",
    name: "Free Tier",
    price: "$0",
    priceLabel: "forever",
    features: [
      "Single school analysis",
      "Basic pathway snapshot",
      "5 verification questions",
    ],
    cta: "Try Free",
    href: "/check",
    highlight: false,
  },
  {
    id: "recruit",
    name: "Recruit Plan",
    price: "$29",
    priceLabel: "one-time",
    badge: "Most Popular",
    features: [
      "Up to 5 schools",
      "Full pathway analysis",
      "Competition Index",
      "15+ verification questions",
      "Email support",
    ],
    cta: "Get Started",
    href: "/check",
    highlight: true,
  },
  {
    id: "serious",
    name: "Serious Commit Plan",
    price: "$99",
    priceLabel: "one-time",
    features: [
      "Unlimited schools",
      "Priority analysis",
      "School comparison tool",
      "30-min coach call prep",
      "Parent dashboard access",
    ],
    cta: "Go Pro",
    href: "/check",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Is this a subscription or a one-time payment?",
    a: "All paid plans are one-time payments. You pay once and get lifetime access to the features included in your plan—no recurring charges.",
  },
  {
    q: "Can I upgrade from Free to a paid plan later?",
    a: "Absolutely. Start with the Free tier to see how PathwayCheck works, then upgrade anytime. Your previous analysis data carries over.",
  },
  {
    q: "What does the money-back guarantee cover?",
    a: "If you're not satisfied within 14 days of purchase, we'll refund your payment in full—no questions asked.",
  },
  {
    q: "Do I need a credit card for the Free tier?",
    a: "No. The Free tier requires no payment information at all. Just sign up and start analyzing your first school immediately.",
  },
  {
    q: "What happens after I purchase a plan?",
    a: "You get instant access to all plan features. Start by entering your target school and position, and you'll have your pathway analysis in under two minutes.",
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-testid={`faq-item-${index}`}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        data-testid={`button-faq-toggle-${index}`}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p
          data-testid={`text-faq-answer-${index}`}
          className="pb-5 text-sm leading-relaxed text-white/70"
        >
          {a}
        </p>
      )}
    </div>
  );
}

export default function Pricing() {
  return (
    <PageWrapper>
      <section className="pc-section pt-24 sm:pt-32">
        <div className="pc-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-300">
            <Star className="h-3.5 w-3.5" />
            Pricing
          </div>
          <h1
            data-testid="text-pricing-headline"
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            Choose Your Pathway to{" "}
            <span className="pc-text-gradient">Clarity</span>
          </h1>
          <p
            data-testid="text-pricing-subtitle"
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            One-time payment. No subscriptions. Pick the plan that fits your
            recruiting journey.
          </p>
        </div>
      </section>

      <section className="pc-section pt-0">
        <div className="pc-container">
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                data-testid={`card-pricing-${tier.id}`}
                className={`pc-card pc-card-hover relative flex flex-col p-6 sm:p-8 ${
                  tier.highlight
                    ? "border-red-500/50 pc-red-glow lg:scale-105 z-10"
                    : ""
                }`}
              >
                {tier.badge && (
                  <div
                    data-testid={`badge-pricing-${tier.id}`}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-semibold text-white"
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    data-testid={`text-tier-name-${tier.id}`}
                    className="text-lg font-semibold text-white"
                  >
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span
                      data-testid={`text-tier-price-${tier.id}`}
                      className="text-4xl font-bold text-white"
                    >
                      {tier.price}
                    </span>
                    <span className="text-sm text-white/50">
                      {tier.priceLabel}
                    </span>
                  </div>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li
                      key={feature}
                      data-testid={`row-feature-${tier.id}-${idx}`}
                      className="flex items-start gap-2.5 text-sm text-white/80"
                    >
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600/15 ring-1 ring-red-500/25">
                        <Check
                          className="h-3.5 w-3.5 text-red-400"
                          strokeWidth={2.5}
                        />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  data-testid={`link-cta-${tier.id}`}
                  className={`inline-flex h-12 items-center justify-center rounded-full text-sm font-semibold transition active:translate-y-px ${
                    tier.highlight
                      ? "pc-red-glow bg-red-600 text-white hover:bg-red-500"
                      : "border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10">
          <div
            data-testid="badge-guarantee"
            className="pc-card flex items-center gap-3 border-green-500/25 bg-green-500/5 px-6 py-4"
          >
            <Shield className="h-8 w-8 shrink-0 text-green-400" />
            <div>
              <div className="text-sm font-semibold text-white">
                14-Day Money-Back Guarantee
              </div>
              <div className="mt-0.5 text-xs text-white/60">
                Not satisfied? Full refund, no questions asked.
              </div>
            </div>
          </div>

          <div
            data-testid="badge-social-proof"
            className="pc-card flex items-center gap-3 border-blue-500/25 bg-blue-500/5 px-6 py-4"
          >
            <Users className="h-8 w-8 shrink-0 text-blue-400" />
            <div>
              <div className="text-sm font-semibold text-white">
                Used by 500+ Recruits
              </div>
              <div className="mt-0.5 text-xs text-white/60">
                Trusted by families across the country.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="mx-auto max-w-2xl">
            <h2
              data-testid="text-faq-title"
              className="text-center text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-10">
              {faqs.map((faq, idx) => (
                <FAQItem key={idx} q={faq.q} a={faq.a} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section pb-24">
        <div className="pc-container text-center">
          <h2
            data-testid="text-final-cta-title"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Ready to Find Your{" "}
            <span className="pc-text-gradient">Pathway</span>?
          </h2>
          <p
            data-testid="text-final-cta-subtitle"
            className="mx-auto mt-4 max-w-lg text-base text-white/70"
          >
            Start with a free analysis—no credit card required.
          </p>
          <Link
            href="/check"
            data-testid="link-final-cta"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-8 text-sm font-semibold text-white pc-red-glow transition hover:bg-red-500 active:translate-y-px"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
