import { Link } from "wouter";
import {
  ArrowRight,
  ClipboardList,
  BarChart3,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  Activity,
  Check,
  X,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

export default function HowItWorks() {
  return (
    <PageWrapper>
      <section className="pc-section pt-24 sm:pt-32">
        <div className="pc-container text-center">
          <div
            data-testid="text-hiw-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-300"
          >
            How It Works
          </div>
          <h1
            data-testid="text-hiw-hero-title"
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            From Confused to Confident in{" "}
            <span className="pc-text-gradient">Three Simple Steps</span>
          </h1>
          <p
            data-testid="text-hiw-hero-subtitle"
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            PathwayCheck turns the murky recruiting process into a clear, data-backed game plan.
          </p>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 pc-red-ring">
                <span className="text-lg font-bold text-white">1</span>
              </div>
              <h2
                data-testid="text-step1-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Enter Your Information
              </h2>
              <p
                data-testid="text-step1-description"
                className="mt-4 text-base leading-relaxed text-white/75"
              >
                Tell us your position, class year, current level, and the schools you're
                considering. It takes less than 2 minutes.
              </p>
            </div>
            <div className="pc-card p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                  <ClipboardList className="h-5 w-5 text-blue-400" />
                </div>
                <div data-testid="text-step1-card-title" className="text-sm font-semibold text-white/70">
                  What We Ask
                </div>
              </div>
              <div className="space-y-3">
                {["Position (e.g., SS, RHP, OF)", "Class Year (2025, 2026…)", "Current Level (Varsity, Travel, etc.)", "Target Schools"].map(
                  (item, idx) => (
                    <div
                      key={item}
                      data-testid={`row-step1-field-${idx}`}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <Check className="h-4 w-4 text-blue-400 shrink-0" strokeWidth={2.5} />
                      <span className="text-sm text-white/75">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="lg:order-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 pc-red-ring">
                <span className="text-lg font-bold text-white">2</span>
              </div>
              <h2
                data-testid="text-step2-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Get Your Pathway Analysis
              </h2>
              <p
                data-testid="text-step2-description"
                className="mt-4 text-base leading-relaxed text-white/75"
              >
                We crunch the numbers and deliver a personalized report with actionable metrics for
                every school on your list.
              </p>
            </div>
            <div className="lg:order-1 space-y-4">
              <div data-testid="card-metric-depth" className="pc-card pc-card-hover p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600/15 ring-1 ring-red-500/25">
                    <TrendingUp className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 data-testid="text-metric-depth-title" className="text-base font-semibold text-white">
                      Projected Depth Chart Position
                    </h3>
                    <p data-testid="text-metric-depth-desc" className="mt-1 text-sm leading-relaxed text-white/70">
                      See where you'd likely land on the roster based on current players, incoming
                      recruits, and historical roster patterns.
                    </p>
                  </div>
                </div>
              </div>

              <div data-testid="card-metric-competition" className="pc-card pc-card-hover p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                    <Users className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 data-testid="text-metric-competition-title" className="text-base font-semibold text-white">
                      Competition Index
                    </h3>
                    <p data-testid="text-metric-competition-desc" className="mt-1 text-sm leading-relaxed text-white/70">
                      A single score that quantifies how crowded your position is—factoring in
                      returners, transfers, and incoming freshmen.
                    </p>
                  </div>
                </div>
              </div>

              <div data-testid="card-metric-timeline" className="pc-card pc-card-hover p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red-600/15 ring-1 ring-red-500/25">
                    <Clock className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 data-testid="text-metric-timeline-title" className="text-base font-semibold text-white">
                      Timeline to First Start
                    </h3>
                    <p data-testid="text-metric-timeline-desc" className="mt-1 text-sm leading-relaxed text-white/70">
                      An estimated timeframe for when you could earn a starting role, based on
                      graduation cycles, eligibility clocks, and roster turnover.
                    </p>
                  </div>
                </div>
              </div>

              <div data-testid="card-metric-volatility" className="pc-card pc-card-hover p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                    <Activity className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 data-testid="text-metric-volatility-title" className="text-base font-semibold text-white">
                      Roster Volatility
                    </h3>
                    <p data-testid="text-metric-volatility-desc" className="mt-1 text-sm leading-relaxed text-white/70">
                      Signals that indicate how stable or unpredictable the roster is—including
                      transfer rates, coaching changes, and recruitment trends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 pc-red-ring">
                <span className="text-lg font-bold text-white">3</span>
              </div>
              <h2
                data-testid="text-step3-title"
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Verify With Coaches
              </h2>
              <p
                data-testid="text-step3-description"
                className="mt-4 text-base leading-relaxed text-white/75"
              >
                Use our verification questions during campus visits and phone calls. They're
                designed to get specific, honest answers from coaching staff.
              </p>
            </div>
            <div className="pc-card p-6 sm:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                  <MessageSquare className="h-5 w-5 text-blue-400" />
                </div>
                <div data-testid="text-step3-card-title" className="text-sm font-semibold text-white/70">
                  Sample Questions
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "How many players at my position are you recruiting this cycle?",
                  "What does a realistic redshirt timeline look like?",
                  "How many players at my position transferred out last year?",
                  "What's the development plan for freshmen at my position?",
                ].map((q, idx) => (
                  <div
                    key={q}
                    data-testid={`row-step3-question-${idx}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <span className="text-sm text-white/75">"{q}"</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="text-center">
            <div
              data-testid="text-different-eyebrow"
              className="text-sm font-semibold tracking-[0.18em] text-red-400"
            >
              The Difference
            </div>
            <h2
              data-testid="text-different-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              What Makes Us Different
            </h2>
            <p
              data-testid="text-different-subtitle"
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75"
            >
              Here's how PathwayCheck compares to the traditional approach of just "trusting the
              coach."
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div data-testid="card-compare-trust" className="pc-card p-6 sm:p-7">
              <div className="text-sm font-semibold tracking-[0.18em] text-white/50 mb-4">
                Trusting the Coach
              </div>
              <div className="space-y-3">
                {[
                  "Vague promises about playing time",
                  "No data on roster competition",
                  "Unknown transfer risk",
                  "One-sided recruiting pitch",
                  "Decision based on gut feeling",
                ].map((item, idx) => (
                  <div
                    key={item}
                    data-testid={`row-compare-trust-${idx}`}
                    className="flex items-start gap-3 text-sm text-white/60"
                  >
                    <X className="h-4 w-4 mt-0.5 text-red-400/60 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-testid="card-compare-pathway" className="pc-card border-red-500/30 p-6 sm:p-7">
              <div className="text-sm font-semibold tracking-[0.18em] text-red-400 mb-4">
                With PathwayCheck
              </div>
              <div className="space-y-3">
                {[
                  "Projected depth chart position with data",
                  "Competition Index for every school",
                  "Roster volatility signals upfront",
                  "Verification questions for coaches",
                  "Decision backed by real analysis",
                ].map((item, idx) => (
                  <div
                    key={item}
                    data-testid={`row-compare-pathway-${idx}`}
                    className="flex items-start gap-3 text-sm text-white/80"
                  >
                    <Check className="h-4 w-4 mt-0.5 text-green-400 shrink-0" strokeWidth={2.5} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="pc-card pc-red-glow p-8 sm:p-12 text-center">
            <h2
              data-testid="text-hiw-cta-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Ready to See Your Path?
            </h2>
            <p
              data-testid="text-hiw-cta-desc"
              className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/75"
            >
              It takes less than 2 minutes to get your personalized pathway analysis.
            </p>
            <Link
              href="/check"
              data-testid="link-hiw-cta"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
            >
              Check Your Pathway
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
