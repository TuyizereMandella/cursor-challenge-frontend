import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Calendar,
  Shield,
  Bell,
  MapPin,
  Baby,
  Activity,
} from "lucide-react";

export function LandingPage() {
  const [activeChild, setActiveChild] = useState<"kenzi" | "marie">("kenzi");

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-12 lg:px-10 lg:py-24">
        {/* Decorative background glows */}
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-teal/10 blur-[128px] pointer-events-none" />
        <div className="absolute -right-40 top-40 h-[600px] w-[600px] rounded-full bg-navy/5 blur-[128px] pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            
            {/* Left Column: Messaging & CTAs */}
            <div className="space-y-8 lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-glow px-4 py-1.5 text-xs font-semibold text-teal-muted">
                <Heart className="h-3.5 w-3.5 text-teal animate-pulse" aria-hidden="true" />
                Caring for Kigali&apos;s next generation
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl leading-tight">
                Never miss a <br />
                <span className="text-gradient-teal">critical vaccine dose</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-health-text-muted">
                A gentle, professional scheduling companion for parents and hospitals. 
                Keep your child&apos;s immunization calendar updated, receive instant SMS/FCM notifications, and find nearby verified clinics.
              </p>

              {/* Trust/Feature Badges */}
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: Bell, label: "FCM & SMS Reminders" },
                  { icon: Shield, label: "Verified Clinic Network" },
                  { icon: Calendar, label: "Custom Milestone Schedules" },
                  { icon: MapPin, label: "Geo-Proximity Maps" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-navy">
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-glow text-teal">
                      <item.icon className="h-3.5 w-3.5" />
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/auth/parent/login"
                  className="group flex items-center justify-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-health-card transition-all hover:bg-navy-bright hover:shadow-health-card-hover focus-visible:ring-2 focus-visible:ring-teal-ring focus-visible:ring-offset-2"
                >
                  Parent Portal
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  to="/auth/parent/register"
                  className="flex items-center justify-center gap-2 rounded-full border border-health-muted bg-health-raised px-7 py-4 text-sm font-semibold text-navy shadow-health-card transition-all hover:border-teal/30 hover:bg-teal-glow/30"
                >
                  Create Account
                </Link>
              </div>

              {/* Quick stats banner */}
              <div className="pt-6 border-t border-health-muted flex flex-wrap gap-8 items-center">
                <div>
                  <p className="text-2xl font-bold text-navy">100%</p>
                  <p className="text-xs text-health-text-muted">EPI Compliance Goal</p>
                </div>
                <div className="h-8 w-px bg-health-muted" />
                <div>
                  <p className="text-2xl font-bold text-navy">3,000+</p>
                  <p className="text-xs text-health-text-muted">SMS Alerts Sent</p>
                </div>
                <div className="h-8 w-px bg-health-muted" />
                <div>
                  <p className="text-2xl font-bold text-navy">12+</p>
                  <p className="text-xs text-health-text-muted">Partner Clinics</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Dashboard Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-gradient-radial from-teal/10 via-transparent to-transparent blur-3xl pointer-events-none" />
              
              {/* Profile Selector tabs */}
              <div className="relative z-10 mx-auto max-w-[420px] rounded-3xl border border-health-muted bg-white p-6 shadow-health-card transition-all hover:shadow-health-card-hover">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-teal" />
                    <span className="text-xs font-bold text-navy uppercase tracking-wider">Dashboard Preview</span>
                  </div>
                  <div className="flex rounded-full bg-health-canvas p-1">
                    <button
                      onClick={() => setActiveChild("kenzi")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        activeChild === "kenzi" ? "bg-white text-navy shadow-sm" : "text-health-text-muted hover:text-navy"
                      }`}
                    >
                      Kenzi (3m)
                    </button>
                    <button
                      onClick={() => setActiveChild("marie")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                        activeChild === "marie" ? "bg-white text-navy shadow-sm" : "text-health-text-muted hover:text-navy"
                      }`}
                    >
                      Marie (9m)
                    </button>
                  </div>
                </div>

                {/* Child info box */}
                <div className="rounded-2xl bg-health-surface border border-health-muted p-4 mb-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-base font-bold text-navy">
                      {activeChild === "kenzi" ? "Kenzi Nshuti" : "Marie Keza"}
                    </p>
                    <p className="text-xs text-health-text-muted flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-teal" />
                      {activeChild === "kenzi" ? "King Faisal Hospital" : "Kigali Health Center"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      activeChild === "kenzi" ? "bg-sage-glow text-sage-muted ring-1 ring-sage/20" : "bg-caution-glow text-caution ring-1 ring-caution/20"
                    }`}>
                      {activeChild === "kenzi" ? "Up to date" : "1 Overdue"}
                    </span>
                  </div>
                </div>

                {/* Simulated Timeline */}
                <div className="space-y-3">
                  {activeChild === "kenzi" ? (
                    <>
                      <div className="flex gap-3 items-start border-l-2 border-sage pl-4 relative">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-sage" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-navy">BCG Vaccine</h4>
                            <span className="text-[10px] font-semibold text-sage-muted bg-sage-glow px-2 py-0.5 rounded-full">Completed</span>
                          </div>
                          <p className="text-xs text-health-text-muted mt-0.5">Tuberculosis Protection • 0 Months</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 items-start border-l-2 border-teal pl-4 relative">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-teal animate-pulse" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-navy">Rotavirus-2</h4>
                            <span className="text-[10px] font-bold text-teal bg-teal-glow px-2 py-0.5 rounded-full">Due Today</span>
                          </div>
                          <p className="text-xs text-health-text-muted mt-0.5">Rotavirus gastroenteritis • 3 Months</p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start pl-4 relative">
                        <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-slate-400">Measles-Rubella-1</h4>
                            <span className="text-[10px] font-semibold text-slate-400 bg-health-canvas px-2 py-0.5 rounded-full">Pending</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Milestone Milestone • 9 Months</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-3 items-start border-l-2 border-sage pl-4 relative">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-sage" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-navy">BCG Vaccine</h4>
                            <span className="text-[10px] font-semibold text-sage-muted bg-sage-glow px-2 py-0.5 rounded-full">Completed</span>
                          </div>
                          <p className="text-xs text-health-text-muted mt-0.5">Tuberculosis Protection • 0 Months</p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start border-l-2 border-caution pl-4 relative">
                        <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-caution" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-bold text-navy">Measles-Rubella-1</h4>
                            <span className="text-[10px] font-bold text-caution bg-caution-glow px-2 py-0.5 rounded-full">Overdue</span>
                          </div>
                          <p className="text-xs text-health-text-muted mt-0.5">First MR Dose • 9 Months</p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start pl-4 relative">
                        <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h4 className="text-sm font-semibold text-slate-400">PCV-Booster</h4>
                            <span className="text-[10px] font-semibold text-slate-400 bg-health-canvas px-2 py-0.5 rounded-full">Pending</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5">Pneumococcal Conjugate • 12 Months</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Small notification overlay card */}
                <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl bg-white border border-health-muted p-3.5 shadow-health-card-hover max-w-[240px]">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-caution-glow text-caution">
                    <Bell className="h-4 w-4 animate-bounce" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy">Reminder Sent</p>
                    <p className="text-[10px] text-health-text-muted">SMS: Rotavirus-2 due for Kenzi tomorrow.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="bg-health-surface py-16 px-6 border-t border-health-muted">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-navy">
              Integrated Healthcare Ecosystem
            </h2>
            <p className="text-lg text-health-text-muted">
              Bridging the gap between families and medical facilities to improve child vaccination rates.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Personalized Timelines",
                description:
                  "Vaccination schedules generated dynamically from your preferred hospital's inventory, calculated accurately to match your child's age milestones.",
                icon: Baby,
                tag: "Parent Focus",
              },
              {
                title: "Reliable Cascade Alerts",
                description:
                  "If a web push notification fails to deliver, the system automatically falls back to Resend emails and SMS alerts through Africa's Talking API.",
                icon: Bell,
                tag: "Reminders",
              },
              {
                title: "Hospital Control Center",
                description:
                  "Clinics and hospitals manage their vaccine catalogs, register parents, view comprehensive performance rates, and easily record vaccine completions.",
                icon: Activity,
                tag: "Provider Panel",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-health-muted bg-white p-6 shadow-health-card transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-health-card-hover"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-teal-glow text-teal transition-transform group-hover:scale-105">
                  <feature.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-bold text-teal bg-teal-glow px-2 py-0.5 rounded-full uppercase tracking-wider inline-block mb-3">
                  {feature.tag}
                </span>
                <h3 className="text-lg font-bold text-navy mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-health-text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

