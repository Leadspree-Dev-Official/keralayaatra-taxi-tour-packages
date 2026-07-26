import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AISuggestions from "./components/AISuggestions";
import CabCalculator from "./components/CabCalculator";
import DestinationGuide from "./components/DestinationGuide";
import TourPackages from "./components/TourPackages";
import HomestaysResorts from "./components/HomestaysResorts";
import InquiryModal from "./components/InquiryModal";
import InquiryList from "./components/InquiryList";
import Footer from "./components/Footer";
import { CabType, TourPackageType, HomestayResortType, GeneratedItineraryType, BookingInquiryType } from "./types";
import { Heart, ShieldCheck, Compass, MessageSquare, Star, Users, ArrowUp, Phone } from "lucide-react";
import { BrandProvider, useBrand } from "./components/brand-demo/BrandProvider";
import { OnboardingModal, BrandResetButton } from "./components/brand-demo/OnboardingModal";
import AdminConsole from "./components/brand-demo/AdminConsole";

// Admin route renders outside of main site
if (typeof window !== "undefined" && window.location.pathname === "/admin") {
  // Handled in the component below via conditional render inside BrandProvider
}

function SiteCountdownPill() {
  const { countdown, session } = useBrand();
  if (!session || !countdown) return null;
  return (
    <div className="fixed top-[88px] right-4 z-[80] inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3 py-1.5 text-[11px] text-white/70 shadow-lg">
      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="font-mono">Session: {countdown} remaining</span>
    </div>
  );
}

