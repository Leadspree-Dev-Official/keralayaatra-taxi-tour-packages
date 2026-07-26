import React, { useState, useEffect } from "react";
import { BookingInquiryType } from "../types";
import { Trash2, Phone, Calendar, Clock, AlertCircle } from "lucide-react";

interface InquiryListProps {
  refreshTrigger: number;
}

export default function InquiryList({ refreshTrigger }: InquiryListProps) {
  const [inquiries, setInquiries] = useState<BookingInquiryType[]>([]);

  useEffect(() => {
    const existing = localStorage.getItem("keralayaatra_inquiries");
    if (existing) {
      setInquiries(JSON.parse(existing));
    }
  }, [refreshTrigger]);

  const handleClearInquiry = (id: string) => {
    const updated = inquiries.filter((item) => item.id !== id);
    setInquiries(updated);
    localStorage.setItem("keralayaatra_inquiries", JSON.stringify(updated));
  };

  if (inquiries.length === 0) return null;

  return (
    <section className="py-12 bg-white border-t border-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-emerald-100">
            <div>
              <h3 className="font-bold text-base text-[#12351e] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Your Lodged Driver Requests ({inquiries.length})
              </h3>
              <p className="text-[11px] text-[#617366]">
                Stored securely in your local browser cache. Our local driver coordinator is matching your fleet!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {inquiries.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-emerald-100 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-xs text-[#12351e] font-mono"
              >
                {/* Details column */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#12351e]">{item.id}</span>
                    <span className="bg-yellow-100 text-yellow-800 text-[9px] px-2 py-0.5 rounded font-bold font-sans uppercase">
                      {item.status} / ASSIGNING DRIVER
                    </span>
                  </div>
                  <p className="font-sans text-[#12351e] font-medium text-xs mt-1">
                    Requested: <strong className="text-[#12351e]">{item.serviceRequested}</strong> - {item.serviceName}
                  </p>
                  <p className="font-sans text-[#617366] text-[11px] flex items-center gap-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Start: {item.startDate}</span>
                    <span>⏱️ Duration: {item.durationDays} Days</span>
                    <span>👥 Passengers: {item.travelersCount}</span>
                  </p>
                  {item.notes && (
                    <p className="font-sans text-[11px] text-emerald-800 italic bg-emerald-50/50 p-2 rounded-lg border border-emerald-100/30 max-w-xl">
                      &ldquo;{item.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Operations connection and Action */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end gap-2 sm:border-l sm:border-emerald-50 sm:pl-4 shrink-0">
                  <div className="text-left sm:text-right font-sans">
                    <span className="text-[10px] text-[#617366] block">OPERATIONS DIRECT LINK:</span>
                    <span className="text-xs font-bold text-[#12351e] flex items-center gap-1 text-[#12351e]">
                      <Phone className="w-3.5 h-3.5 text-[#a9c126]" /> +91 94460 12345
                    </span>
                  </div>

                  <button
                    onClick={() => handleClearInquiry(item.id)}
                    className="p-1.5 text-[#617366] hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none cursor-pointer mt-1"
                    title="Remove Inquiry log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 bg-yellow-50/40 p-3 rounded-lg border border-yellow-100/30 text-[10px] text-yellow-800 leading-relaxed font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-yellow-600" />
            <span>
              If you have multiple inquiries logged, please let our coordinator know during the call so they can merge bookings and apply multi-trip taxi discounts. No deposits are ever requested online.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
