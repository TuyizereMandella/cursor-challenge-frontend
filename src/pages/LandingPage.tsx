import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Heart, UserPlus } from "lucide-react";

export function LandingPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal-glow px-4 py-1.5 text-xs font-medium text-teal-muted">
          <Heart className="h-3.5 w-3.5 text-teal" aria-hidden="true" />
          Caring for every child&apos;s health journey
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Never miss a{" "}
          <span className="text-gradient-teal">critical dose</span>
        </h1>

        <p className="mx-auto max-w-xl text-lg leading-relaxed text-health-text-muted">
          A gentle, easy-to-use app for mothers — track immunizations, get SMS and
          email reminders, and find nearby clinics with confidence.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/auth/parent/login"
            className="group flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-health-card transition-all hover:bg-navy-bright focus-visible:ring-2 focus-visible:ring-teal-ring focus-visible:ring-offset-2 focus-visible:ring-offset-health-canvas"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Sign In
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          <Link
            to="/auth/parent/register"
            className="flex items-center gap-2 rounded-full border border-health-muted bg-health-raised px-6 py-3.5 text-sm font-semibold text-navy shadow-health-card transition-all hover:border-teal/30 hover:bg-teal-glow/30"
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Create Account
          </Link>
        </div>

        <p className="text-sm text-health-text-muted">
          New here?{" "}
          <Link to="/auth/parent/register" className="font-medium text-teal hover:underline">
            Register for free
          </Link>
        </p>
      </div>

      <div className="mx-auto mt-20 grid max-w-4xl gap-4 sm:grid-cols-3">
        {[
          {
            title: "Gentle Timelines",
            description: "Clear, age-based schedules made simple for busy parents.",
          },
          {
            title: "Caring Reminders",
            description: "SMS, email, and in-app alerts so you never worry alone.",
          },
          {
            title: "Nearby Clinics",
            description: "Find trusted hospitals and set your preferred center.",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-health-muted bg-health-raised p-5 text-left shadow-health-card"
          >
            <h2 className="text-sm font-semibold text-navy">{feature.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-health-text-muted">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
