import { NavLink } from "react-router-dom";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/config/navigation";

interface NavLinkItemProps extends NavItem {
  layout: "sidebar" | "bottom";
  badge?: number;
}

function navClassName(isActive: boolean, layout: "sidebar" | "bottom") {
  if (layout === "sidebar") {
    return cn("nav-link", isActive && "nav-link-active");
  }

  return cn(
    "flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium transition-all duration-150",
    isActive ? "text-teal" : "text-health-text-muted hover:text-navy",
  );
}

export function NavLinkItem({
  to,
  label,
  icon: Icon,
  end,
  layout,
  badge,
}: NavLinkItemProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(navClassName(isActive, layout), layout === "bottom" && "group")
      }
      aria-label={badge ? `${label}, ${badge} unread` : label}
    >
      <span className="relative">
        <Icon
          className={cn(
            layout === "sidebar" ? "h-4 w-4 shrink-0" : "h-5 w-5",
            layout === "bottom" &&
              "group-[[aria-current=page]]:drop-shadow-[0_0_6px_rgba(232,137,154,0.45)]",
          )}
          aria-hidden="true"
        />
        {badge !== undefined && badge > 0 && (
          <span
            className={cn(
              "absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-alert px-1 text-[9px] font-bold text-canvas",
              layout === "sidebar" && "-right-2.5 -top-2",
            )}
            aria-hidden="true"
          >
            {badge > 9 ? "9+" : badge}
          </span>
        )}
      </span>
      <span className={layout === "bottom" ? "leading-none" : undefined}>
        {label}
      </span>
    </NavLink>
  );
}

export type SidebarNavProps = {
  items: NavItem[];
  badgeForItem?: (item: NavItem) => number | undefined;
};

export function SidebarNav({ items, badgeForItem }: SidebarNavProps) {
  return (
    <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Main navigation">
      {items.map((item) => (
        <NavLinkItem
          key={item.to}
          {...item}
          layout="sidebar"
          badge={badgeForItem?.(item)}
        />
      ))}
    </nav>
  );
}

export function BottomNav({ items, badgeForItem }: SidebarNavProps) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-surface/95 backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom,0px)] pt-1">
        {items.map((item) => (
          <NavLinkItem
            key={item.to}
            {...item}
            layout="bottom"
            badge={badgeForItem?.(item)}
          />
        ))}
      </div>
    </nav>
  );
}
