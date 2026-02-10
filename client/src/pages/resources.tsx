import { useState } from "react";
import { Link } from "wouter";
import { BookOpen, ArrowRight } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

type Category = "All" | "Recruiting Tips" | "Position Guides" | "Questions to Ask" | "Parent Resources";

const categories: Category[] = ["All", "Recruiting Tips", "Position Guides", "Questions to Ask", "Parent Resources"];

const articles = [
  {
    id: "questions-before-committing",
    title: "10 Questions Every Baseball Recruit Must Ask Before Committing",
    category: "Questions to Ask" as Category,
    author: "PathwayCheck Team",
    date: "Jan 15, 2025",
    excerpt: "Before you sign that NLI, make sure you're asking the right questions. These 10 critical questions can reveal everything about your future playing time.",
    gradient: "from-red-600 to-blue-600",
  },
  {
    id: "understanding-depth-charts",
    title: "Understanding Depth Charts: What Coaches Won't Tell You",
    category: "Recruiting Tips" as Category,
    author: "PathwayCheck Team",
    date: "Jan 8, 2025",
    excerpt: "Depth charts tell a story that recruiting pitches never will. Learn how to read between the lines and understand where you really stand.",
    gradient: "from-red-500 to-purple-600",
  },
  {
    id: "red-flags-bench",
    title: "Red Flags: Signs You'll Be Buried on the Bench",
    category: "Recruiting Tips" as Category,
    author: "PathwayCheck Team",
    date: "Dec 28, 2024",
    excerpt: "Over-recruiting is real, and it can derail your college career before it starts. Here are the warning signs every recruit needs to watch for.",
    gradient: "from-blue-600 to-red-500",
  },
  {
    id: "parents-support",
    title: "For Parents: How to Support Without Pressuring",
    category: "Parent Resources" as Category,
    author: "PathwayCheck Team",
    date: "Dec 15, 2024",
    excerpt: "The recruiting process is stressful for the whole family. Learn how to be your athlete's biggest supporter without adding unnecessary pressure.",
    gradient: "from-red-700 to-blue-500",
  },
  {
    id: "over-recruiting-truth",
    title: "The Truth About Over-Recruiting in College Baseball",
    category: "Recruiting Tips" as Category,
    author: "PathwayCheck Team",
    date: "Dec 1, 2024",
    excerpt: "Programs routinely recruit more players than they have roster spots. Understanding this reality is the first step to protecting your future.",
    gradient: "from-blue-500 to-red-600",
  },
];

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = activeCategory === "All"
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  return (
    <PageWrapper>
      <section className="pc-section">
        <div className="pc-container text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <BookOpen className="h-7 w-7" />
          </div>
          <h1 data-testid="text-resources-hero" className="text-4xl font-bold sm:text-5xl">
            Recruiting Resources for{" "}
            <span className="pc-text-gradient">Serious Players</span>
          </h1>
          <p data-testid="text-resources-subtitle" className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Expert insights, guides, and tips to help you navigate the college baseball recruiting process with confidence.
          </p>
        </div>
      </section>

      <section className="pc-section pt-0">
        <div className="pc-container">
          <div data-testid="filter-categories" className="mb-10 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`button-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                  activeCategory === cat
                    ? "border-red-500 bg-red-500/20 text-red-400"
                    : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div data-testid="articles-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <article
                key={article.id}
                data-testid={`card-article-${article.id}`}
                className="pc-card pc-card-hover flex flex-col"
              >
                <div className={`h-44 bg-gradient-to-br ${article.gradient} opacity-80`} />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    data-testid={`badge-category-${article.id}`}
                    className="mb-3 inline-block w-fit rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                  >
                    {article.category}
                  </span>
                  <h3 data-testid={`text-title-${article.id}`} className="mb-2 text-lg font-semibold leading-snug">
                    {article.title}
                  </h3>
                  <p data-testid={`text-excerpt-${article.id}`} className="mb-4 flex-1 text-sm leading-relaxed text-white/60">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span data-testid={`text-meta-${article.id}`} className="text-xs text-white/40">
                      {article.author} · {article.date}
                    </span>
                    <Link
                      href="/resources"
                      data-testid={`link-read-more-${article.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-red-400 transition hover:text-red-300"
                    >
                      Read More
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <p data-testid="text-no-articles" className="py-16 text-center text-white/40">
              No articles in this category yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container text-center">
          <div className="pc-card pc-red-glow mx-auto max-w-2xl p-10">
            <h2 data-testid="text-cta-title" className="text-2xl font-bold sm:text-3xl">
              Ready to check your pathway?
            </h2>
            <p data-testid="text-cta-subtitle" className="mx-auto mt-3 max-w-md text-white/60">
              Get a personalized analysis of your playing-time opportunities at your target schools.
            </p>
            <Link
              href="/check"
              data-testid="link-cta-check"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500"
            >
              Start Your Check
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