function MainSite() {
  // Modal configurations
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalServiceType, setModalServiceType] = useState("Full Custom Trip");
  const [modalServiceName, setModalServiceName] = useState("General Inquiry");
  const [modalNotesText, setModalNotesText] = useState("");

  // Refresh trigger for local inquiry logs list
  const [listRefreshTrigger, setListRefreshTrigger] = useState(0);

  // Scroll to section helper
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Open modal with prefilled data
  const handleOpenInquiry = (serviceType: string, serviceName: string, notesText = "") => {
    setModalServiceType(serviceType);
    setModalServiceName(serviceName);
    setModalNotesText(notesText);
    setIsModalOpen(true);
  };

  // Handlers from sub-components
  const handleBookCab = (cab: CabType, estimatedCost: number, detailsText: string) => {
    handleOpenInquiry(
      "Taxi",
      cab.name,
      `Requested booking for ${cab.name}. Calculated Rate Estimate: ₹${estimatedCost.toLocaleString()}. Extra details: ${detailsText}`
    );
  };

  const handleSelectPackage = (pkg: TourPackageType) => {
    handleOpenInquiry(
      "Tour Package",
      pkg.name,
      `Interested in pre-made itinerary: "${pkg.name}" (${pkg.duration}). Price starting at: ₹${pkg.priceStarting.toLocaleString()} per person.`
    );
  };

  const handleSelectHomestay = (stay: HomestayResortType) => {
    handleOpenInquiry(
      "Homestay/Resort",
      stay.name,
      `Requested availability for ${stay.name} (${stay.type}) in ${stay.location}. Starting Nightly Rate: ₹${stay.pricePerNight.toLocaleString()}/room.`
    );
  };

  const handleBookItinerary = (itinerary: GeneratedItineraryType) => {
    const detailLog = `Custom AI Route: "${itinerary.title}"\nEstimated Budget: ${itinerary.totalEstimatedCostRange}\nRecommended Cab: ${itinerary.recommendedFleet}\nRoute sequence:\n${itinerary.days.map((d) => `Day ${d.dayNumber}: ${d.title} (Stay: ${d.stayRecommendation}, Transit time: ${d.transitTime})`).join("\n")}`;
    handleOpenInquiry("Full Custom Trip", itinerary.title, detailLog);
  };

  const handlePlanDestination = (destName: string) => {
    handleOpenInquiry(
      "Full Custom Trip",
      `Custom trip to ${destName}`,
      `Please plan a tailored multi-day tour package including ${destName} as a major destination. Recommend a suitable fleet and homestay stays.`
    );
  };

  const handleInquirySubmitted = (inquiry: BookingInquiryType) => {
    // Refresh inquiry logs list
    setListRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#fbfdfb] text-[#12351e] flex flex-col antialiased">
      {/* Upper Navigation Header */}
      <Header
        onOpenInquiry={handleOpenInquiry}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Core Elements */}
      <main className="flex-1">
        {/* Hero Section with Quick Pricing calculator */}
        <Hero
          onOpenInquiry={handleOpenInquiry}
          onScrollToSection={handleScrollToSection}
        />

        {/* Local Driver Partner USP section */}
        <section className="py-12 bg-[#12351e]/5 border-b border-emerald-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#12351e] text-[#a9c126] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#12351e] tracking-tight">Zero-Advance Booking</h4>
                  <p className="text-xs text-[#617366] mt-1 leading-snug">
                    Confirm your vehicle and hotels with zero upfront deposits. Pay your tourist driver directly in Kerala.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#12351e] text-[#a9c126] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Users className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#12351e] tracking-tight">Tourist-Certified Drivers</h4>
                  <p className="text-xs text-[#617366] mt-1 leading-snug">
                    Polite, non-smoking, certified local driver-partners who speak English &amp; Hindi and know every mountain curve.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#12351e] text-[#a9c126] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <Compass className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#12351e] tracking-tight">Direct Local Pricing</h4>
                  <p className="text-xs text-[#617366] mt-1 leading-snug">
                    No middlemen commissions, OTA processing margins, or agency markups. Fixed prices with exact math.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-[#12351e] text-[#a9c126] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                  <MessageSquare className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#12351e] tracking-tight">24/7 Operations Desk</h4>
                  <p className="text-xs text-[#617366] mt-1 leading-snug">
                    Instant airport coordination back-up, flight delay trackings, and continuous live chat support during your tour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Travel suggestions Itinerary Generator Section */}
        <AISuggestions onBookItinerary={handleBookItinerary} />

        {/* Interactive Cab pricing and fleet catalog */}
        <CabCalculator onBookCab={handleBookCab} />

        {/* Destinations Explore Guide */}
        <DestinationGuide onPlanDestination={handlePlanDestination} />

        {/* Tour packages card list */}
        <TourPackages onSelectPackage={handleSelectPackage} />

        {/* Homestays & Resorts showcases */}
        <HomestaysResorts onSelectHomestay={handleSelectHomestay} />

        {/* User's local inquiries list logging section */}
        <InquiryList refreshTrigger={listRefreshTrigger} />

        {/* Kerala Tourism / Partner stats banner */}
        <section className="py-16 bg-[#12351e] text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Let&apos;s Craft Your Kerala Story Together
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
              We understand that a vacation is not about standard sightseeing checklists—it is about high mist-clung valleys, freshly caught Karimeen fish on a houseboat terrace, and the warm smiles of our local drivers. Connect with Keralayaatra today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#a9c126]">
                <Star className="w-4 h-4 fill-current text-[#a9c126]" /> Rated 4.9/5 by 1200+ Travelers
              </div>
              <span className="hidden sm:inline-block text-[#0b421d]">•</span>
              <div>
                📞 Coordinator Direct WhatsApp: <strong>+91 94460 12345</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer info and credentials */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Centralized popup Inquiry/Booking modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceType={modalServiceType}
        serviceName={modalServiceName}
        notesText={modalNotesText}
        onSubmitInquiry={handleInquirySubmitted}
      />

      {/* Brand Demo: Onboarding Modal, Reset Button, Session Countdown */}
      <OnboardingModal />
      <BrandResetButton />
      <SiteCountdownPill />

      {/* Float to top anchor */}
      <button
        onClick={() => handleScrollToSection("hero")}
        className="fixed bottom-6 right-6 z-40 bg-[#12351e] hover:bg-[#a9c126] hover:text-[#12351e] text-white p-3.5 rounded-full shadow-lg border border-emerald-800 transition-all cursor-pointer hover:scale-105 active:scale-95 focus:outline-none"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default function App() {
  // Admin route renders outside BrandProvider
  if (typeof window !== "undefined" && window.location.pathname === "/admin") {
    return (
      <BrandProvider>
        <AdminConsole />
      </BrandProvider>
    );
  }

  return (
    <BrandProvider>
      <MainSite />
    </BrandProvider>
  );
}
