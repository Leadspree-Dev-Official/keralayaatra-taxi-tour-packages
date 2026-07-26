import React from "react";
import { homestays } from "../data";
import { HomestayResortType } from "../types";
import { Star, ShieldCheck, Home, Check } from "lucide-react";

interface HomestaysResortsProps {
  onSelectHomestay: (homestay: HomestayResortType) => void;
}

export default function HomestaysResorts({ onSelectHomestay }: HomestaysResortsProps) {
  return (
    <section id="homestays" className="py-20 bg-emerald-50/20 border-t border-emerald-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#a9c126] bg-[#12351e] px-2.5 py-0.5 rounded-full inline-block mb-3">
            Handpicked Stays
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12351e]">
            Authentic Kerala Homestays &amp; Premium Resorts
          </h2>
          <p className="text-sm md:text-base text-[#617366] mt-3">
            Experience God&apos;s Own Country like a guest of honor. Choose from traditional wooden heritage mansions, scenic Munnar resort cottages, or oceanside wellness retreats.
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {homestays.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-1 hover:shadow-3 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Photo section */}
              <div className="relative h-48 bg-emerald-50 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {/* Floating Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full border border-emerald-150 flex items-center gap-1 shadow-sm text-[10px] font-extrabold text-[#12351e]">
                  <Star className="w-3.5 h-3.5 text-[#a9c126] fill-[#a9c126]" /> {item.rating}
                </div>
                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 bg-[#12351e] text-[#a9c126] text-[9px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-bold">
                  {item.type}
                </div>
              </div>

              {/* Information body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-bold text-base text-[#12351e] tracking-tight">{item.name}</h3>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#617366] block">
                    📍 {item.location}
                  </span>
                  <p className="text-xs text-[#617366] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Amenities Features Checkboxes */}
                <div className="space-y-1.5 py-2.5 border-y border-emerald-50 text-[11px] text-[#617366]">
                  {item.features.slice(0, 3).map((feat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#a9c126] stroke-[3]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Booking CTA */}
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#617366] block font-mono">
                      Nightly Rate
                    </span>
                    <span className="font-extrabold text-[#12351e] text-base">
                      ₹{item.pricePerNight.toLocaleString()}
                      <span className="text-[9px] text-[#617366] font-normal">/room</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectHomestay(item)}
                    className="bg-[#12351e] hover:bg-emerald-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
