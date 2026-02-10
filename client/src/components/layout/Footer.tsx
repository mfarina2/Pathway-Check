import { Link } from "wouter";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Sample Report", href: "/sample-report" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/resources" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
      { label: "Terms of Service", href: "/about" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/55">
      <div className="pc-container py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="text-lg font-semibold">
              <span className="text-white">Pathway</span>
              <span className="pc-text-gradient">Check</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Helping high school baseball recruits evaluate playing-time opportunities and make their best-fit
              college decision.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 md:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold tracking-[0.18em] text-red-400">{col.title}</div>
                <ul className="mt-4 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        data-testid={`link-footer-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                        href={l.href}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {l.label}
                      </Link>
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
  );
}
