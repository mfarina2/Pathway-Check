import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sample Report", href: "/sample-report" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-black/55 backdrop-blur-xl supports-[backdrop-filter]:bg-black/45">
        <div className="pc-container">
          <div className="flex h-16 items-center justify-between">
            <Link
              data-testid="button-logo"
              href="/"
              className="group inline-flex items-center gap-2 font-semibold tracking-tight"
            >
              <span className="text-white">Pathway</span>
              <span className="pc-text-gradient">Check</span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  data-testid={`link-nav-${l.href.slice(1)}`}
                  href={l.href}
                  className={`text-sm transition hover:text-white ${
                    location === l.href ? "text-white font-medium" : "text-white/70"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                data-testid="button-nav-get-started"
                href="/check"
                className="pc-red-glow inline-flex h-10 items-center justify-center rounded-full bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-500 active:translate-y-px"
              >
                Check Your Pathway
              </Link>
              <button
                data-testid="button-mobile-menu"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-white/10 bg-black/90 backdrop-blur-xl lg:hidden">
          <nav className="pc-container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-testid={`link-mobile-${l.href.slice(1)}`}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm transition hover:bg-white/5 ${
                  location === l.href ? "text-white font-medium bg-white/5" : "text-white/70"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
