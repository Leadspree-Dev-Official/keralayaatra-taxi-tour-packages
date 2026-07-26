import React, { useState } from "react";
import { Compass, Car, Sparkles, MapPin, Calendar, HelpCircle, Users } from "lucide-react";

interface HeroProps {
  onOpenInquiry: (serviceType: string, serviceName: string, notes?: string) => void;
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onOpenInquiry, onScrollToSection }: HeroProps) {
  const [service, setService] = useState<"taxi" | "package" | "resort">("taxi");
  const [passengers, setPassengers] = useState<number>(2);
  const [days, setDays] = useState<number>(5);
  const [pickup, setPickup] = useState<string>("Cochin Airport (COK)");

  const handleQuickEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    let serviceTypeName = "Taxi service";
    let serviceName = `Cab transfer from ${pickup}`;
    let notes = `Quick estimate requested for ${passengers} passengers, ${days} days.`;

    if (service === "package") {
      serviceTypeName = "Tour Package";
      serviceName = "Custom Family Tour";
      notes = `Custom tour from ${pickup} for ${passengers} travelers over ${days} days.`;
    } else if (service === "resort") {
      serviceTypeName = "Homestay/Resort";
      serviceName = "Heritage Resort stay";
      notes = `Cottage booking for ${passengers} adults, duration ${days} nights.`;
    }

    onOpenInquiry(serviceTypeName, serviceName, notes);
  };

  return (
    <section id="hero" className="relative bg-[#12351e] text-[#fbfdfb] overflow-hidden py-16 lg:py-24">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a9c126_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a9c126] rounded-full blur-[160px] opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copywriting & Key USPs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a9c126]/10 border border-[#a9c126]/30 rounded-full text-[#a9c126] text-xs font-mono font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Direct Local Tourist Cab &amp; Driver Network
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
            Explore God&apos;s Own Country with the <span className="text-[#a9c126]">Most Trusted</span> Kerala Taxi &amp; Tour Partner
          </h2>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl leading-relaxed">
            Skip the middleman. Book directly with local certified English &amp; Hindi speaking drivers. Secure clean premium sedans, Toyota Innovas, or Tempo Travellers at fixed, transparent rates. No hidden toll fees or driver allowance surprises.
          </p>

          {/* Quick USPs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs font-medium">
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-[#0b421d] p-3 rounded-xl shadow-1">
              <span className="text-[#a9c126] text-lg font-bold">100%</span>
              <span className="text-white/80">Local Owner Drivers</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-[#0b421d] p-3 rounded-xl shadow-1">
              <span className="text-[#a9c126] text-lg font-bold">₹0</span>
              <span className="text-white/80">Booking Advance</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-[#0b421d] p-3 rounded-xl shadow-1 col-span-2 sm:col-span-1">
              <span className="text-[#a9c126] text-lg font-bold">24/7</span>
              <span className="text-white/80">Airport Backup fleet</span>
            </div>
          </div>

          {/* Core Interactive Triggers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => onScrollToSection("ai-planner")}
              className="bg-[#a9c126] hover:bg-[#b8d135] text-[#12351e] font-bold text-sm px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 border border-transparent"
            >
              <Sparkles className="w-4 h-4 text-[#12351e] fill-current animate-spin" />
              Plan Your Trip with AI (Free)
            </button>
            <button
              onClick={() => onScrollToSection("cabs")}
              className="bg-emerald-950 hover:bg-emerald-900 text-white font-semibold text-sm px-6 py-4 rounded-xl border border-emerald-800 hover:border-emerald-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4 text-[#a9c126]" />
              View Cab Pricing &amp; Fleet
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic Quote / Inquiry Card */}
        <div className="lg:col-span-5 bg-[#fbfdfb] rounded-2xl p-6 shadow-4 text-[#12351e] border border-emerald-100">
          <div className="text-center pb-4 border-b border-emerald-50">
            <h3 className="font-bold text-lg text-[#12351e] tracking-tight">
              Get an Instant Free Quote
            </h3>
            <p className="text-xs text-[#617366]">
              Direct local partner pricing. Response in 15 minutes.
            </p>
          </div>

          {/* Quick Tabs to toggle service */}
          <div className="flex rounded-lg bg-emerald-50 p-1 my-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setService("taxi")}
              className={`flex-1 py-2 rounded-md text-center cursor-pointer transition-colors ${
                service === "taxi"
                  ? "bg-[#12351e] text-[#fbfdfb]"
                  : "text-[#12351e] hover:bg-emerald-100/50"
              }`}
            >
              Cabs &amp; Taxi
            </button>
            <button
              type="button"
              onClick={() => setService("package")}
              className={`flex-1 py-2 rounded-md text-center cursor-pointer transition-colors ${
                service === "package"
                  ? "bg-[#12351e] text-[#fbfdfb]"
                  : "text-[#12351e] hover:bg-emerald-100/50"
              }`}
            >
              Tour Packages
            </button>
            <button
              type="button"
              onClick={() => setService("resort")}
              className={`flex-1 py-2 rounded-md text-center cursor-pointer transition-colors ${
                service === "resort"
                  ? "bg-[#12351e] text-[#fbfdfb]"
                  : "text-[#12351e] hover:bg-emerald-100/50"
              }`}
            >
              Homestays
            </button>
          </div>

          <form onSubmit={handleQuickEstimate} className="space-y-4">
            {/* Pickup location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                Pickup Point / Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/60" />
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e]"
                >
                  <option value="Cochin Airport (COK)">Cochin Airport (COK) - Recommended</option>
                  <option value="Trivandrum Airport (TRV)">Trivandrum Airport (TRV)</option>
                  <option value="Calicut Airport (CCJ)">Calicut Airport (CCJ)</option>
                  <option value="Kochi City / Ernakulam Stn">Kochi City / Ernakulam Stn</option>
                  <option value="Munnar Hills">Munnar Hills</option>
                  <option value="Alleppey Backwaters">Alleppey Backwaters</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Passengers count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/60" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Person" : "People"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tour Days count */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                  Duration (Days)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/60" />
                  <select
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full bg-emerald-50/50 border border-emerald-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e]"
                  >
                    {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14].map((num) => (
                      <option key={num} value={num}>
                        {num} Days
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Estimated pricing widget depending on selections */}
            <div className="bg-emerald-50 border border-emerald-100/50 p-4 rounded-xl text-center">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#617366] block">
                Estimated Starting Cost
              </span>
              <span className="text-2xl font-extrabold text-[#12351e] block mt-1">
                {service === "taxi" && `₹${(days * 2400).toLocaleString()} (A/C Sedan)`}
                {service === "package" && `₹${(days * 2900).toLocaleString()} (Per Person)`}
                {service === "resort" && `₹${(days * 3500).toLocaleString()} (Standard Cottage)`}
              </span>
              <span className="text-[10px] text-emerald-800 block mt-1">
                * Includes dedicated tourist driver, fuel, and daily driver allowance.
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#12351e] hover:bg-emerald-900 text-[#fbfdfb] font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Proceed to Booking Enquiry
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
