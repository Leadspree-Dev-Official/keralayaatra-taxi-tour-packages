import React from "react";
import { Compass, Mail, Phone, MapPin, Award, CheckCircle } from "lucide-react";

interface FooterProps {
  onScrollToSection: (id: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  return (
    <footer className="bg-[#12351e] text-white pt-16 pb-8 border-t border-[#0b421d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#0b421d]">
        {/* Brand & Credentials */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#a9c126] rounded-xl flex items-center justify-center text-[#12351e] shadow-md">
              <Compass className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h4 data-brand-text="business-name" data-brand-default="Keralayaatra" className="text-lg font-bold tracking-tight">Keralayaatra</h4>
              <p className="text-[10px] text-emerald-200 uppercase tracking-widest font-mono">
                Kerala Taxi &amp; Tours
              </p>
            </div>
          </div>
          <p className="text-xs text-emerald-100/70 leading-relaxed">
            Your trusted local partner for comfortable, safe, and transparent exploring across Kochi, Munnar hills, Alleppey backwaters, and beaches of Varkala. No middlemen, directly support local tourist drivers.
          </p>

          <div className="flex items-center gap-2 text-xs text-[#a9c126] font-semibold">
            <Award className="w-4.5 h-4.5" /> Government-Approved Driver Network
          </div>
        </div>

        {/* Quick links */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-200">
            Quick Links
          </h5>
          <ul className="space-y-2 text-xs text-emerald-100/80">
            <li>
              <button
                onClick={() => onScrollToSection("hero")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("ai-planner")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                AI Trip Assistant
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("cabs")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                Taxi rates &amp; Fleet
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("destinations")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                Kerala Destinations
              </button>
            </li>
          </ul>
        </div>

        {/* Packages / Stays links */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-200">
            Kerala Experiences
          </h5>
          <ul className="space-y-2 text-xs text-emerald-100/80">
            <li>
              <button
                onClick={() => onScrollToSection("packages")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                Curated Hillstation Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => onScrollToSection("homestays")}
                className="hover:text-[#a9c126] transition-colors cursor-pointer focus:outline-none"
              >
                Traditional Wooden Homestays
              </button>
            </li>
            <li className="flex items-center gap-1.5 text-emerald-200/90 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-[#a9c126]" /> Houseboat Overnights
            </li>
            <li className="flex items-center gap-1.5 text-emerald-200/90 font-semibold">
              <CheckCircle className="w-3.5 h-3.5 text-[#a9c126]" /> Munnar Treehouse Rentals
            </li>
          </ul>
        </div>

        {/* Contact info & address */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-200">
            Head Operations Desk
          </h5>
          <ul className="space-y-3 text-xs text-emerald-100/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#a9c126] shrink-0 mt-0.5" />
              <span data-brand-text="address" data-brand-default="Keralayaatra Cabs &amp; Holidays, Vypeen Cross Road, Ernakulam, Kochi, Kerala, 682001, India">
                Keralayaatra Cabs &amp; Holidays<br />
                Vypeen Cross Road, Ernakulam,<br />
                Kochi, Kerala, 682001, India
              </span>
            </li>
            <li className="flex items-center gap-2 font-bold text-white">
              <Phone className="w-4 h-4 text-[#a9c126] shrink-0" />
              <span data-brand-text="phone" data-brand-default="+91 94460 12345">+91 94460 12345</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#a9c126] shrink-0" />
              <span>bookings@keralayaatra.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust certifications & Copyright footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-emerald-100/50 font-mono gap-4">
        <div>
          <p>© 2026 Keralayaatra. All Rights Reserved. Govt Tourism Permit No: G/438910-KL.</p>
          <p className="mt-1.5 text-emerald-200/40">
            Developer: <span className="text-emerald-200/70 font-semibold">Aniruddha Das</span> &bull; Developed by <a href="https://leadspree.in" target="_blank" rel="noopener noreferrer" className="text-[#a9c126] hover:underline font-semibold">LeadSpree Business Solutions</a>
          </p>
        </div>
        <div className="flex gap-4">
          <span>🛡️ Verified Local Cabs</span>
          <span>🤝 Direct Driver Payments</span>
          <span>🌱 Green Tourism Partner</span>
        </div>
      </div>
    </footer>
  );
}
