import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { RatesSection } from "@/components/sections/RatesSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { TrustBarSection } from "@/components/sections/TrustBarSection";
import { WhySection } from "@/components/sections/WhySection";
import { StaleBanner } from "@/components/ui/StaleBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <StaleBanner lang="ro" />
      <main>
        <HeroSection />
        <TrustBarSection />
        <RatesSection />
        <ReviewsSection />
        <WhySection />
        <LocationSection />
      </main>
      <SiteFooter />
    </div>
  );
}
