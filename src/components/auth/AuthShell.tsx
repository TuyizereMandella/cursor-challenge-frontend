import { Link } from "react-router-dom";
import { Heart, Syringe } from "lucide-react";
import type { ReactNode } from "react";
import type { UserRole } from "@/types/auth";
import { cn } from "@/lib/cn";

interface AuthShellProps {
  role: UserRole;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const roleAccent: Record<UserRole, string> = {
  parent: "bg-teal-glow ring-teal/30 text-teal",
  admin: "bg-info-glow ring-info/30 text-info-bright",
};

export function AuthShell({ role, title, subtitle, children, footer }: AuthShellProps) {
  const isParent = role === "parent";

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center px-4 py-12",
        isParent && "parent-theme bg-mesh-health",
      )}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl ring-1",
                roleAccent[role],
              )}
            >
              {isParent ? (
                <Heart className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Syringe className="h-5 w-5" aria-hidden="true" />
              )}
            </div>
            <span
              className={cn(
                "text-lg font-semibold tracking-tight",
                isParent ? "text-navy" : "text-slate-100",
              )}
            >
              VaxReminder
            </span>
          </Link>
          <h1
            className={cn(
              "mt-6 text-2xl font-semibold tracking-tight",
              isParent ? "text-navy" : "text-slate-100",
            )}
          >
            {title}
          </h1>
          <p className={cn("mt-2 text-sm", isParent ? "text-health-text-muted" : "text-slate-500")}>
            {subtitle}
          </p>
        </div>

        <div
          className={cn(
            "rounded-2xl border p-6 shadow-health-card",
            isParent
              ? "border-health-muted bg-health-raised"
              : "border-border-subtle bg-surface-raised shadow-card",
          )}
        >
          {children}
        </div>

        <div
          className={cn(
            "text-center text-sm",
            isParent ? "text-health-text-muted" : "text-slate-500",
          )}
        >
          {footer}
        </div>
      </div>
    </div>
  );
}
