import React, { useState, useEffect } from "react";
import { X, Calendar, Users, Phone, Mail, FileText, CheckCircle2, User } from "lucide-react";
import { BookingInquiryType } from "../types";

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  serviceName: string;
  notesText: string;
  onSubmitInquiry: (inquiry: BookingInquiryType) => void;
}

export default function InquiryModal({
  isOpen,
  onClose,
  serviceType,
  serviceName,
  notesText,
  onSubmitInquiry,
}: InquiryModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [notes, setNotes] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState<BookingInquiryType | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setNotes(notesText || "");
    }
  }, [isOpen, notesText]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !phone) {
      alert("Please fill in your Name and Mobile Number so our drivers can contact you!");
      return;
    }

    // Generate random reference ID
    const randomId = `KY-${Math.floor(10000 + Math.random() * 90000)}`;

    const newInquiry: BookingInquiryType = {
      id: randomId,
      customerName,
      email,
      phone,
      startDate: startDate || new Date().toISOString().split("T")[0],
      durationDays: duration,
      travelersCount: travelers,
      serviceRequested: (serviceType as any) || "Full Custom Trip",
      serviceName: serviceName || "General Inquiry",
      notes: notes,
      status: "Pending",
      dateSubmitted: new Date().toLocaleDateString(),
    };

    // Save locally
    const existing = localStorage.getItem("keralayaatra_inquiries");
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(newInquiry);
    localStorage.setItem("keralayaatra_inquiries", JSON.stringify(list));

    setReceipt(newInquiry);
    setSubmitted(true);
    onSubmitInquiry(newInquiry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#fbfdfb] rounded-2xl shadow-4 border border-emerald-150 overflow-hidden text-[#12351e] my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="p-5 border-b border-emerald-50 bg-[#12351e] text-white flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-extrabold text-base tracking-tight">
              {submitted ? "Booking Inquiry Lodged" : "Enquire / Reserve Tour"}
            </h3>
            {!submitted && (
              <p className="text-[10px] font-mono text-[#a9c126] uppercase tracking-wider mt-0.5">
                🌴 Direct Local Driver Rate Connection
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 transition-colors focus:outline-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body scroll */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/30 text-xs text-[#12351e] leading-relaxed">
                You are requesting: <strong className="text-[#12351e]">{serviceType}</strong> for <strong className="text-[#12351e]">{serviceName}</strong>.
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/50" />
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="E.g., Dr. Arnab Sen"
                    className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/50" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="E.g., +91 98765 43210"
                      className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/50" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. arnab@gmail.com"
                      className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Start Date & Duration */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                    Start Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/50" />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                      Days
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                      Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Specific message details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#617366] mb-1">
                  Tour Details / Route Notes
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3 w-4 h-4 text-[#12351e]/50" />
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe extra specifications, e.g. Airport pick up required at 08:00 AM, English driver preferred, Infant safety seat required..."
                    className="w-full bg-emerald-50/30 border border-emerald-150 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#12351e]/10 text-[#12351e] h-24 resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#12351e] hover:bg-emerald-900 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md cursor-pointer transition-all hover:scale-[1.01]"
              >
                Send Request to Driver Coordinator
              </button>

              <p className="text-[10px] text-center text-[#617366] leading-relaxed">
                * By sending this form, your request joins our priority queue. No booking advance required today! Driver details will be texted/whatsapped directly.
              </p>
            </form>
          ) : (
            /* Submission Success & Digital Receipt view */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#12351e] rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="font-extrabold text-lg text-[#12351e]">Booking Reference Generated!</h4>
                <p className="text-xs text-[#617366] mt-1">
                  Thank you, <strong className="text-[#12351e]">{receipt?.customerName}</strong>. Your inquiry has been routed directly to our Kochi Operations desk.
                </p>
              </div>

              {/* Reference invoice details */}
              <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 text-xs font-mono text-left space-y-2 max-w-sm mx-auto">
                <p className="text-center font-bold uppercase tracking-wider text-[#617366] border-b border-emerald-100 pb-1 text-[10px]">
                  Keralayaatra Booking Voucher
                </p>
                <div className="flex justify-between">
                  <span>Reference ID:</span>
                  <span className="font-bold text-[#12351e]">{receipt?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-bold text-[#12351e]">{receipt?.serviceRequested}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Name:</span>
                  <span className="font-bold text-[#12351e] text-right truncate max-w-[160px]">{receipt?.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact Mobile:</span>
                  <span className="font-bold text-[#12351e]">{receipt?.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span>{receipt?.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-[#a9c126] font-extrabold bg-[#12351e] px-2 py-0.5 rounded text-[9px]">
                    {receipt?.status} / PENDING MANUAL CONFIRMATION
                  </span>
                </div>
              </div>

              {/* Call immediately trust element */}
              <div className="p-4 rounded-xl bg-[#12351e] text-white text-xs space-y-2">
                <p className="font-bold text-[#a9c126] uppercase font-mono tracking-wider text-[10px]">
                  ⚡ Fast-Track driver reservation
                </p>
                <p className="leading-relaxed">
                  Call or WhatsApp our main Operations Manager immediately with your Reference ID to lock in seasonal taxi rates:
                </p>
                <p className="text-base font-extrabold text-[#a9c126]">
                  +91 94460 12345
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#a9c126] text-[#12351e] hover:bg-[#b8d135] font-bold text-xs py-3 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Close Window &amp; Explore Guide
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
