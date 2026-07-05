import type { HospitalService } from "@/types/hospital";

export type FacilityStatus = "active" | "pending" | "inactive";

export type VerifiedTag =
  | "who_certified"
  | "government_verified"
  | "pediatric_specialist"
  | "emergency_ready";

export const VERIFIED_TAG_LABELS: Record<VerifiedTag, string> = {
  who_certified: "WHO Certified",
  government_verified: "Government Verified",
  pediatric_specialist: "Pediatric Specialist",
  emergency_ready: "24hr Emergency Ready",
};

export interface FacilityCoordinates {
  latitude: number;
  longitude: number;
}

export interface AdminHospitalFacility {
  id: string;
  name: string;
  address: string;
  region: string;
  coordinates: FacilityCoordinates;
  verifiedTags: VerifiedTag[];
  services: HospitalService[];
  status: FacilityStatus;
  vaccinesAvailable: number;
  registeredAt: string;
}

export type ScheduleVersionStatus = "active" | "archived";

export type SchedulePriority = "core" | "high" | "medium";

export interface DosingRule {
  doseNumber: number;
  ageMonths: number;
  label: string;
}

export interface VaccineScheduleVersion {
  id: string;
  catalogId: string;
  vaccineName: string;
  version: string;
  status: ScheduleVersionStatus;
  priority: SchedulePriority;
  dosingRules: DosingRule[];
  checkUpAgeMonths: number[];
  effectiveFrom: string;
  createdAt: string;
  notes: string;
}

export interface RegisterHospitalInput {
  name: string;
  address: string;
  region: string;
  latitude: number;
  longitude: number;
  verifiedTags: VerifiedTag[];
  services: HospitalService[];
}

export interface CreateScheduleInput {
  vaccineName: string;
  priority: SchedulePriority;
  dosingRules: DosingRule[];
  checkUpAgeMonths: number[];
  effectiveFrom: string;
  notes: string;
}

export interface VersionScheduleInput {
  catalogId: string;
  dosingRules: DosingRule[];
  checkUpAgeMonths: number[];
  effectiveFrom: string;
  notes: string;
}
