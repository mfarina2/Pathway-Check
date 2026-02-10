import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 pc-grid opacity-60" />
        <div className="absolute inset-0 pc-noise" />
        <div className="absolute -top-24 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-red-600/12 blur-3xl" />
        <div className="absolute -top-10 right-[-120px] h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}
