import { Link } from "wouter";
import PageWrapper from "@/components/layout/PageWrapper";
import {
  Target,
  Clock,
  TrendingUp,
  Users,
  Check,
  HelpCircle,
  BarChart3,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

function MetricCard({
  icon: Icon,
  label,
  value,
  color,
  testId,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  color: "red" | "blue" | "green" | "yellow";
  testId: string;
}) {
  const colors = {
    red: "from-red-500/20 to-red-600/5 border-red-500/30 text-red-400",
    blue: "from-blue-500/20 to-blue-600/5 border-blue-500/30 text-blue-400",
    green: "from-green-500/20 to-green-600/5 border-green-500/30 text-green-400",
    yellow: "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 text-yellow-400",
  };

  return (
    <div
      data-testid={testId}
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${colors[color]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/60">{label}</p>
          <p className="mt-1 text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

const recommendations = [
  "Focus on hitting consistency — college coaches at Florida value high-contact, gap-to-gap hitters at 1B.",
  "Attend Florida's summer prospect camps to get in front of their coaching staff early.",
  "Build a relationship with the recruiting coordinator — consistent communication sets you apart.",
  "Continue developing defensively at first base. Florida's depth chart rewards versatility.",
  "Film quality at-bats and defensive plays for a highlight reel tailored to Florida's program style.",
  "Explore 2–3 backup programs with similar competition levels to expand your options.",
];

const verificationQuestions = [
  "How many first basemen are currently on the roster, and how many are expected to return in 2026?",
  "What does your ideal recruiting timeline look like for the 2026 class at 1B?",
  "Are there any committed or signed recruits already slotted for first base in my class?",
  "What offensive stats or traits do you prioritize when evaluating first basemen?",
  "Would there be an opportunity to compete for playing time as a freshman?",
  "What does a typical development path look like for a position player in your program?",
  "Are there academic requirements or benchmarks beyond NCAA minimums that I should be aware of?",
  "Can you describe the team culture and what you look for in recruits beyond physical tools?",
];

export default function SampleReport() {
  return (
    <PageWrapper>
      <div className="pc-section">
        <div className="pc-container">
          <div className="mb-10 text-center">
            <h1
              data-testid="text-sample-title"
              className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl"
            >
              <span className="pc-text-gradient">See What You'll Get</span>
              <br />
              <span className="text-white">Sample Pathway Analysis</span>
            </h1>
            <p data-testid="text-sample-subtitle" className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
              Here's a complete example of what your personalized report looks like.
            </p>
          </div>

          <div data-testid="card-profile" className="pc-card p-6 mb-8">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-2xl font-bold text-red-400">
                MF
              </div>
              <div className="flex-1">
                <h2 data-testid="text-recruit-name" className="text-xl font-bold text-white">Michael Farina</h2>
                <div className="mt-1 flex flex-wrap gap-3 text-sm text-white/60">
                  <span data-testid="text-recruit-position">Position: <span className="text-white">1B (First Base)</span></span>
                  <span data-testid="text-recruit-class">Class: <span className="text-white">2026</span></span>
                  <span data-testid="text-recruit-level">Level: <span className="text-white">JV/Sophomore</span></span>
                  <span data-testid="text-recruit-target">Target: <span className="text-white">Florida Gators</span></span>
                </div>
              </div>
            </div>
          </div>

          <div data-testid="card-competition-score" className="pc-card p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-5 w-5 text-yellow-400" />
              <h2 className="text-lg font-semibold text-white">Overall Competition Score</h2>
            </div>
            <div className="flex items-center gap-4">
              <span
                data-testid="status-competition-level"
                className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/20 px-3 py-1 text-sm font-medium text-yellow-400"
              >
                <span className="h-2 w-2 rounded-full bg-current" />
                Medium Competition
              </span>
              <span data-testid="text-competition-score" className="text-2xl font-bold text-white">47<span className="text-base font-normal text-white/50">/100</span></span>
            </div>
            <div className="mt-4">
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  data-testid="bar-competition-gauge"
                  className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                  style={{ width: "47%" }}
                />
              </div>
              <div className="mt-1 flex justify-between text-xs text-white/40">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={Target}
              label="Projected Position"
              value="#2 - #4"
              color="red"
              testId="card-depth-chart"
            />
            <MetricCard
              icon={Clock}
              label="Time to Start"
              value="Year 1-2"
              color="blue"
              testId="card-timeline"
            />
            <MetricCard
              icon={TrendingUp}
              label="Roster Volatility"
              value="Stable"
              color="green"
              testId="card-volatility"
            />
            <MetricCard
              icon={Users}
              label="Competition Level"
              value="Medium"
              color="yellow"
              testId="card-competition"
            />
          </div>

          <div className="mb-8 pc-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h2 data-testid="text-school-analysis-title" className="text-lg font-semibold">School Analysis</h2>
            </div>
            <div
              data-testid="row-school-0"
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div>
                <p data-testid="text-school-name-0" className="font-medium text-white">Florida Gators</p>
                <p className="text-sm text-white/60">
                  Competition Score: <span className="text-white">47/100</span>
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-white/50">Position Depth</p>
                  <p data-testid="text-school-position-0" className="font-medium text-white">#1-#2</p>
                </div>
                <div>
                  <p className="text-white/50">Projected Start</p>
                  <p data-testid="text-school-time-0" className="font-medium text-white">Freshman</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 pc-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <Check className="h-5 w-5 text-green-400" />
              <h2 data-testid="text-recommendations-title" className="text-lg font-semibold">Recommendations</h2>
            </div>
            <ul className="space-y-3">
              {recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  data-testid={`row-recommendation-${idx}`}
                  className="flex items-start gap-3 text-white/80"
                >
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 pc-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-400" />
              <h2 data-testid="text-questions-title" className="text-lg font-semibold">Verification Questions to Ask Coaches</h2>
            </div>
            <ul className="space-y-3">
              {verificationQuestions.map((q, idx) => (
                <li
                  key={idx}
                  data-testid={`row-question-${idx}`}
                  className="flex items-start gap-3 text-white/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-medium text-blue-400">
                    {idx + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/check"
              data-testid="link-get-analysis"
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-8 py-3.5 text-base font-semibold text-white transition hover:bg-red-700 pc-red-glow"
            >
              Get Your Own Analysis
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p data-testid="text-sample-note" className="mx-auto mt-6 max-w-lg text-sm text-white/50">
              This is a sample. Your real analysis will be customized to your position, schools, and profile.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
