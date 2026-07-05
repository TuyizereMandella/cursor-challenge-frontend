import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="layout-shell min-h-screen">
      <Outlet />
    </div>
  );
}
