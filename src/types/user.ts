import type { ReminderChannels } from "@/types/auth";

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  phone: string;
  reminderChannels: ReminderChannels;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  initials: string;
}

export type ChildSex = "male" | "female" | "other";

export type MilestoneStatus = "completed" | "due_soon" | "upcoming";

export interface ImmunizationMilestone {
  id: string;
  label: string;
  description: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  sex: ChildSex;
  milestones: ImmunizationMilestone[];
  preferredHospitalId: string | null;
  vaccinationCardImageUrl: string | null;
}

export interface AddChildInput {
  name: string;
  dateOfBirth: string;
  sex: ChildSex;
}
