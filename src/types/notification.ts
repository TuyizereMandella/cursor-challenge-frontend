export type LeadTimeDays = 1 | 3;

export interface AppNotification {
  id: string;
  childId: string;
  childName: string;
  milestoneId: string;
  doseLabel: string;
  dueDate: string;
  daysUntilDue: number;
  leadTimeDays: LeadTimeDays;
  message: string;
}

export const LEAD_TIME_OPTIONS: LeadTimeDays[] = [1, 3];

export const LEAD_TIME_LABELS: Record<LeadTimeDays, string> = {
  1: "1 day before",
  3: "3 days before",
};
