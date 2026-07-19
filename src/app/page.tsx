import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AreasStrip } from "@/components/areas-strip";
import { DiagnosticSection } from "@/components/diagnostic-section";
import { HowItWorks } from "@/components/how-it-works";
import { ProofSection } from "@/components/proof-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <AreasStrip />
        <DiagnosticSection />
        <HowItWorks />
        <ProofSection />
      </main>
      <Footer />
    </>
  );
}
