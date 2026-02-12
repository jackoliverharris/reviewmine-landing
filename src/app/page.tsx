import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ReviewSignalsStrip from "@/components/ReviewSignalsStrip";
import {
  FeaturesSection,
  HowItWorksSection,
  OldWayComparisonSection,
} from "@/components/Features";
import WhoIsThisFor from "@/components/WhoIsThisFor";
import Faq from "@/components/Faq";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";
import MobileStickyCta from "@/components/MobileStickyCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="page-tone-0">
          <Hero />
        </div>
        <div className="page-tone-1">
          <ReviewSignalsStrip />
        </div>
        <div className="page-tone-2">
          <FeaturesSection />
        </div>
        <div className="page-tone-3">
          <HowItWorksSection />
        </div>
        <div className="page-tone-4">
          <OldWayComparisonSection />
        </div>
        <div className="page-tone-5">
          <WhoIsThisFor />
        </div>
        <div className="page-tone-6">
          <Faq />
        </div>
        <div className="page-tone-7">
          <WaitlistForm />
          <Footer />
        </div>
      </main>
      <MobileStickyCta />
    </>
  );
}
