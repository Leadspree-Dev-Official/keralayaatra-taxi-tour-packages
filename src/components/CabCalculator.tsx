import React, { useState } from "react";
import { cabs } from "../data";
import { CabType } from "../types";
import { Check, ShieldCheck, HelpCircle, Users, Briefcase, Car } from "lucide-react";

interface CabCalculatorProps {
  onBookCab: (cab: CabType, estimatedCost: number, details: string) => void;
}

export default function CabCalculator({ onBookCab }: CabCalculatorProps) {
  const [selectedCabId, setSelectedCabId] = useState<string>("innova");
  const [numDays, setNumDays] = useState<number>(5);
  const [estDistance, setEstDistance] = useState<number>(750); // 150km per day default

  const selectedCab = cabs.find((c) => c.id === selectedCabId) || cabs[1];

  // Calculations
  const baseDaysCost = numDays * selectedCab.baseFare;
  const freeKm = numDays * selectedCab.freeKmPerDay;
  const extraKm = Math.max(0, estDistance - freeKm);
  const extraKmCost = extraKm * selectedCab.ratePerKm;
  const driverAllowanceTotal = numDays * selectedCab.driverAllowancePerDay;
  const totalEstCost = baseDaysCost + extraKmCost + driverAllowanceTotal;

  const handleBookTrigger = () => {
    const detailsText = `Cab Class: ${selectedCab.name}, Duration: ${numDays} Days, Estimated Distance: ${estDistance} km, Cost Breakdown (Base Days: ₹${baseDaysCost}, Extra Km: ₹${extraKmCost}, Driver Allowance: ₹${driverAllowanceTotal})`;
    onBookCab(selectedCab, totalEstCost, detailsText);
  };

  return (
    <section id="cabs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#a9c126] bg-[#12351e] px-2.5 py-0.5 rounded-full inline-block mb-3">
            Local Taxi Fleet
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12351e]">
            Transparent Interactive Taxi Pricing
          </h2>
          <p className="text-sm md:text-base text-[#617366] mt-3">
            Select your premium vehicle and configure your tour length to simulate your exact driver bills. Absolute transparency—no hidden commissions.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Vehicle Fleet Cards */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-bold text-lg text-[#12351e] mb-2 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#a9c126]" /> Choose Your Vehicle Class
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {cabs.map((cab) => {
                const isSelected = cab.id === selectedCabId;
                return (
                  <div
                    key={cab.id}
                    onClick={() => {
                      setSelectedCabId(cab.id);
                      setEstDistance(numDays * cab.freeKmPerDay);
                    }}
                    className={`flex flex-col md:flex-row gap-6 p-5 rounded-2xl border cursor-pointer text-left transition-all ${
                      isSelected
                        ? "border-[#12351e] bg-emerald-50/20 shadow-sm ring-1 ring-[#12351e]"
                        : "border-emerald-100 bg-[#fbfdfb] hover:bg-emerald-50/10"
                    }`}
                  >
                    {/* Vehicle image */}
                    <div className="w-full md:w-44 h-28 rounded-xl overflow-hidden bg-emerald-50 relative shrink-0">
                      <img
                        src={cab.imageUrl}
                        alt={cab.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-[#12351e] text-white text-[10px] font-mono px-2 py-0.5 rounded-md font-bold">
                        ₹{cab.ratePerKm}/km
                      </span>
                    </div>

                    {/* Features and detail column */}
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-base text-[#12351e]">{cab.name}</h4>
                        <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {cab.category}
                        </span>
                      </div>

                      {/* Seats / Bags / Specs badges */}
                      <div className="flex flex-wrap gap-2 text-xs text-[#617366]">
                        <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                          <Users className="w-3.5 h-3.5" /> Max {cab.seats} Seats
                        </span>
                        <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                          <Briefcase className="w-3.5 h-3.5" /> Max {cab.luggage} Bags
                        </span>
                        <span className="flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                          🛡️ Tourist Permit
                        </span>
                      </div>

                      {/* Quick specifications checklists */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1.5 border-t border-emerald-50">
                        {cab.features.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#617366]">
                            <Check className="w-3.5 h-3.5 text-[#a9c126] stroke-[3.5]" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side: Interactive Price Configurator & Invoice */}
          <div className="lg:col-span-5 bg-[#fbfdfb] rounded-2xl p-6 shadow-1 border border-emerald-100 space-y-5">
            <h3 className="font-bold text-lg text-[#12351e] pb-3 border-b border-emerald-50 flex items-center gap-2">
              <span>🧾</span> Cost Estimator
            </h3>

            {/* Inputs & Sliders */}
            <div className="space-y-4">
              {/* Slider for days */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#12351e] mb-1">
                  <span>TRIP DURATION</span>
                  <span className="text-[#a9c126] font-mono text-sm">{numDays} Days</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={numDays}
                  onChange={(e) => {
                    const days = Number(e.target.value);
                    setNumDays(days);
                    // Adjust distance logically to correspond to standard 150km a day rule
                    setEstDistance(days * selectedCab.freeKmPerDay);
                  }}
                  className="w-full accent-[#12351e] bg-emerald-100 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#617366] block mt-1">
                  * Minimum billing charges apply at {selectedCab.freeKmPerDay} km per day limit.
                </span>
              </div>

              {/* Slider for estimated kms */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#12351e] mb-1">
                  <span>ESTIMATED TOTAL DISTANCE</span>
                  <span className="text-[#a9c126] font-mono text-sm">{estDistance} km</span>
                </div>
                <input
                  type="range"
                  min={numDays * selectedCab.freeKmPerDay}
                  max={numDays * selectedCab.freeKmPerDay + 2000}
                  step="50"
                  value={estDistance}
                  onChange={(e) => setEstDistance(Number(e.target.value))}
                  className="w-full accent-[#12351e] bg-emerald-100 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-[#617366] block mt-1">
                  Includes {freeKm} free km ({numDays} days × {selectedCab.freeKmPerDay} km/day). Extra km charged at ₹{selectedCab.ratePerKm}/km.
                </span>
              </div>
            </div>

            {/* Transparent Invoice Receipt */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100/50 text-xs text-[#12351e] font-mono space-y-2">
              <p className="text-center font-bold tracking-widest text-[#617366] uppercase text-[10px] border-b border-emerald-100/60 pb-2">
                Keralayaatra billing worksheet
              </p>

              <div className="flex justify-between">
                <span>Vehicle Class:</span>
                <span className="font-bold">{selectedCab.category} ({selectedCab.seats} Seater)</span>
              </div>

              <div className="flex justify-between">
                <span>Daily Minimum Allowance ({numDays} days):</span>
                <span>₹{(numDays * selectedCab.baseFare).toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Distance Requested:</span>
                <span>{estDistance} km</span>
              </div>

              <div className="flex justify-between">
                <span>Extra Distance ({extraKm} km):</span>
                <span>₹{extraKmCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between">
                <span>Driver Allowance ({numDays} days):</span>
                <span>₹{driverAllowanceTotal.toLocaleString()}</span>
              </div>

              <div className="border-t border-dashed border-emerald-200/80 pt-2 flex justify-between text-sm font-extrabold text-[#12351e]">
                <span>Estimated Total Rate:</span>
                <span className="text-[#12351e]">₹{totalEstCost.toLocaleString()}</span>
              </div>

              <p className="text-[9px] text-[#617366] leading-snug pt-1 text-center italic">
                * Actual pricing covers interstate permits or out-of-pocket tolls. Driver stays with the cab throughout. Zero advance necessary.
              </p>
            </div>

            {/* Reserve Trigger */}
            <button
              onClick={handleBookTrigger}
              className="w-full bg-[#12351e] hover:bg-emerald-900 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-[#a9c126]" /> Reserve {selectedCab.name}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
