import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  AdminLayout,
  LandingLayout,
  ParentLayout,
  RootLayout,
} from "@/layouts";
import { LandingPage } from "@/pages/LandingPage";
import {
  AdminDashboardPage,
  HospitalCatalogsPage,
  ScheduleRulesPage,
} from "@/pages/admin";
import {
  DashboardPage,
  HospitalMapsPage,
  RemindersPage,
  TimelinePage,
} from "@/pages/parent";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <LandingLayout />,
        children: [{ index: true, element: <LandingPage /> }],
      },
      {
        path: "parent",
        element: <ParentLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "timeline", element: <TimelinePage /> },
          { path: "hospitals", element: <HospitalMapsPage /> },
          { path: "reminders", element: <RemindersPage /> },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: "dashboard", element: <AdminDashboardPage /> },
          { path: "hospitals", element: <HospitalCatalogsPage /> },
          { path: "schedules", element: <ScheduleRulesPage /> },
        ],
      },
    ],
  },
]);
