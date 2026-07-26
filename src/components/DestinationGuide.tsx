import React, { useState } from "react";
import { destinations } from "../data";
import { MapPin, Calendar, Clock, Compass, ChevronRight, Check } from "lucide-react";

interface DestinationGuideProps {
  onPlanDestination: (destName: string) => void;
}

export default function DestinationGuide({ onPlanDestination }: DestinationGuideProps) {
  const [activeDestId, setActiveDestId] = useState<string>("munnar");

  const activeDest = destinations.find((d) => d.id === activeDestId) || destinations[0];

  return (
    <section id="destinations" className="py-20 bg-emerald-50/30 border-y border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#a9c126] bg-[#12351e] px-2.5 py-0.5 rounded-full inline-block mb-3">
            Explore Kerala
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12351e]">
            Your Local Destination Guide
          </h2>
          <p className="text-sm md:text-base text-[#617366] mt-3">
            Click any destination below to discover transit times from Kochi, seasonal insights, and top sights curated by our tourist drivers.
          </p>
        </div>

        {/* Destination layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Side Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {destinations.map((dest) => {
              const isActive = dest.id === activeDestId;
              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveDestId(dest.id)}
                  className={`w-full text-left p-4 rounded-xl border flex justify-between items-center transition-all cursor-pointer focus:outline-none ${
                    isActive
                      ? "bg-[#12351e] text-white border-[#12351e] shadow-md"
                      : "bg-white text-[#12351e] border-emerald-100 hover:bg-emerald-50/20"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{dest.name}</h4>
                    <p className={`text-[10px] truncate max-w-[200px] ${isActive ? "text-emerald-200" : "text-[#617366]"}`}>
                      {dest.tagline}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "translate-x-1 text-[#a9c126]" : "text-[#12351e]/40"}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Destination Showcase */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-emerald-100 shadow-1 overflow-hidden">
            {/* Featured Image */}
            <div className="relative h-64 sm:h-80 bg-emerald-100">
              <img
                src={activeDest.imageUrl}
                alt={activeDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white space-y-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#a9c126]">
                  {activeDest.tagline}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {activeDest.name}
                </h3>
              </div>
            </div>

            {/* Quick Details panel */}
            <div className="p-6 space-y-6">
              <p className="text-xs sm:text-sm text-[#617366] leading-relaxed">
                {activeDest.description}
              </p>

              {/* Grid with metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-emerald-50 py-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#617366] text-[10px] block">
                    Best Time to Visit
                  </span>
                  <span className="font-semibold text-[#12351e] flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#a9c126]" /> {activeDest.bestSeason}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#617366] text-[10px] block">
                    Distance from Kochi
                  </span>
                  <span className="font-semibold text-[#12351e] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#a9c126]" /> {activeDest.distanceFromKochi}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#617366] text-[10px] block">
                    Taxi Travel Time
                  </span>
                  <span className="font-semibold text-[#12351e] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#a9c126]" /> {activeDest.transitTime}
                  </span>
                </div>
              </div>

              {/* Sights details checklist */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-widest text-[#12351e] mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-[#a9c126]" /> Top Attractions &amp; Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#617366]">
                  {activeDest.topAttractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 bg-emerald-50/30 rounded-xl border border-emerald-100/50">
                      <div className="w-5 h-5 bg-[#12351e] rounded-full flex items-center justify-center text-[#a9c126] font-mono text-[10px] font-bold">
                        {idx + 1}
                      </div>
                      <span className="font-medium text-[#12351e]">{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-emerald-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[11px] text-[#617366] text-center sm:text-left">
                  Need custom multi-day plans including <strong>{activeDest.name}</strong>?
                </p>
                <button
                  onClick={() => onPlanDestination(activeDest.name)}
                  className="bg-[#12351e] hover:bg-emerald-900 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.02]"
                >
                  Create Custom Tour to {activeDest.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
