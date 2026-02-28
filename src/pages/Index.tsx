import { Link } from "react-router-dom";
import { Shield, GraduationCap, Star, ArrowRight, Lock, Fingerprint, FileCheck, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroShield from "@/assets/hero-shield.png";

const features = [
  {
    icon: Lock,
    title: "Smart Escrow Protection",
    desc: "Funds are locked in a smart contract until both parties confirm the transaction is complete.",
  },
  {
    icon: GraduationCap,
    title: "Campus Verified Wallet Access",
    desc: "Only verified university students can access the marketplace, ensuring a trusted community.",
  },
  {
    icon: Star,
    title: "Immutable Reputation System",
    desc: "Seller ratings are permanently recorded on-chain. No fake reviews, no manipulation.",
  },
];

const usps = [
  { icon: Lock, title: "Escrow-Protected Payments", desc: "Every transaction secured by smart contract escrow." },
  { icon: Fingerprint, title: "Campus-Verified Access", desc: "Restricted to verified student wallets only." },
  { icon: FileCheck, title: "On-Chain Proof", desc: "Every trade permanently recorded on-chain." },
  { icon: Coins, title: "Zero Commission", desc: "Trade freely with minimal network fees." },
];

const Index = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero - KEEP EXACTLY AS IS */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center md:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-primary">
              <Shield className="h-3.5 w-3.5" />
              Powered by Algorand Blockchain
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Trustless Campus Trading{" "}
              <span className="text-gradient">Powered by Blockchain</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Secure. Transparent. Escrow-Protected. The only campus marketplace where every transaction is backed by smart contract escrow.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="gap-2">
                <Link to="/marketplace">
                  Explore Marketplace <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src={heroShield}
              alt="Blockchain security shield"
              className="w-64 md:w-80 drop-shadow-2xl animate-pulse-glow"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-xl p-6 space-y-3 glass-hover group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-shadow">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TrustChain */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-display font-bold text-center mb-12">
          Why <span className="text-gradient">TrustChain Market</span>?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {usps.map((u) => (
            <div key={u.title} className="glass rounded-xl p-5 space-y-2 border-glow glass-hover">
              <u.icon className="h-8 w-8 text-accent" />
              <h4 className="font-display font-semibold text-sm text-foreground">{u.title}</h4>
              <p className="text-xs text-muted-foreground">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
