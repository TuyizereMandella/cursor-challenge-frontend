import type { ChildProfile, ChildSex, ParentUser, AdminUser } from "@/types/user";
import {
  applyInitialMilestoneStates,
  createChildProfile,
} from "@/data/timelineEngine";
import { applyDemoNotificationDueDates } from "@/data/notificationEngine";

export const mockParentUser: ParentUser = {
  id: "parent-001",
  name: "Sarah Chen",
  email: "sarah.chen@email.com",
  initials: "SC",
};

const emma = applyInitialMilestoneStates(
  createChildProfile({
    id: "child-001",
    name: "Emma Chen",
    dateOfBirth: "2023-04-12",
    sex: "female",
    preferredHospitalId: "hosp-001",
  }),
  4,
);

const liam = applyDemoNotificationDueDates(
  applyInitialMilestoneStates(
    createChildProfile({
      id: "child-002",
      name: "Liam Chen",
      dateOfBirth: "2025-01-08",
      sex: "male",
      preferredHospitalId: null,
    }),
    2,
  ),
);

/** Demo seed data — ParentProvider starts empty for new-account empty states. */
export const mockChildren: ChildProfile[] = [emma, liam];

export const mockAdminUser: AdminUser = {
  id: "admin-001",
  name: "Dr. Marcus Webb",
  email: "m.webb@vaxreminder.org",
  role: "Platform Administrator",
  organization: "VaxReminder Health Network",
  initials: "MW",
};

export const sexLabels: Record<ChildSex, string> = {
  male: "Male",
  female: "Female",
  other: "Other",
};
