import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, HelpCircle, Wrench, Target, Users, Shield } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

const faqCategories = [
  {
    id: "about",
    title: "About PathwayCheck",
    icon: HelpCircle,
    items: [
      {
        q: "What is PathwayCheck?",
        a: "PathwayCheck is a tool designed for high school baseball recruits to evaluate playing-time opportunities at college programs. We analyze roster composition, position competition, and program trends to give you a clear picture of where you stand before you commit.",
      },
      {
        q: "Who created PathwayCheck?",
        a: "PathwayCheck was built by a team of former players, coaches, and data analysts who saw too many recruits make decisions based on gut feelings instead of data.",
      },
      {
        q: "How accurate are your projections?",
        a: "Our projections are based on publicly available roster data, historical patterns, and position-specific analysis. While no tool can predict the future with 100% accuracy, PathwayCheck gives you the best available data to make an informed decision.",
      },
      {
        q: "Where do you get roster data?",
        a: "We compile data from official team rosters, recruiting databases, and public records. Our data is updated regularly to reflect the latest roster changes.",
      },
    ],
  },
  {
    id: "using",
    title: "Using the Tool",
    icon: Wrench,
    items: [
      {
        q: "How long does it take?",
        a: "The entire process takes under 2 minutes. Enter your information, select your target schools, and get your pathway analysis instantly.",
      },
      {
        q: "What information do I need?",
        a: "You'll need your position, class year, current playing level, and a list of colleges you're interested in.",
      },
      {
        q: "Can I analyze multiple schools?",
        a: "Yes! Depending on your plan, you can analyze up to 5 schools (Recruit Plan) or unlimited schools (Serious Commit Plan).",
      },
      {
        q: "What if my school isn't in the database?",
        a: "We're constantly expanding our school database. If your target school isn't available, contact us and we'll work to add it.",
      },
    ],
  },
  {
    id: "recruits",
    title: "For Recruits",
    icon: Target,
    items: [
      {
        q: "When should I use PathwayCheck?",
        a: "Ideally, use PathwayCheck before your campus visits and before making any commitment. The earlier you have this data, the better questions you can ask.",
      },
      {
        q: "Should I share this with coaches?",
        a: "That's up to you. The verification questions are designed for conversations with coaches, but the detailed analysis is for your benefit.",
      },
      {
        q: "What if the metrics show I'm 'blocked'?",
        a: "If your analysis shows high competition at a school, that's valuable information. It doesn't mean you can't succeed there—it means you should ask tougher questions and consider other options.",
      },
      {
        q: "Can this help me negotiate?",
        a: "Absolutely. Understanding roster composition gives you leverage in conversations with coaches about roles, timelines, and development plans.",
      },
    ],
  },
  {
    id: "parents",
    title: "For Parents",
    icon: Users,
    items: [
      {
        q: "Can I access my son's/daughter's analysis?",
        a: "Yes, results can be shared via a unique link. Our Serious Commit Plan also includes a parent dashboard.",
      },
      {
        q: "How can I use this during visits?",
        a: "Bring the verification questions to campus visits. They're designed to get specific, honest answers from coaching staff.",
      },
      {
        q: "Is there a parent dashboard?",
        a: "The parent dashboard is available with our Serious Commit Plan and provides a side-by-side comparison of all schools analyzed.",
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    icon: Shield,
    items: [
      {
        q: "What data do you collect?",
        a: "We collect your name, email, position, and target schools. This information is used solely to generate your pathway analysis.",
      },
      {
        q: "Do you share data with coaches/schools?",
        a: "Never. Your information is completely confidential. We do not share any user data with coaches, schools, or third parties.",
      },
      {
        q: "Is my information secure?",
        a: "Yes. We use industry-standard encryption and security practices to protect your data.",
      },
    ],
  },
];

function FAQItem({
  q,
  a,
  categoryId,
  index,
}: {
  q: string;
  a: string;
  categoryId: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-testid={`faq-item-${categoryId}-${index}`}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        data-testid={`button-faq-toggle-${categoryId}-${index}`}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-base font-semibold text-white">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p
            data-testid={`text-faq-answer-${categoryId}-${index}`}
            className="pb-5 text-sm leading-relaxed text-white/70"
          >
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <PageWrapper>
      <section className="pc-section pt-24 sm:pt-32">
        <div className="pc-container text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-red-300">
            <HelpCircle className="h-3.5 w-3.5" />
            FAQ
          </div>
          <h1
            data-testid="text-faq-headline"
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            Frequently Asked{" "}
            <span className="pc-text-gradient">Questions</span>
          </h1>
          <p
            data-testid="text-faq-subtitle"
            className="mx-auto mt-4 max-w-2xl text-lg text-white/60"
          >
            Everything you need to know about PathwayCheck and how it helps
            recruits make smarter college decisions.
          </p>
        </div>
      </section>

      <section className="pc-section pt-0">
        <div className="pc-container space-y-12">
          {faqCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} data-testid={`faq-category-${category.id}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/15">
                    <Icon className="h-5 w-5 text-red-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">
                    {category.title}
                  </h2>
                </div>
                <div className="pc-card p-6">
                  {category.items.map((item, idx) => (
                    <FAQItem
                      key={idx}
                      q={item.q}
                      a={item.a}
                      categoryId={category.id}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container text-center">
          <div className="pc-card mx-auto max-w-2xl p-10">
            <h2
              data-testid="text-faq-cta-headline"
              className="text-2xl font-semibold text-white sm:text-3xl"
            >
              Still have questions?
            </h2>
            <p className="mt-3 text-white/60">
              We're here to help. Reach out and we'll get back to you as soon as
              possible.
            </p>
            <Link
              href="/contact"
              data-testid="link-faq-contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
