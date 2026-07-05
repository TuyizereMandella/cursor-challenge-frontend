import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import type { AdminUser } from "@/types/user";

interface PlatformMetrics {
  totalUsers: number;
  activeHospitals: number;
  vaccinesTracked: number;
  overdueAlerts: number;
}

interface AdminContextValue {
  user: AdminUser;
  metrics: PlatformMetrics;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const { user: authUser } = useAuth();

  const value = useMemo<AdminContextValue>(() => {
    const user: AdminUser = {
      id: authUser?.id ?? "admin-unknown",
      name: authUser?.name ?? "Administrator",
      email: authUser?.email ?? "",
      role: "Platform Administrator",
      organization: authUser?.organization ?? "VaxReminder Health Network",
      initials: authUser?.initials ?? "AD",
    };

    return {
      user,
      metrics: {
        totalUsers: 12847,
        activeHospitals: 342,
        vaccinesTracked: 58,
        overdueAlerts: 127,
      },
    };
  }, [authUser]);

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdminContext(): AdminContextValue {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AdminProvider");
  }
  return context;
}
