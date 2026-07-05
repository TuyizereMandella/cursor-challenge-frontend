import { Link } from "react-router-dom";
import { ArrowRight, Building2, CalendarDays, Shield } from "lucide-react";

export function LandingPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised px-4 py-1.5 text-xs font-medium text-slate-400">
          <Shield className="h-3.5 w-3.5 text-accent-bright" aria-hidden="true" />
          Vaccination Reminder Platform
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
          Never miss a{" "}
          <span className="text-gradient-accent">critical dose</span>
        </h1>

        <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-400">
          Track your children&apos;s immunization schedules, receive timely
          reminders, and find nearby hospitals — all in one premium dashboard
          experience.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/parent"
            className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-canvas shadow-glow transition-all hover:bg-accent-bright focus-visible:ring-accent-ring"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Enter Parent Portal
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-raised px-6 py-3 text-sm font-semibold text-slate-200 transition-all hover:border-border-strong hover:bg-surface-overlay"
          >
            <Building2 className="h-4 w-4" aria-hidden="true" />
            Admin Workspace
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          {
            title: "Smart Timelines",
            description: "Auto-generated schedules tailored to each child's age.",
          },
          {
            title: "Push Reminders",
            description: "Web notifications keep you ahead of every due date.",
          },
          {
            title: "Hospital Finder",
            description: "Locate nearby clinics with map and list views.",
          },
        ].map((feature) => (
          <div key={feature.title} className="card p-5 text-left">
            <h2 className="text-sm font-semibold text-slate-200">
              {feature.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
