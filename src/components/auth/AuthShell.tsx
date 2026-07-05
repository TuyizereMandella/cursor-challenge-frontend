import { Link } from "react-router-dom";
import { Heart, Syringe, Bell, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import type { UserRole } from "@/types/auth";

interface AuthShellProps {
  role: UserRole;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ role, title, subtitle, children, footer }: AuthShellProps) {
  const isParent = role === "parent";

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EBF0F5] px-4 py-8 lg:px-8 selection:bg-teal/20">
      
      {/* Split Layout Card */}
      <div className="flex w-full max-w-[1000px] min-h-[620px] flex-col md:flex-row bg-white rounded-[32px] shadow-[0_24px_70px_rgba(27,54,93,0.12)] border border-slate-100/80 overflow-hidden">
        
        {/* Left Side: Illustrative Navy/Blue Panel */}
        <div className="hidden md:flex flex-1 bg-gradient-to-br from-[#1B365D] via-[#008B9B] to-[#14B8A6] p-10 flex-col justify-between relative overflow-hidden text-white select-none">
          {/* Background circles */}
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
          
          {/* Header Brand */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md ring-1 ring-white/20 shadow-inner">
              {isParent ? (
                <Heart className="h-4.5 w-4.5 text-white animate-pulse" />
              ) : (
                <Syringe className="h-4.5 w-4.5 text-white" />
              )}
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              VaxReminder
            </span>
          </div>

          {/* Centered Floating Mockup Cards */}
          <div className="relative h-[250px] w-full flex items-center justify-center z-10">
            
            {/* Card 1: Rotavirus Schedule Item */}
            <div className="absolute left-6 top-0 w-[230px] rounded-2xl bg-[#FBBF24] p-4 text-[#1B365D] shadow-xl rotate-[-8deg] transform hover:rotate-0 hover:scale-[1.03] transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-extrabold uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full text-navy">
                  VaxTimeline
                </span>
                <span className="text-[10px] font-bold">★ 5.0</span>
              </div>
              <h4 className="text-sm font-black tracking-tight leading-tight mb-1">Rotavirus Dose 2</h4>
              <p className="text-[10px] text-navy/70 mb-2">Milestone • 3 Months</p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold">
                <CheckCircle2 className="h-3.5 w-3.5 text-navy" />
                <span>Marked Complete</span>
              </div>
            </div>

            {/* Card 2: Notification Alert Badge */}
            <div className="absolute right-6 bottom-4 w-[190px] rounded-2xl bg-white p-3.5 text-slate-800 shadow-2xl rotate-[6deg] transform hover:rotate-0 hover:scale-[1.03] transition-all duration-300 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-glow text-teal">
                  <Bell className="h-4 w-4 animate-bounce" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-navy">Reminder Alert</p>
                  <p className="text-[10px] text-health-text-muted">BCG due tomorrow</p>
                </div>
              </div>
            </div>

            {/* Card 3: Tiny Clinic Badge */}
            <div className="absolute left-[30%] bottom-[-5px] bg-[#1E3A8A]/90 border border-white/10 backdrop-blur-md rounded-full px-3 py-1.5 shadow-xl flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-teal-bright" />
              <span className="text-[9.5px] font-extrabold tracking-wide uppercase text-white/90">
                Kigali Health Center
              </span>
            </div>

          </div>

          {/* Footer Context */}
          <div className="space-y-4 z-10">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-wide">
                New Scheduling And Routing Options
              </h3>
              <p className="text-xs text-white/70 leading-relaxed max-w-[280px]">
                We also updated the automated logic of reminder cascades and clinic matches.
              </p>
            </div>
            {/* Pagination dots */}
            <div className="flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full bg-white transition-all" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
            </div>
          </div>

        </div>

        {/* Right Side: Simple Clean Form */}
        <div className="flex-1 bg-white p-8 md:p-12 lg:p-14 flex flex-col justify-between overflow-y-auto max-h-[85vh] md:max-h-[640px]">
          
          <div className="space-y-6">
            {/* Back to Home Link */}
            <div className="flex justify-start">
              <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-teal transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Home
              </Link>
            </div>

            {/* Circle Logo Badge */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F5F9] border border-slate-100 shadow-sm text-[#1B365D] mb-4">
                {isParent ? (
                  <Heart className="h-7 w-7 text-teal" />
                ) : (
                  <Syringe className="h-7 w-7 text-teal" />
                )}
              </div>
              
              <h2 className="text-2xl font-black text-navy tracking-tight">
                {title}
              </h2>
              <p className="text-xs text-slate-400 max-w-[280px] mt-1.5 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Injected Form with Custom Style Override Wrapper */}
            <div className="w-full max-w-[340px] mx-auto auth-form-container">
              {children}
            </div>
          </div>

          {/* Form Footer */}
          <div className="text-center text-xs text-slate-400 mt-6 pt-4 border-t border-slate-50">
            {footer}
          </div>

        </div>

      </div>

    </div>
  );
}

