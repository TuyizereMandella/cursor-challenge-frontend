import type {
  AccountRecord,
  AlertLog,
  MergeCandidateGroup,
  PlatformMetrics,
  RegionalOverdueRate,
} from "@/types/admin";

export const platformMetrics: PlatformMetrics = {
  totalRegisteredChildren: 12847,
  activeClinicSessionsThisWeek: 48,
  totalOverdueAlerts: 127,
};

export const regionalOverdueRates: RegionalOverdueRate[] = [
  { region: "North District", overdueCount: 42, registeredChildren: 2840, rate: 4.8 },
  { region: "Central District", overdueCount: 31, registeredChildren: 4120, rate: 3.2 },
  { region: "West District", overdueCount: 28, registeredChildren: 2650, rate: 4.1 },
  { region: "East District", overdueCount: 18, registeredChildren: 1980, rate: 2.9 },
  { region: "South District", overdueCount: 8, registeredChildren: 1257, rate: 1.6 },
];

export const mockAlertLogs: AlertLog[] = [
  {
    id: "alert-001",
    timestamp: "2026-07-05T08:14:00Z",
    childName: "Emma Chen",
    doseLabel: "MMR — 2nd dose",
    region: "Central District",
    phoneNumber: "+1 (555) 234-8891",
    severity: "high",
    message: "Emma Chen overdue for MMR — 2nd dose in Central District",
  },
  {
    id: "alert-002",
    timestamp: "2026-07-05T07:52:00Z",
    childName: "Noah Patel",
    doseLabel: "DTaP — 3rd dose",
    region: "North District",
    phoneNumber: "+1 (555) 882-4410",
    severity: "high",
    message: "Noah Patel overdue for DTaP — 3rd dose in North District",
  },
  {
    id: "alert-003",
    timestamp: "2026-07-04T16:30:00Z",
    childName: "Sophia Rivera",
    doseLabel: "HepB — 3rd dose",
    region: "West District",
    phoneNumber: "+1 (555) 441-2209",
    severity: "medium",
    message: "Sophia Rivera overdue for HepB — 3rd dose in West District",
  },
  {
    id: "alert-004",
    timestamp: "2026-07-04T11:05:00Z",
    childName: "Liam Chen",
    doseLabel: "Polio (IPV) — 1st dose",
    region: "Central District",
    phoneNumber: "+1 (555) 234-8891",
    severity: "medium",
    message: "Liam Chen overdue for Polio (IPV) — 1st dose in Central District",
  },
  {
    id: "alert-005",
    timestamp: "2026-07-03T19:18:00Z",
    childName: "Ava Thompson",
    doseLabel: "MMR — 1st dose",
    region: "East District",
    phoneNumber: "+1 (555) 667-9033",
    severity: "high",
    message: "Ava Thompson overdue for MMR — 1st dose in East District",
  },
  {
    id: "alert-006",
    timestamp: "2026-07-03T09:42:00Z",
    childName: "Ethan Brooks",
    doseLabel: "Hib — 1st dose",
    region: "South District",
    phoneNumber: "+1 (555) 318-7742",
    severity: "medium",
    message: "Ethan Brooks overdue for Hib — 1st dose in South District",
  },
];

export const mockAccountRecords: AccountRecord[] = [
  {
    id: "acct-001",
    parentName: "Sarah Chen",
    phoneNumber: "+1 (555) 234-8891",
    childCount: 2,
    region: "Central District",
    duplicateGroupId: "dup-001",
  },
  {
    id: "acct-002",
    parentName: "Sarah Chen (alt)",
    phoneNumber: "+1 (555) 234-8891",
    childCount: 2,
    region: "Central District",
    duplicateGroupId: "dup-001",
  },
  {
    id: "acct-003",
    parentName: "Marcus Webb",
    phoneNumber: "+1 (555) 882-4410",
    childCount: 1,
    region: "North District",
    duplicateGroupId: null,
  },
  {
    id: "acct-004",
    parentName: "Priya Patel",
    phoneNumber: "+1 (555) 882-4410",
    childCount: 1,
    region: "North District",
    duplicateGroupId: "dup-002",
  },
  {
    id: "acct-005",
    parentName: "Priya P.",
    phoneNumber: "+1 (555) 882-4410",
    childCount: 1,
    region: "North District",
    duplicateGroupId: "dup-002",
  },
  {
    id: "acct-006",
    parentName: "James Rivera",
    phoneNumber: "+1 (555) 441-2209",
    childCount: 3,
    region: "West District",
    duplicateGroupId: null,
  },
];

export function filterAlertLogs(logs: AlertLog[], query: string): AlertLog[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return logs;
  }

  const digitsOnly = normalized.replace(/\D/g, "");

  return logs.filter((log) => {
    const phoneDigits = log.phoneNumber.replace(/\D/g, "");
    return (
      log.childName.toLowerCase().includes(normalized) ||
      log.region.toLowerCase().includes(normalized) ||
      log.doseLabel.toLowerCase().includes(normalized) ||
      log.message.toLowerCase().includes(normalized) ||
      (digitsOnly.length > 0 && phoneDigits.includes(digitsOnly))
    );
  });
}

export function filterAccountRecords(
  records: AccountRecord[],
  query: string,
): AccountRecord[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return records;
  }

  const digitsOnly = normalized.replace(/\D/g, "");

  return records.filter((record) => {
    const phoneDigits = record.phoneNumber.replace(/\D/g, "");
    return (
      record.parentName.toLowerCase().includes(normalized) ||
      record.region.toLowerCase().includes(normalized) ||
      (digitsOnly.length > 0 && phoneDigits.includes(digitsOnly)) ||
      record.phoneNumber.toLowerCase().includes(normalized)
    );
  });
}

export function getDuplicateGroups(records: AccountRecord[]): MergeCandidateGroup[] {
  const groups = new Map<string, AccountRecord[]>();

  for (const record of records) {
    if (!record.duplicateGroupId) {
      continue;
    }

    const existing = groups.get(record.duplicateGroupId) ?? [];
    existing.push(record);
    groups.set(record.duplicateGroupId, existing);
  }

  return Array.from(groups.entries())
    .filter(([, groupRecords]) => groupRecords.length > 1)
    .map(([duplicateGroupId, groupRecords]) => ({
      duplicateGroupId,
      phoneNumber: groupRecords[0]!.phoneNumber,
      records: groupRecords,
    }));
}

export function mergeDuplicateGroup(
  records: AccountRecord[],
  duplicateGroupId: string,
  keepAccountId: string,
): AccountRecord[] {
  const groupRecords = records.filter(
    (record) => record.duplicateGroupId === duplicateGroupId,
  );

  if (groupRecords.length <= 1) {
    return records;
  }

  const keptRecord = groupRecords.find((record) => record.id === keepAccountId);
  if (!keptRecord) {
    return records;
  }

  const mergedChildCount = groupRecords.reduce(
    (total, record) => total + record.childCount,
    0,
  );

  const removedIds = new Set(
    groupRecords.filter((record) => record.id !== keepAccountId).map((record) => record.id),
  );

  return records
    .filter((record) => !removedIds.has(record.id))
    .map((record) =>
      record.id === keepAccountId
        ? {
            ...record,
            childCount: mergedChildCount,
            duplicateGroupId: null,
            parentName: record.parentName.replace(" (alt)", "").replace(" P.", " Patel"),
          }
        : record,
    );
}

export function formatAlertTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
