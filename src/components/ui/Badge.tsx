import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const priorityStyles = {
  core: "bg-accent-glow text-accent-bright ring-1 ring-accent/30",
  high: "bg-alert-glow text-alert-bright ring-1 ring-alert/30",
  medium: "bg-info-glow text-info-bright ring-1 ring-info/30",
} as const;

const variantStyles = {
  default: "bg-surface-overlay text-slate-400 ring-1 ring-border-subtle",
  outline: "bg-transparent text-slate-400 ring-1 ring-border-strong",
} as const;

export type BadgePriority = keyof typeof priorityStyles;
export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  priority?: BadgePriority;
  variant?: BadgeVariant;
}

export function Badge({
  className,
  priority,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        priority ? priorityStyles[priority] : variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
