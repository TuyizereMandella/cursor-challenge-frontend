import type { AppNotification, LeadTimeDays } from "@/types/notification";
import type { ChildProfile } from "@/types/user";

function getDaysUntilDue(dueDate: string, referenceDate: Date = new Date()): number {
  const due = new Date(`${dueDate}T00:00:00`);
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  const diffMs = due.getTime() - ref.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function generateLeadTimeNotifications(
  children: ChildProfile[],
  leadTimeDays: LeadTimeDays,
  referenceDate: Date = new Date(),
): AppNotification[] {
  const notifications: AppNotification[] = [];

  for (const child of children) {
    for (const milestone of child.milestones) {
      if (milestone.completed) {
        continue;
      }

      const daysUntilDue = getDaysUntilDue(milestone.dueDate, referenceDate);

      if (daysUntilDue <= 0) {
        continue;
      }

      if (daysUntilDue > leadTimeDays) {
        continue;
      }

      notifications.push({
        id: `notif-${child.id}-${milestone.id}-${leadTimeDays}d`,
        childId: child.id,
        childName: child.name,
        milestoneId: milestone.id,
        doseLabel: milestone.label,
        dueDate: milestone.dueDate,
        daysUntilDue,
        leadTimeDays,
        message:
          daysUntilDue === 1
            ? `${child.name} has ${milestone.label} due tomorrow`
            : `${child.name} has ${milestone.label} due in ${daysUntilDue} days`,
      });
    }
  }

  return notifications.sort((a, b) => a.daysUntilDue - b.daysUntilDue);
}

export function formatDueDate(dateString: string): string {
  return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function addDaysToDate(date: Date, days: number): string {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split("T")[0]!;
}

export function applyDemoNotificationDueDates(child: ChildProfile): ChildProfile {
  const today = new Date();

  return {
    ...child,
    milestones: child.milestones.map((milestone) => {
      if (milestone.completed) {
        return milestone;
      }

      if (milestone.label.includes("Polio")) {
        return { ...milestone, dueDate: addDaysToDate(today, 1) };
      }

      if (milestone.label.includes("MMR")) {
        return { ...milestone, dueDate: addDaysToDate(today, 3) };
      }

      return milestone;
    }),
  };
}
