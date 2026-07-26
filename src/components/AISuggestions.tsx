import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, Users, Heart, Shield, Car, Check, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { GeneratedItineraryType } from "../types";

interface AISuggestionsProps {
  onBookItinerary: (itinerary: GeneratedItineraryType) => void;
}

const INTEREST_OPTIONS = [
  { id: "hills", label: "Munnar Tea Hills", desc: "Scenic hill stations, tea safari, viewpoints" },
  { id: "backwaters", label: "Alleppey Backwaters", desc: "Overnight houseboat cruise, canal shikara" },
  { id: "beaches", label: "Varkala & Kovalam Beaches", desc: "Cliffs, sunsets, seaside cafes, surfing" },
  { id: "wildlife", label: "Thekkady Wildlife Reserve", desc: "Spice garden walk, Periyar jungle cruise" },
  { id: "culture", label: "Kathakali & Kerala Arts", desc: "Traditional martial arts, temple walks, historic sights" },
];

export default function AISuggestions({ onBookItinerary }: AISuggestionsProps) {
  const [duration, setDuration] = useState<number>(5);
  const [travelers, setTravelers] = useState<number>(2);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["hills", "backwaters"]);
  const [budget, setBudget] = useState<string>("Standard");
  const [cab, setCab] = useState<string>("Sedan (Etios/Dzire)");
  const [specialRequirements, setSpecialRequirements] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<GeneratedItineraryType | null>(null);
  const [activeDay, setActiveDay] = useState<number>(1);

  const loadingTexts = [
    "🌴 Consulting local Kerala driver routes...",
    "⛰️ Measuring Munnar tea garden roads...",
    "🚣 Calculating private houseboat cruise times in Alleppey backwaters...",
    "🍲 Coordinating heritage homestay room rates...",
    "✨ Bundling exclusive travel guide tips...",
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingTexts.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleToggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoadingStep(0);
    setError(null);
    setItinerary(null);

    const interestsText = selectedInterests
      .map((id) => INTEREST_OPTIONS.find((opt) => opt.id === id)?.label)
      .filter(Boolean);

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          durationDays: duration,
          travelersCount: travelers,
          interests: interestsText,
          budget: budget,
          cabPreference: cab,
          specialRequirements: specialRequirements,
        }),
      });

      const data = await response.json();
      if (data.success && data.itinerary) {
        setItinerary(data.itinerary);
        setActiveDay(1);
      } else {
        throw new Error(data.message || "Failed to generate itinerary");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "We could not reach our Kerala local travel counselors at this moment. Please fill the main quote form and we will send an itinerary manually within 15 minutes!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-20 bg-emerald-50/50 border-y border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#12351e]/10 border border-[#12351e]/20 rounded-full text-[#12351e] text-xs font-mono font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-[#a9c126] fill-current" />
            AI Travel Assistant
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#12351e]">
            Plan Your Kerala Dream Trip in 10 Seconds
          </h2>
          <p className="text-sm md:text-base text-[#617366] mt-3">
            Our local travel AI analyzes Munnar tea roads, backwater houseboat schedules, and boutique homestays to engineer your perfect Kerala tour package.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Side */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl shadow-1 border border-emerald-100">
            <h3 className="font-bold text-lg text-[#12351e] flex items-center gap-2 mb-4 pb-3 border-b border-emerald-50">
              <Sparkles className="w-5 h-5 text-[#a9c126]" /> Build Your Perfect Route
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Duration & Travelers */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                  >
                    {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>{num} Days</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Travelers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12, 15].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? "Person" : "People"}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Interests Checkbox list */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-2">
                  Destinations &amp; Interests
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {INTEREST_OPTIONS.map((opt) => {
                    const isSelected = selectedInterests.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleToggleInterest(opt.id)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? "bg-emerald-50/80 border-[#a9c126] shadow-sm"
                            : "bg-white border-emerald-100 hover:bg-emerald-50/20"
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? "bg-[#12351e] border-[#12351e] text-[#a9c126]" : "border-emerald-300 bg-white"
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#12351e]">{opt.label}</p>
                          <p className="text-[10px] text-[#617366]">{opt.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Cab Preference */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Stay Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                  >
                    <option value="Budget">Budget Homestays</option>
                    <option value="Standard">Standard/Deluxe</option>
                    <option value="Luxury">Luxury Resorts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Cab Class
                  </label>
                  <select
                    value={cab}
                    onChange={(e) => setCab(e.target.value)}
                    className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                  >
                    <option value="Sedan (Etios/Dzire)">Sedan (Couples)</option>
                    <option value="Toyota Innova SUV">SUV (Family)</option>
                    <option value="Tempo Traveller">Tempo (Group)</option>
                  </select>
                </div>
              </div>

              {/* Special requirements */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                  Special Notes
                </label>
                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  placeholder="E.g., Traveling with elderly parents, need ground floor rooms, wheelchair access, honeymoon additions..."
                  className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] h-20 resize-none"
                ></textarea>
              </div>

              {/* Action trigger */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#12351e] hover:bg-emerald-900 disabled:bg-emerald-850 text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 border border-transparent"
              >
                <Sparkles className="w-4 h-4 text-[#a9c126]" />
                {loading ? "Counseling Kerala Experts..." : "Plan My Dream Kerala Trip (AI)"}
              </button>
            </form>
          </div>

          {/* Result Side */}
          <div className="lg:col-span-7 h-full min-h-[460px] flex flex-col items-center justify-center">
            {/* Initial State / Default placeholder */}
            {!loading && !itinerary && !error && (
              <div className="w-full h-full bg-white border border-dashed border-emerald-200 rounded-2xl p-8 text-center flex flex-col justify-center items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#12351e]">
                  <Sparkles className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-lg text-[#12351e]">Your Live Plan Will Generate Here</h3>
                <p className="text-xs text-[#617366] max-w-sm leading-relaxed">
                  Adjust your tour specifications, choose destination preferences on the left, and click &apos;Plan My Dream Kerala Trip&apos; to launch your bespoke logistics blueprint.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-emerald-800 font-medium">
                  <span className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Live Driver Routes</span>
                  <span className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Stay Estimates</span>
                  <span className="bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Spice Walks Included</span>
                </div>
              </div>
            )}

            {/* Loading Screen */}
            {loading && (
              <div className="w-full h-full bg-white border border-emerald-100 rounded-2xl p-8 text-center flex flex-col justify-center items-center space-y-6">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#12351e]/10 border-t-[#a9c126] rounded-full animate-spin"></div>
                  <Sparkles className="w-6 h-6 text-[#a9c126] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#12351e] tracking-tight">Keralayaatra Planner AI</h4>
                  <p className="text-xs text-[#617366] mt-1 max-w-xs mx-auto">
                    Formulating transparent pricing matrix and mapping coordinates...
                  </p>
                </div>
                {/* Rolling steps display */}
                <div className="bg-emerald-50 border border-emerald-100/30 px-5 py-3.5 rounded-xl w-full max-w-md text-xs font-medium text-[#12351e]/90 font-mono transition-all duration-500 animate-pulse">
                  {loadingTexts[loadingStep]}
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="w-full h-full bg-white border border-red-100 rounded-2xl p-8 text-center flex flex-col justify-center items-center space-y-4">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">
                  !
                </div>
                <h3 className="font-bold text-base text-red-800">Itinerary Compilation Error</h3>
                <p className="text-xs text-red-600 max-w-md">
                  {error}
                </p>
              </div>
            )}

            {/* Successfully Generated Itinerary */}
            {itinerary && !loading && !error && (
              <div className="w-full bg-white border border-emerald-100 rounded-2xl shadow-1 p-6 space-y-6 text-[#12351e]">
                {/* Header overview */}
                <div className="border-b border-emerald-50 pb-4">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#a9c126] bg-[#12351e] px-2.5 py-0.5 rounded-full inline-block mb-2">
                    Custom Route Ready
                  </span>
                  <h3 className="text-xl font-extrabold text-[#12351e] tracking-tight">
                    {itinerary.title}
                  </h3>
                  <p className="text-xs text-[#617366] mt-2 leading-relaxed">
                    {itinerary.overview}
                  </p>
                </div>

                {/* Logistics Badges */}
                <div className="grid grid-cols-2 gap-4 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/30">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#617366] font-bold block">
                      Recommended Fleet Vehicle
                    </span>
                    <span className="text-sm font-bold text-[#12351e] flex items-center gap-1.5 mt-0.5">
                      <Car className="w-4 h-4 text-[#a9c126]" /> {itinerary.recommendedFleet}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#617366] font-bold block">
                      Total Estimated Package Cost
                    </span>
                    <span className="text-sm font-extrabold text-[#12351e] mt-0.5 block">
                      {itinerary.totalEstimatedCostRange}*
                    </span>
                  </div>
                </div>

                {/* Interactive Day Tabs */}
                <div>
                  <div className="flex gap-1 overflow-x-auto pb-1 mb-3 scrollbar-none">
                    {itinerary.days.map((day) => (
                      <button
                        key={day.dayNumber}
                        onClick={() => setActiveDay(day.dayNumber)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer focus:outline-none ${
                          activeDay === day.dayNumber
                            ? "bg-[#12351e] text-white"
                            : "bg-emerald-50 hover:bg-emerald-100/50 text-[#12351e]"
                        }`}
                      >
                        Day {day.dayNumber}
                      </button>
                    ))}
                  </div>

                  {/* Day Content Card */}
                  {itinerary.days.map((day) => {
                    if (day.dayNumber !== activeDay) return null;
                    return (
                      <div
                        key={day.dayNumber}
                        className="p-4 rounded-xl bg-emerald-50/20 border border-emerald-100/50 space-y-3 animate-fade-in"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-emerald-50">
                          <h4 className="font-bold text-sm text-[#12351e]">
                            Day {day.dayNumber}: {day.title}
                          </h4>
                          <span className="text-[10px] font-mono bg-[#a9c126]/20 text-[#12351e] px-2 py-0.5 rounded-md font-bold self-start">
                            ⏱️ {day.transitTime}
                          </span>
                        </div>

                        <p className="text-xs text-[#617366] leading-relaxed">
                          {day.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-medium">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs">🏨</span>
                            <span>Stay: <strong className="text-[#12351e]">{day.stayRecommendation}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span>🚕</span>
                            <span>Est. Cab Cost: <strong className="text-[#12351e]">₹{day.transitCostEst.toLocaleString()}</strong></span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Local Custom Tips */}
                <div>
                  <h4 className="font-bold text-xs text-[#12351e] uppercase tracking-wider mb-2">
                    💡 Essential Local Travel Tips
                  </h4>
                  <ul className="space-y-1.5">
                    {itinerary.curatedTips.map((tip, idx) => (
                      <li key={idx} className="text-xs text-[#617366] flex items-start gap-2">
                        <span className="text-[#a9c126] font-bold mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Book this route Trigger */}
                <div className="pt-2">
                  <button
                    onClick={() => onBookItinerary(itinerary)}
                    className="w-full bg-[#a9c126] hover:bg-[#b8d135] text-[#12351e] font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    Book This Custom AI Itinerary Package
                  </button>
                  <p className="text-[10px] text-center text-[#617366] mt-2">
                    * Estimated package includes direct local taxi with driver, tolls, accommodation breakfast, and houseboat full-board meals. No booking advance required!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
