import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useSeo } from "@/hooks/use-seo";
import { getQueryFn } from "@/lib/queryClient";
import { ArrowRight, BarChart3, Calendar, MapPin, Loader2, Crown, Zap, ArrowUpRight } from "lucide-react";
import type { PathwayCheck, PathwayResults } from "@shared/schema";
import { TIER_LIMITS, TIER_NAMES } from "@shared/schema";
import PageWrapper from "@/components/layout/PageWrapper";

export default function Dashboard() {
  const { user } = useAuth();

  useSeo({
    title: "Dashboard | PathwayCheck",
    description: "View your saved pathway analysis results and track your recruiting journey.",
  });

  const { data: checks, isLoading } = useQuery<PathwayCheck[]>({
    queryKey: ["/api/user/pathway-checks"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const tier = user?.subscriptionTier || "free";
  const limits = TIER_LIMITS[tier] || TIER_LIMITS.free;
  const checksUsed = user?.pathwayChecksUsed || 0;
  const atLimit = checksUsed >= limits.checks && limits.checks !== Infinity;

  const tierIcon = tier === "serious" ? <Crown className="h-4 w-4" /> : tier === "recruit" ? <Zap className="h-4 w-4" /> : null;
  const tierColor = tier === "serious" ? "text-purple-400 bg-purple-500/20 border-purple-500/30" : tier === "recruit" ? "text-blue-400 bg-blue-500/20 border-blue-500/30" : "text-white/50 bg-white/5 border-white/10";

  return (
    <PageWrapper>
      <section className="pc-section">
        <div className="pc-container">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold sm:text-4xl">
                <span className="pc-text-gradient">Your Dashboard</span>
              </h1>
              <p className="mt-2 text-white/60">
                Welcome back{user?.username ? `, ${user.username}` : ""}. Here are your pathway analyses.
              </p>
            </div>
            <Link
              href="/check"
              className="pc-red-glow inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px whitespace-nowrap"
            >
              New Check <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Subscription + Usage Bar */}
          <div className="pc-card p-5 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${tierColor}`}>
                  {tierIcon}
                  {TIER_NAMES[tier] || "Free Tier"}
                </span>
                <div className="text-sm text-white/60">
                  {limits.checks === Infinity ? (
                    <span>Unlimited pathway checks</span>
                  ) : (
                    <span>
                      <span className="text-white font-medium">{checksUsed}</span> of{" "}
                      <span className="text-white font-medium">{limits.checks}</span> check{limits.checks === 1 ? "" : "s"} used
                      {" "}&middot;{" "}
                      <span className="text-white font-medium">{limits.schools}</span> school{limits.schools === 1 ? "" : "s"} per check
                    </span>
                  )}
                </div>
              </div>
              {tier === "free" || tier === "recruit" ? (
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 transition"
                >
                  Upgrade Plan <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              ) : null}
            </div>

            {/* Usage progress bar */}
            {limits.checks !== Infinity && (
              <div className="mt-4">
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      atLimit ? "bg-red-500" : checksUsed / limits.checks > 0.7 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min(100, (checksUsed / limits.checks) * 100)}%` }}
                  />
                </div>
                {atLimit && (
                  <p className="mt-2 text-sm text-red-400">
                    You've reached your plan limit.{" "}
                    <Link href="/pricing" className="underline hover:text-red-300">
                      Upgrade to continue
                    </Link>
                  </p>
                )}
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-white/60" />
            </div>
          ) : !checks || checks.length === 0 ? (
            <div className="pc-card p-12 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-white/20 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">No Pathway Checks Yet</h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Run your first pathway check to see where you stand at your target schools. It only takes a few minutes.
              </p>
              <Link
                href="/check"
                className="pc-red-glow inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Check Your Pathway <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {checks.map((check) => {
                const results = check.results as PathwayResults | null;
                return (
                  <Link
                    key={check.id}
                    href={`/results/${check.id}`}
                    className="pc-card-hover group block p-5 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-xs font-bold text-red-400">
                          {check.position}
                        </span>
                        <div>
                          <p className="font-medium text-white">
                            {check.firstName} {check.lastName}
                          </p>
                          <p className="text-xs text-white/40">Class of {check.classYear}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-white/30 transition group-hover:text-red-400 group-hover:translate-x-0.5" />
                    </div>

                    <div className="flex items-center gap-1.5 text-sm text-white/60 mb-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {check.targetSchools.slice(0, 2).join(", ")}
                        {check.targetSchools.length > 2 && ` +${check.targetSchools.length - 2}`}
                      </span>
                    </div>

                    {results && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
                          results.competitionIndex === "Low" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                          results.competitionIndex === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                          results.competitionIndex === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                          "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}>
                          {results.competitionIndex} Competition
                        </span>
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60">
                          {results.depthChartPosition}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 text-xs text-white/40">
                      <Calendar className="h-3 w-3" />
                      {new Date(check.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
