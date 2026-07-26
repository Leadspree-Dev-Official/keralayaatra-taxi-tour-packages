import React from "react";
import { packages } from "../data";
import { TourPackageType } from "../types";
import { Clock, Tag, Check, Award, ArrowRight, Car } from "lucide-react";

interface TourPackagesProps {
  onSelectPackage: (pkg: TourPackageType) => void;
}

export default function TourPackages({ onSelectPackage }: TourPackagesProps) {
  return (
    <section id="packages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#a9c126] bg-[#12351e] px-2.5 py-0.5 rounded-full inline-block mb-3">
            Handcrafted Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12351e]">
            Direct Local Kerala Tour Packages
          </h2>
          <p className="text-sm md:text-base text-[#617366] mt-3">
            Curated plans featuring dedicated premium tourist cabs, breakfasts, and private houseboat rentals. Transparent, high-value, direct-partner pricing.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#fbfdfb] rounded-2xl border border-emerald-100 overflow-hidden shadow-1 hover:shadow-4 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image banner */}
              <div className="relative h-48 bg-emerald-100 overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Floating badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1 shadow-sm text-[10px] font-bold text-[#12351e]">
                  <Clock className="w-3.5 h-3.5 text-[#a9c126]" /> {pkg.duration}
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6 flex-1 flex flex-col space-y-4">
                <div>
                  <h3 className="font-bold text-base text-[#12351e] tracking-tight group-hover:text-emerald-800 transition-colors">
                    {pkg.name}
                  </h3>
                  {/* Route map description */}
                  <p className="text-[10px] font-mono text-[#617366] mt-1 uppercase tracking-wider">
                    📍 {pkg.destinations.join(" → ")}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] font-bold text-[#12351e]/50 uppercase tracking-widest block">
                    Tour Highlights
                  </span>
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-[#617366]">
                      <Check className="w-4 h-4 text-[#a9c126] shrink-0 mt-0.5 stroke-[3]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing / Cab Details */}
                <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100/30 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#617366] block">
                      Recommended Cab
                    </span>
                    <span className="font-bold text-[#12351e] flex items-center gap-1 mt-0.5">
                      <Car className="w-3.5 h-3.5 text-[#a9c126]" /> Sedan/SUV
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-[#617366] block">
                      Starting Price
                    </span>
                    <span className="font-extrabold text-base text-[#12351e] block mt-0.5">
                      ₹{pkg.priceStarting.toLocaleString()}
                      <span className="text-[9px] text-[#617366] font-normal block">Per Person</span>
                    </span>
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className="w-full bg-[#12351e] group-hover:bg-[#a9c126] group-hover:text-[#12351e] text-[#fbfdfb] font-bold text-xs py-3 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-1 cursor-pointer"
                >
                  Request Customized Itinerary <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
