export interface PlatformMetrics {
  totalRegisteredChildren: number;
  activeClinicSessionsThisWeek: number;
  totalOverdueAlerts: number;
}

export interface RegionalOverdueRate {
  region: string;
  overdueCount: number;
  registeredChildren: number;
  rate: number;
}

export type AlertSeverity = "high" | "medium";

export interface AlertLog {
  id: string;
  timestamp: string;
  childName: string;
  doseLabel: string;
  region: string;
  phoneNumber: string;
  severity: AlertSeverity;
  message: string;
}

export interface AccountRecord {
  id: string;
  parentName: string;
  phoneNumber: string;
  childCount: number;
  region: string;
  duplicateGroupId: string | null;
}

export interface MergeCandidateGroup {
  duplicateGroupId: string;
  phoneNumber: string;
  records: AccountRecord[];
}
