export type HospitalService = "vaccination" | "growth_monitoring" | "maternity";

export type MapCluster = "north" | "central" | "west";

export interface ImmunizationClinicDay {
  date: string;
  label: string;
  timeRange: string;
}

export interface NearbyHospital {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  services: HospitalService[];
  clinicDays: ImmunizationClinicDay[];
  cluster: MapCluster;
  gridPosition: { row: number; col: number };
  isOpen: boolean;
}

export const SERVICE_LABELS: Record<HospitalService, string> = {
  vaccination: "Vaccination",
  growth_monitoring: "Growth Monitoring",
  maternity: "Maternity",
};

export const CLUSTER_LABELS: Record<MapCluster, string> = {
  north: "North District",
  central: "Central District",
  west: "West District",
};
