import { useEffect, useMemo } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import heroField from "@/assets/images/hero-field.jpg";
import featureBatter from "@/assets/images/feature-batter.jpg";
import featurePitcher from "@/assets/images/feature-pitcher.jpg";
import featureGlove from "@/assets/images/feature-glove.jpg";
import tMarcus from "@/assets/images/testimonial-marcus.png";
import tDevon from "@/assets/images/testimonial-devon.png";
import tJake from "@/assets/images/testimonial-jake.png";

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("pc-in");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of els) obs.observe(el);
    return () => obs.disconnect();
  }, []);
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PillarCard({
  n,
  title,
  desc,
  bullets,
  testId,
}: {
  n: string;
  title: string;
  desc: string;
  bullets: string[];
  testId: string;
}) {
  return (
    <div data-testid={testId} className="pc-card pc-card-hover group p-6 sm:p-7 pc-reveal" data-reveal>
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute -top-24 right-[-40px] h-64 w-64 rounded-full bg-red-600/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[-40px] h-64 w-64 rounded-full bg-blue-500/12 blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div
              data-testid={`text-pillar-number-${n}`}
              className="text-sm font-semibold tracking-[0.18em] text-blue-400"
            >
              {n}
            </div>
            <h3 data-testid={`text-pillar-title-${n}`} className="mt-3 text-xl font-semibold text-white">
              {title}
            </h3>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:flex">
            <ChevronRight className="h-5 w-5 text-white/70 transition group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
        </div>

        <p data-testid={`text-pillar-desc-${n}`} className="mt-3 text-sm leading-relaxed text-white/72">
          {desc}
        </p>

        <ul className="mt-5 space-y-2.5">
          {bullets.map((b, idx) => (
            <li
              key={b}
              data-testid={`row-pillar-bullet-${n}-${idx}`}
              className="flex items-start gap-2 text-sm text-white/80"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600/15 ring-1 ring-red-500/25">
                <Check className="h-3.5 w-3.5 text-red-400" strokeWidth={2.5} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="pc-card pc-card-hover p-6 sm:p-7 pc-reveal" data-reveal>
      <div className="flex items-start gap-4">
        <div
          data-testid={`badge-step-${n}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-red-500 to-red-700 pc-red-ring"
        >
          <span className="text-lg font-bold text-white">{n}</span>
        </div>
        <div>
          <h3 data-testid={`text-step-title-${n}`} className="text-lg font-semibold text-white">
            {title}
          </h3>
          <p data-testid={`text-step-desc-${n}`} className="mt-2 text-sm leading-relaxed text-white/70">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureImageCard({
  img,
  title,
  subtitle,
  testId,
}: {
  img: string;
  title: string;
  subtitle: string;
  testId: string;
}) {
  return (
    <div
      data-testid={testId}
      className="pc-card pc-card-hover group h-[320px] overflow-hidden sm:h-[360px] pc-reveal"
      data-reveal
    >
      <img
        data-testid={`${testId}-img`}
        src={img}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/35 via-red-600/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{subtitle}</p>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5">
            <ArrowRight className="h-5 w-5 text-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonial({
  img,
  name,
  line,
  quote,
  id,
}: {
  img: string;
  name: string;
  line: string;
  quote: string;
  id: string;
}) {
  return (
    <div className="pc-card pc-card-hover group overflow-hidden pc-reveal" data-reveal>
      <div className="relative h-44 sm:h-48">
        <img
          data-testid={`img-testimonial-${id}`}
          src={img}
          alt={name}
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div data-testid={`text-testimonial-name-${id}`} className="text-lg font-semibold text-white">
              {name}
            </div>
            <div data-testid={`text-testimonial-line-${id}`} className="mt-1 text-sm text-white/70">
              {line}
            </div>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:flex">
            <ChevronRight className="h-5 w-5 text-white/70 transition group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
        </div>
        <p data-testid={`text-testimonial-quote-${id}`} className="mt-4 text-sm leading-relaxed text-white/76">
          “{quote}”
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  useRevealOnScroll();

  const navLinks = useMemo(
    () => [
      { label: "The Problem", id: "problem" },
      { label: "Solution", id: "solution" },
      { label: "How It Works", id: "how" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 pc-grid opacity-60" />
        <div className="absolute inset-0 pc-noise" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-red-600/12 blur-3xl" />
        <div className="absolute -top-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="border-b border-white/10 bg-black/55 backdrop-blur-xl supports-[backdrop-filter]:bg-black/45">
          <div className="pc-container">
            <div className="flex h-16 items-center justify-between">
              <button
                data-testid="button-logo"
                onClick={() => scrollToId("top")}
                className="group inline-flex items-center gap-2 font-semibold tracking-tight"
              >
                <span className="text-white">Pathway</span>
                <span className="pc-text-gradient">Check</span>
              </button>

              <nav className="hidden items-center gap-7 md:flex">
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    data-testid={`link-nav-${l.id}`}
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-white/78 transition hover:text-white"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  data-testid="button-nav-get-started"
                  onClick={() => scrollToId("cta")}
                  className="pc-red-glow inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative min-h-[92vh] pt-16">
          <div className="absolute inset-0 -z-10">
            <img
              data-testid="img-hero-background"
              src={heroField}
              alt="Baseball field"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-[#0a0a0a]" />
          </div>

          <div className="pc-container">
            <div className="grid min-h-[92vh] items-center gap-10 py-16 md:grid-cols-12">
              <div className="md:col-span-7 pc-reveal" data-reveal>
                <div
                  data-testid="text-hero-eyebrow"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-300"
                >
                  For High School Baseball Recruits
                </div>

                <h1
                  data-testid="text-hero-title"
                  className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl"
                >
                  See Your <span className="pc-text-gradient">Playing Time Path</span>, Make Your Best Fit
                </h1>

                <p
                  data-testid="text-hero-subtitle"
                  className="mt-5 max-w-xl text-base leading-relaxed text-white/78 sm:text-lg"
                >
                  Evaluate playing-time opportunities before you commit. PathwayCheck turns roster uncertainty into
                  clear metrics you can use in minutes—not months.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <button
                    data-testid="button-hero-primary"
                    onClick={() => scrollToId("cta")}
                    className="pc-red-glow inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
                  >
                    Check Your Pathway
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <button
                    data-testid="button-hero-secondary"
                    onClick={() => scrollToId("how")}
                    className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/10"
                  >
                    See How It Works
                  </button>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {[
                    { k: "70%", v: "Transfer Due to Poor Fit" },
                    { k: "2min", v: "To Check Your Pathway" },
                    { k: "1", v: "Decision You Won't Regret" },
                  ].map((s, idx) => (
                    <div
                      key={s.k}
                      data-testid={`card-hero-stat-${idx}`}
                      className="pc-card border-white/10 bg-black/30 p-4"
                    >
                      <div className="text-2xl font-semibold text-white">{s.k}</div>
                      <div className="mt-1 text-xs tracking-wide text-white/68">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 pc-reveal" data-reveal>
                <div className="pc-card overflow-hidden p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold tracking-[0.18em] text-red-400">LIVE PREVIEW</div>
                      <div className="mt-2 text-xl font-semibold">Your Pathway Snapshot</div>
                      <div className="mt-1 text-sm text-white/70">A taste of the metrics you'll get.</div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white/5 ring-1 ring-white/10">
                      <ArrowRight className="h-5 w-5 text-white/80" />
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      { label: "Projected Depth Chart", value: "#3 – #5" },
                      { label: "Competition Index", value: "High" },
                      { label: "Timeline to First Start", value: "Year 2" },
                    ].map((row, idx) => (
                      <div
                        key={row.label}
                        data-testid={`row-hero-metric-${idx}`}
                        className="flex items-center justify-between rounded-xl border border-white/10 bg-black/35 px-4 py-3"
                      >
                        <div className="text-sm text-white/70">{row.label}</div>
                        <div className="text-sm font-semibold text-white">{row.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 p-4">
                    <div className="text-sm font-semibold text-white">Hint</div>
                    <div className="mt-1 text-sm text-white/72">
                      Your best fit isn't always the biggest offer—it's the clearest path.
                    </div>
                  </div>

                  <button
                    data-testid="button-hero-card-cta"
                    onClick={() => scrollToId("cta")}
                    className="mt-6 w-full pc-red-glow inline-flex h-11 items-center justify-center rounded-full bg-red-600 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
                  >
                    Check Your Pathway Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="problem" className="pc-section">
          <div className="pc-container">
            <div className="max-w-3xl pc-reveal" data-reveal>
              <div
                data-testid="text-problem-eyebrow"
                className="text-sm font-semibold tracking-[0.18em] text-red-400"
              >
                The Problem
              </div>
              <h2 data-testid="text-problem-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Money's Easy to Understand. Fit Feels Like Guessing.
              </h2>
              <p data-testid="text-problem-desc" className="mt-4 text-base leading-relaxed text-white/75">
                Recruits get scholarship numbers, shiny facilities, and highlight reels—but not a clear answer to the
                question that decides everything: “When will I actually play?”. Without a pathway, the first year becomes
                a gamble.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              <div className="lg:col-span-7 pc-reveal" data-reveal>
                <div className="pc-card pc-card-hover overflow-hidden">
                  <div className="relative h-64 sm:h-72">
                    <img
                      data-testid="img-problem-root-cause"
                      src={heroField}
                      alt="Stadium"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/35" />
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold tracking-[0.18em] text-blue-300">The Root Cause</div>
                        <div className="mt-2 text-xl font-semibold">Rosters change. Your projection doesn't.</div>
                      </div>
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:flex">
                        <ArrowRight className="h-5 w-5 text-white/70" />
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-white/72">
                      A coach's pitch can't show how many players are ahead of you, how quickly they'll graduate, or how
                      often transfers reset the depth chart.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 pc-reveal" data-reveal>
                <div className="pc-card pc-card-hover p-6 sm:p-7">
                  <div className="text-sm font-semibold tracking-[0.18em] text-red-300">From the Field</div>
                  <p data-testid="text-problem-quote" className="mt-4 text-xl font-semibold leading-snug">
                    Money's easy to understand—fit feels like guessing.
                  </p>
                  <div data-testid="text-problem-quote-attrib" className="mt-3 text-sm text-white/70">
                    — Jake Martinez
                  </div>

                  <div className="mt-7 grid gap-3">
                    {[
                      "Over-recruiting happens quietly.",
                      "Transfers reshuffle the board.",
                      "Injuries and redshirts change timelines.",
                    ].map((t, idx) => (
                      <div
                        key={t}
                        data-testid={`row-problem-point-${idx}`}
                        className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                          <Check className="h-3.5 w-3.5 text-blue-300" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm text-white/75">{t}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    data-testid="button-problem-cta"
                    onClick={() => scrollToId("solution")}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition hover:text-white"
                  >
                    See the solution
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solution" className="pc-section">
          <div className="pc-container">
            <div className="max-w-3xl pc-reveal" data-reveal>
              <div
                data-testid="text-solution-eyebrow"
                className="text-sm font-semibold tracking-[0.18em] text-red-400"
              >
                The Solution
              </div>
              <h2 data-testid="text-solution-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Turn Roster Confusion Into Crystal-Clear Pathway Metrics
              </h2>
              <p data-testid="text-solution-desc" className="mt-4 text-base leading-relaxed text-white/75">
                PathwayCheck packages the messy reality of college baseball rosters into three simple outputs—so you can
                compare options, ask sharper questions, and commit with confidence.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <PillarCard
                n="01"
                title="Pathway Snapshot"
                desc="A clear view of where you fit on day one—and where you could be in 12, 24, and 36 months."
                bullets={["Depth chart estimate", "Timeline to first start", "Roster volatility signal"]}
                testId="card-pillar-01"
              />
              <PillarCard
                n="02"
                title="Competition Index"
                desc="Quantify competition with a single score built from roster composition, transfers, and recent usage trends."
                bullets={["Returners vs newcomers", "Transfer pressure", "Position crowding"]}
                testId="card-pillar-02"
              />
              <PillarCard
                n="03"
                title="Verification Questions"
                desc="Walk into calls and visits with the exact questions that reveal the true plan for your position."
                bullets={["Role clarity prompts", "Redshirt expectations", "Development plan checks"]}
                testId="card-pillar-03"
              />
            </div>
          </div>
        </section>

        <section id="how" className="pc-section">
          <div className="pc-container">
            <div className="max-w-3xl pc-reveal" data-reveal>
              <div data-testid="text-how-eyebrow" className="text-sm font-semibold tracking-[0.18em] text-red-400">
                How It Works
              </div>
              <h2 data-testid="text-how-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Three Simple Steps to Clarity
              </h2>
              <p data-testid="text-how-desc" className="mt-4 text-base leading-relaxed text-white/75">
                No spreadsheets. No guesswork. Just a fast workflow that turns your target schools into a real
                playing-time plan.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Step
                n={1}
                title="Enter Your Info"
                desc="Position, class year, target schools, and what you want from your college experience."
              />
              <Step
                n={2}
                title="Get Your Metrics"
                desc="Instant pathway snapshot + a competition index you can compare across offers."
              />
              <Step
                n={3}
                title="Verify the Plan"
                desc="Use our verification questions to confirm your role, timeline, and development path."
              />
            </div>
          </div>
        </section>

        <section className="pc-section">
          <div className="pc-container">
            <div className="grid gap-5 lg:grid-cols-3">
              <FeatureImageCard
                img={featureBatter}
                title="Know Your Competition"
                subtitle="Understand who's ahead of you—and how often that changes."
                testId="card-feature-competition"
              />
              <FeatureImageCard
                img={featurePitcher}
                title="Map Your Timeline"
                subtitle="See when the depth chart opens and where you can realistically start."
                testId="card-feature-timeline"
              />
              <FeatureImageCard
                img={featureGlove}
                title="Ask the Right Questions"
                subtitle="Get the prompts that uncover the real plan for your position group."
                testId="card-feature-questions"
              />
            </div>
          </div>
        </section>

        <section id="cta" className="relative pc-section">
          <div className="absolute inset-0 -z-10">
            <img
              data-testid="img-cta-background"
              src={heroField}
              alt="Baseball game"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
          </div>

          <div className="pc-container">
            <div className="pc-card border-white/10 bg-black/35 p-8 sm:p-10 pc-reveal" data-reveal>
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <h2 data-testid="text-cta-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    Ready to See Your Real Path?
                  </h2>
                  <p data-testid="text-cta-desc" className="mt-4 text-base leading-relaxed text-white/75">
                    Get a pathway snapshot, competition index, and verification questions—in one clean view. Make your
                    best-fit decision with confidence.
                  </p>
                </div>
                <div className="lg:col-span-4">
                  <button
                    data-testid="button-cta-primary"
                    onClick={() => scrollToId("cta")}
                    className="pc-red-glow w-full inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
                  >
                    Check Your Pathway Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  <div className="mt-3 text-center text-xs text-white/60">Takes under 2 minutes.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pc-section">
          <div className="pc-container">
            <div className="max-w-3xl pc-reveal" data-reveal>
              <div
                data-testid="text-testimonials-eyebrow"
                className="text-sm font-semibold tracking-[0.18em] text-red-400"
              >
                Success Stories
              </div>
              <h2
                data-testid="text-testimonials-title"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                Real Players, Real Results
              </h2>
              <p data-testid="text-testimonials-desc" className="mt-4 text-base leading-relaxed text-white/75">
                A clearer pathway changes everything—from your questions on calls to your confidence on campus.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              <Testimonial
                id="marcus"
                img={tMarcus}
                name="Marcus T."
                line="RHP, Class of 2025"
                quote="I turned down a bigger offer because the pathway metrics showed I’d be buried. I’m starting as a sophomore now."
              />
              <Testimonial
                id="devon"
                img={tDevon}
                name="Devon L."
                line="C, Class of 2024"
                quote="The verification questions changed my visit. The coach got specific—and I felt in control for the first time."
              />
              <Testimonial
                id="jake"
                img={tJake}
                name="Jake M."
                line="SS, Class of 2025"
                quote="PathwayCheck helped me compare two schools in minutes. I picked the one with a real timeline and I’m thriving."
              />
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/55">
          <div className="pc-container py-14">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="text-lg font-semibold">
                  <span className="text-white">Pathway</span>
                  <span className="pc-text-gradient">Check</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Helping high school baseball recruits evaluate playing-time opportunities and make their best-fit
                  college decision.
                </p>
              </div>

              <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
                {[
                  {
                    title: "Product",
                    links: ["The Problem", "Solution", "How It Works"],
                  },
                  { title: "Resources", links: ["Recruiting Guide", "Questions to Ask", "Glossary"] },
                  { title: "Company", links: ["About", "Contact", "Privacy"] },
                ].map((col) => (
                  <div key={col.title}>
                    <div className="text-sm font-semibold tracking-[0.18em] text-red-400">{col.title}</div>
                    <ul className="mt-4 space-y-2">
                      {col.links.map((l, idx) => (
                        <li key={l}>
                          <button
                            data-testid={`link-footer-${col.title.toLowerCase()}-${idx}`}
                            onClick={() => {
                              const match = navLinks.find((x) => x.label === l);
                              if (match) scrollToId(match.id);
                            }}
                            className="text-sm text-white/70 transition hover:text-white"
                          >
                            {l}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
              <div data-testid="text-footer-copyright">
                © {new Date().getFullYear()} PathwayCheck. All rights reserved.
              </div>
              <div className="text-white/55">Built for recruits. Designed for clarity.</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
