import { NavLink, Outlet } from "react-router-dom";
import { Syringe } from "lucide-react";

export function RootLayout() {
  return (
    <div className="layout-shell">
      <Outlet />
    </div>
  );
}

export function LandingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex h-16 items-center justify-between border-b border-border-subtle px-6 lg:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-glow ring-1 ring-accent/30">
            <Syringe className="h-4 w-4 text-accent-bright" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            VaxReminder
          </span>
        </div>
        <nav aria-label="Landing navigation" className="flex items-center gap-4">
          <NavLink
            to="/parent"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-slate-200"
          >
            Parent Portal
          </NavLink>
          <NavLink
            to="/admin"
            className="rounded-lg bg-surface-raised px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-border-subtle transition-all hover:ring-border-strong"
          >
            Admin Workspace
          </NavLink>
        </nav>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
