import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Settings2 } from "lucide-react";
import { SidebarNav } from "@/components/navigation";
import { Button } from "@/components/ui";
import { adminNavItems } from "@/config/navigation";
import { AdminProvider, useAuth, useAdminContext } from "@/contexts";

function AdminLayoutShell() {
  const { user } = useAdminContext();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <aside className="layout-sidebar" aria-label="Admin navigation">
        <div className="flex h-14 items-center gap-2.5 border-b border-border-subtle px-5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-info-glow ring-1 ring-info/30">
            <Settings2 className="h-3.5 w-3.5 text-info-bright" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-100">VaxReminder</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              Admin Workspace
            </p>
          </div>
        </div>

        <SidebarNav items={adminNavItems} />

        <div className="mt-auto border-t border-border-subtle p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-surface-muted p-3 ring-1 ring-border-subtle">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-info-glow text-xs font-semibold text-info-bright ring-1 ring-info/30"
              aria-hidden="true"
            >
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-slate-200">{user.name}</p>
              <p className="truncate text-xs text-slate-500">{user.role}</p>
            </div>
          </div>
          <NavLink to="/admin/dashboard" className="nav-link text-xs text-slate-500">
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            Back to Dashboard
          </NavLink>
        </div>
      </aside>

      <div className="layout-main">
        <header className="layout-header">
          <div>
            <p className="text-sm font-medium text-slate-200">{user.organization}</p>
            <p className="text-xs text-slate-500">Administration Console</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              logout();
              navigate("/auth/admin/login");
            }}
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
        </header>
        <div className="layout-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutShell />
    </AdminProvider>
  );
}
