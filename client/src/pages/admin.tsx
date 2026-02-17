import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useSeo } from "@/hooks/use-seo";
import { queryClient, apiRequest, getQueryFn } from "@/lib/queryClient";
import {
  Users, BarChart3, Loader2, Calendar, Mail, Shield, Trash2,
  Search, CreditCard, Crown, Zap, Activity,
} from "lucide-react";
import type { PathwayCheck, PathwayResults } from "@shared/schema";
import PageWrapper from "@/components/layout/PageWrapper";

type AdminStats = {
  totalUsers: number;
  totalChecks: number;
  tierCounts: { free: number; recruit: number; serious: number };
};

type SafeUser = {
  id: string;
  username: string;
  email: string | null;
  isAdmin: boolean;
  subscriptionTier: string;
  subscriptionPurchasedAt: string | null;
  lastLoginAt: string | null;
  loginCount: number;
  pathwayChecksUsed: number;
  createdAt: string;
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState<"users" | "checks">("users");
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useSeo({
    title: "Admin Dashboard | PathwayCheck",
    description: "Manage users and pathway checks.",
  });

  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: allUsers, isLoading: usersLoading } = useQuery<SafeUser[]>({
    queryKey: ["/api/admin/users"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const { data: allChecks, isLoading: checksLoading } = useQuery<PathwayCheck[]>({
    queryKey: ["/api/admin/pathway-checks"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  const updateSubscription = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/subscription`, { tier });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const updateRole = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      const res = await apiRequest("PATCH", `/api/admin/users/${userId}/role`, { isAdmin });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      await apiRequest("DELETE", `/api/admin/users/${userId}`);
    },
    onSuccess: () => {
      setDeleteConfirm(null);
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
    },
  });

  const filteredUsers = allUsers?.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      u.subscriptionTier.toLowerCase().includes(q)
    );
  });

  const tierBadge = (tier: string) => {
    switch (tier) {
      case "serious":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 text-xs font-medium text-purple-400">
            <Crown className="h-3 w-3" /> Serious
          </span>
        );
      case "recruit":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-xs font-medium text-blue-400">
            <Zap className="h-3 w-3" /> Recruit
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50">
            Free
          </span>
        );
    }
  };

  return (
    <PageWrapper>
      <section className="pc-section">
        <div className="pc-container">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">
              <span className="pc-text-gradient">Admin Dashboard</span>
            </h1>
            <p className="mt-2 text-white/60">
              Manage users, subscriptions, and view all pathway check submissions.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 mb-8">
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Total Users</p>
                  <p className="text-2xl font-bold text-white">
                    {statsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.totalUsers ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                  <BarChart3 className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Total Checks</p>
                  <p className="text-2xl font-bold text-white">
                    {statsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.totalChecks ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <Activity className="h-5 w-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Free Users</p>
                  <p className="text-2xl font-bold text-white">
                    {statsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.tierCounts?.free ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Recruit</p>
                  <p className="text-2xl font-bold text-white">
                    {statsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.tierCounts?.recruit ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                  <Crown className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Serious</p>
                  <p className="text-2xl font-bold text-white">
                    {statsLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : stats?.tierCounts?.serious ?? 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="pc-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-white/60">Logged in as</p>
                  <p className="text-lg font-semibold text-white truncate">{user?.username}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Toggle + Search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-1 rounded-lg border border-white/10 bg-white/5 p-1 w-fit">
              <button
                onClick={() => setTab("users")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  tab === "users"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/70"
                }`}
              >
                Users ({allUsers?.length ?? "..."})
              </button>
              <button
                onClick={() => setTab("checks")}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  tab === "checks"
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:text-white/70"
                }`}
              >
                Pathway Checks ({allChecks?.length ?? "..."})
              </button>
            </div>
            {tab === "users" && (
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                />
              </div>
            )}
          </div>

          {/* Users Tab */}
          {tab === "users" && (
            <div className="pc-card overflow-hidden">
              {usersLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-white/60" />
                </div>
              ) : !filteredUsers || filteredUsers.length === 0 ? (
                <div className="py-12 text-center text-white/60">
                  {search ? "No users match your search." : "No users yet."}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-white/50">
                        <th className="px-4 py-3 font-medium">Username</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Plan</th>
                        <th className="px-4 py-3 font-medium">Role</th>
                        <th className="px-4 py-3 font-medium">Checks Used</th>
                        <th className="px-4 py-3 font-medium">Logins</th>
                        <th className="px-4 py-3 font-medium">Last Login</th>
                        <th className="px-4 py-3 font-medium">Joined</th>
                        <th className="px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition">
                          <td className="px-4 py-3 font-medium text-white">{u.username}</td>
                          <td className="px-4 py-3 text-white/60">
                            {u.email ? (
                              <span className="flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5" /> {u.email}
                              </span>
                            ) : (
                              <span className="text-white/30">--</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={u.subscriptionTier}
                              onChange={(e) =>
                                updateSubscription.mutate({ userId: u.id, tier: e.target.value })
                              }
                              className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-white focus:border-red-500/50 focus:outline-none"
                            >
                              <option value="free">Free</option>
                              <option value="recruit">Recruit ($29)</option>
                              <option value="serious">Serious ($99)</option>
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            {u.isAdmin ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-xs font-medium text-red-400">
                                Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-xs text-white/50">
                                User
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-white/60 text-center">{u.pathwayChecksUsed}</td>
                          <td className="px-4 py-3 text-white/60 text-center">{u.loginCount}</td>
                          <td className="px-4 py-3 text-white/50 whitespace-nowrap">
                            {u.lastLoginAt ? (
                              new Date(u.lastLoginAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })
                            ) : (
                              <span className="text-white/30">Never</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-white/50 whitespace-nowrap">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(u.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  updateRole.mutate({ userId: u.id, isAdmin: !u.isAdmin })
                                }
                                disabled={u.id === user?.id}
                                title={u.isAdmin ? "Remove admin" : "Make admin"}
                                className="rounded p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Shield className="h-3.5 w-3.5" />
                              </button>
                              {deleteConfirm === u.id ? (
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => deleteUser.mutate(u.id)}
                                    className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-500"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="rounded bg-white/10 px-2 py-1 text-xs text-white/60 hover:bg-white/20"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(u.id)}
                                  disabled={u.id === user?.id}
                                  title="Delete user"
                                  className="rounded p-1.5 text-white/40 transition hover:bg-red-500/20 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Pathway Checks Tab */}
          {tab === "checks" && (
            <div className="pc-card overflow-hidden">
              {checksLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-white/60" />
                </div>
              ) : !allChecks || allChecks.length === 0 ? (
                <div className="py-12 text-center text-white/60">No pathway checks yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-white/50">
                        <th className="px-4 py-3 font-medium">Name</th>
                        <th className="px-4 py-3 font-medium">Email</th>
                        <th className="px-4 py-3 font-medium">Position</th>
                        <th className="px-4 py-3 font-medium">Class</th>
                        <th className="px-4 py-3 font-medium">Schools</th>
                        <th className="px-4 py-3 font-medium">Competition</th>
                        <th className="px-4 py-3 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {allChecks.map((c) => {
                        const results = c.results as PathwayResults | null;
                        return (
                          <tr key={c.id} className="hover:bg-white/5 transition">
                            <td className="px-4 py-3 font-medium text-white whitespace-nowrap">
                              {c.firstName} {c.lastName}
                            </td>
                            <td className="px-4 py-3 text-white/60">{c.email}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex h-6 w-8 items-center justify-center rounded bg-white/10 text-xs font-bold text-white">
                                {c.position}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-white/60">{c.classYear}</td>
                            <td className="px-4 py-3 text-white/60 max-w-[200px] truncate">
                              {c.targetSchools.join(", ")}
                            </td>
                            <td className="px-4 py-3">
                              {results ? (
                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${
                                  results.competitionIndex === "Low" ? "bg-green-500/20 text-green-400 border-green-500/30" :
                                  results.competitionIndex === "Medium" ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" :
                                  results.competitionIndex === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                                  "bg-red-500/20 text-red-400 border-red-500/30"
                                }`}>
                                  {results.competitionIndex}
                                </span>
                              ) : (
                                <span className="text-white/30">--</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-white/50 whitespace-nowrap">
                              {new Date(c.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
