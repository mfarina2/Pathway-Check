import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronRight, Clock, Target, TrendingUp, Users, AlertCircle, Check, HelpCircle, BarChart3 } from "lucide-react";
import type { PathwayCheck, PathwayResults } from "@shared/schema";

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

function CompetitionBadge({ level }: { level: string }) {
  const styles: Record<string, string> = {
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "Very High": "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span
      data-testid="status-competition"
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${styles[level] || styles.Medium}`}
    >
      <span className="h-2 w-2 rounded-full bg-current" />
      {level} Competition
    </span>
  );
}

export default function Results() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();

  const { data: check, isLoading, isError } = useQuery<PathwayCheck>({
    queryKey: ["pathway-check", id],
    queryFn: async () => {
      const res = await fetch(`/api/pathway-check/${id}`);
      if (!res.ok) throw new Error("Failed to fetch results");
      return res.json();
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div data-testid="status-loading" className="text-white/60">Loading your results...</div>
      </div>
    );
  }

  if (isError || !check || !check.results) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0a0a0a] px-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-400" />
        <h1 data-testid="text-error-title" className="text-xl font-semibold text-white">Results Not Found</h1>
        <p data-testid="text-error-message" className="text-white/60">
          We couldn't find your pathway analysis. Please try again.
        </p>
        <button
          data-testid="link-try-again"
          onClick={() => navigate("/check")}
          className="mt-4 rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Start New Check
        </button>
      </div>
    );
  }

  const results = check.results as PathwayResults;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <button
          data-testid="link-back-home"
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>

        <div className="mb-8">
          <h1 data-testid="text-results-title" className="font-display text-3xl font-bold sm:text-4xl">
            <span className="pc-text-gradient">Your Pathway Analysis</span>
          </h1>
          <p data-testid="text-user-name" className="mt-2 text-lg text-white/60">
            Results for {check.firstName} {check.lastName}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-4">
          <CompetitionBadge level={results.competitionIndex} />
          <span data-testid="text-position" className="text-sm text-white/60">
            Position: <span className="text-white">{check.position}</span>
          </span>
          <span data-testid="text-class-year" className="text-sm text-white/60">
            Class of <span className="text-white">{check.classYear}</span>
          </span>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={Target}
            label="Projected Position"
            value={results.depthChartPosition}
            color="red"
            testId="card-depth-chart"
          />
          <MetricCard
            icon={Clock}
            label="Time to Start"
            value={results.timelineToStart}
            color="blue"
            testId="card-timeline"
          />
          <MetricCard
            icon={TrendingUp}
            label="Roster Volatility"
            value={results.rosterVolatility}
            color="green"
            testId="card-volatility"
          />
          <MetricCard
            icon={Users}
            label="Competition Level"
            value={results.competitionIndex}
            color="yellow"
            testId="card-competition"
          />
        </div>

        {results.schoolAnalysis.length > 0 && (
          <div className="mb-8 pc-card p-6">
            <div className="mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-400" />
              <h2 data-testid="text-school-analysis-title" className="text-lg font-semibold">School-by-School Analysis</h2>
            </div>
            <div className="space-y-3">
              {results.schoolAnalysis.map((school, idx) => (
                <div
                  key={school.school}
                  data-testid={`row-school-${idx}`}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <p data-testid={`text-school-name-${idx}`} className="font-medium text-white">{school.school}</p>
                    <p className="text-sm text-white/60">
                      Competition Score: <span className="text-white">{school.competitionScore}/100</span>
                    </p>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-white/50">Position</p>
                      <p data-testid={`text-school-position-${idx}`} className="font-medium text-white">{school.projectedPosition}</p>
                    </div>
                    <div>
                      <p className="text-white/50">Start Time</p>
                      <p data-testid={`text-school-time-${idx}`} className="font-medium text-white">{school.timeToStart}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-8 pc-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <h2 data-testid="text-recommendations-title" className="text-lg font-semibold">Recommendations</h2>
          </div>
          <ul className="space-y-3">
            {results.recommendations.map((rec, idx) => (
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

        <div className="pc-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-400" />
            <h2 data-testid="text-questions-title" className="text-lg font-semibold">Questions to Ask Coaches</h2>
          </div>
          <ul className="space-y-3">
            {results.verificationQuestions.map((q, idx) => (
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
          <button
            data-testid="button-new-check"
            onClick={() => navigate("/check")}
            className="rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/20"
          >
            Check Another School
          </button>
        </div>
      </div>
    </div>
  );
}
