import React from "react";
import { Phone, Mail, Compass, Star, MapPin } from "lucide-react";

interface HeaderProps {
  onOpenInquiry: (serviceType: string, serviceName: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Header({ onOpenInquiry, onScrollToSection }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#12351e] text-white shadow-md border-b border-[#0b421d]">
      {/* Upper notification bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row justify-between items-center text-xs text-[#a9c126] font-mono border-b border-[#0b421d]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Call Local Driver Helpline: +91 94460 12345
          </span>
          <span className="hidden md:inline-flex items-center gap-1">
            <Mail className="w-3.5 h-3.5" /> bookings@keralayaatra.com
          </span>
        </div>
        <div className="flex items-center gap-4 mt-1 sm:mt-0">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-[#a9c126]" /> Government-Approved Tourist Cab Partner
          </span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Kochi, Kerala, India
          </span>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => onScrollToSection("hero")}
        >
          <div className="w-12 h-12 bg-[#a9c126] rounded-xl flex items-center justify-center text-[#12351e] shadow-md hover:scale-105 transition-transform duration-300">
            <Compass className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <h1 data-brand-text="business-name" data-brand-default="Keralayaatra" className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-1">
              Keralayaatra
              <span className="text-[#a9c126] text-3xl leading-none">.</span>
            </h1>
            <p data-brand-text="contact-name" className="text-[10px] md:text-xs text-emerald-200 uppercase tracking-widest font-mono">
              Kerala Taxi &amp; Tours
            </p>
          </div>
        </div>

        {/* Navigation Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => onScrollToSection("hero")}
            className="text-[#fbfdfb] hover:text-[#a9c126] transition-colors focus:outline-none cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onScrollToSection("ai-planner")}
            className="relative px-3 py-1 bg-emerald-950 text-[#a9c126] border border-[#a9c126]/30 rounded-full hover:bg-[#a9c126] hover:text-[#12351e] transition-all focus:outline-none cursor-pointer text-xs font-mono font-bold animate-pulse"
          >
            AI Itinerary Planner ✨
          </button>
          <button
            onClick={() => onScrollToSection("cabs")}
            className="text-emerald-200 hover:text-[#a9c126] transition-colors focus:outline-none cursor-pointer"
          >
            Taxi Fleet
          </button>
          <button
            onClick={() => onScrollToSection("destinations")}
            className="text-emerald-200 hover:text-[#a9c126] transition-colors focus:outline-none cursor-pointer"
          >
            Destinations
          </button>
          <button
            onClick={() => onScrollToSection("packages")}
            className="text-emerald-200 hover:text-[#a9c126] transition-colors focus:outline-none cursor-pointer"
          >
            Tour Packages
          </button>
          <button
            onClick={() => onScrollToSection("homestays")}
            className="text-emerald-200 hover:text-[#a9c126] transition-colors focus:outline-none cursor-pointer"
          >
            Homestays &amp; Resorts
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenInquiry("Full Custom Trip", "General Inquiry")}
            className="bg-[#a9c126] hover:bg-[#b8d135] text-[#12351e] font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-[#a9c126]/50 focus:outline-none"
          >
            Quick Quote
          </button>
        </div>
      </div>
    </header>
  );
}
