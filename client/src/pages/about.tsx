import { Link } from "wouter";
import { ArrowRight, Database, Eye, Users, Heart, BarChart3, Shield } from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";

export default function About() {
  return (
    <PageWrapper>
      <section className="pc-section pt-24 sm:pt-32">
        <div className="pc-container text-center">
          <div
            data-testid="text-about-eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-blue-300"
          >
            About PathwayCheck
          </div>
          <h1
            data-testid="text-about-hero-title"
            className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Our Mission: Make{" "}
            <span className="pc-text-gradient">'Fit' As Clear As NIL</span>
          </h1>
          <p
            data-testid="text-about-hero-subtitle"
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            We believe every recruit deserves a clear picture of where they stand—before they sign.
          </p>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div
                data-testid="text-mission-eyebrow"
                className="text-sm font-semibold tracking-[0.18em] text-red-400"
              >
                Why We Exist
              </div>
              <h2
                data-testid="text-mission-title"
                className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                The Mission
              </h2>
              <p
                data-testid="text-mission-description"
                className="mt-4 text-base leading-relaxed text-white/75"
              >
                Every year, thousands of high school baseball players commit to programs based on
                scholarship offers, campus tours, and gut feelings. But few have real data about
                where they'll actually fit on the roster. We built PathwayCheck to change that.
              </p>
            </div>
            <div className="pc-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-red-600/15 ring-1 ring-red-500/25">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <div
                  data-testid="text-mission-card-title"
                  className="text-lg font-semibold text-white"
                >
                  Built for Recruits
                </div>
              </div>
              <p
                data-testid="text-mission-card-desc"
                className="mt-4 text-sm leading-relaxed text-white/72"
              >
                PathwayCheck exists because the recruiting process has a massive information gap.
                Coaches sell. We clarify.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="mx-auto max-w-3xl text-center">
            <div
              data-testid="text-started-eyebrow"
              className="text-sm font-semibold tracking-[0.18em] text-blue-400"
            >
              How It Started
            </div>
            <h2
              data-testid="text-started-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              One Conversation Changed Everything
            </h2>
            <p
              data-testid="text-started-description"
              className="mt-4 text-base leading-relaxed text-white/75"
            >
              We watched too many talented players transfer after realizing they were buried on a
              depth chart nobody told them about. One conversation with a frustrated parent was all
              it took—we knew there had to be a better way.
            </p>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="text-center">
            <div
              data-testid="text-approach-eyebrow"
              className="text-sm font-semibold tracking-[0.18em] text-red-400"
            >
              Our Approach
            </div>
            <h2
              data-testid="text-approach-title"
              className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              How We Think About Recruiting
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div data-testid="card-approach-data" className="pc-card pc-card-hover group p-6 sm:p-7">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <h3
                data-testid="text-approach-data-title"
                className="mt-4 text-xl font-semibold text-white"
              >
                Data-Driven
              </h3>
              <p
                data-testid="text-approach-data-desc"
                className="mt-3 text-sm leading-relaxed text-white/72"
              >
                Every analysis is backed by roster data, historical patterns, and position-specific
                metrics.
              </p>
            </div>

            <div data-testid="card-approach-transparent" className="pc-card pc-card-hover group p-6 sm:p-7">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
              <h3
                data-testid="text-approach-transparent-title"
                className="mt-4 text-xl font-semibold text-white"
              >
                Transparent
              </h3>
              <p
                data-testid="text-approach-transparent-desc"
                className="mt-3 text-sm leading-relaxed text-white/72"
              >
                We show you the numbers, not just a recommendation. You make the final call.
              </p>
            </div>

            <div data-testid="card-approach-recruit" className="pc-card pc-card-hover group p-6 sm:p-7">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3
                data-testid="text-approach-recruit-title"
                className="mt-4 text-xl font-semibold text-white"
              >
                Recruit-First
              </h3>
              <p
                data-testid="text-approach-recruit-desc"
                className="mt-3 text-sm leading-relaxed text-white/72"
              >
                We're not anti-coach. We're pro-clarity. Better-informed recruits make better
                decisions for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="pc-card p-8 sm:p-10 text-center">
            <div className="grid h-14 w-14 mx-auto place-items-center rounded-full bg-blue-500/12 ring-1 ring-blue-400/25">
              <Users className="h-7 w-7 text-blue-400" />
            </div>
            <h2
              data-testid="text-team-title"
              className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              The Team
            </h2>
            <p
              data-testid="text-team-description"
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75"
            >
              We're a small team of former players, coaches, and data analysts passionate about
              fixing the information gap in baseball recruiting.
            </p>
          </div>
        </div>
      </section>

      <section className="pc-section">
        <div className="pc-container">
          <div className="pc-card pc-red-glow p-8 sm:p-12 text-center">
            <h2
              data-testid="text-contact-cta-title"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Have questions? We're here to help.
            </h2>
            <p
              data-testid="text-contact-cta-desc"
              className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/75"
            >
              Whether you're a recruit, a parent, or a coach—reach out anytime.
            </p>
            <Link
              href="/contact"
              data-testid="link-contact-cta"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
