import type { MapCluster, NearbyHospital } from "@/types/hospital";

export const MOCK_USER_LOCATION = {
  label: "Downtown Metro Area",
  latitude: 40.7128,
  longitude: -74.006,
};

export const mockNearbyHospitals: NearbyHospital[] = [
  {
    id: "hosp-001",
    name: "City General Hospital",
    address: "1200 Medical Center Dr",
    distanceKm: 1.2,
    services: ["vaccination", "growth_monitoring", "maternity"],
    clinicDays: [
      { date: "2026-07-08", label: "Walk-in Immunization Clinic", timeRange: "9:00 AM – 4:00 PM" },
      { date: "2026-07-15", label: "Pediatric Vaccination Day", timeRange: "10:00 AM – 2:00 PM" },
      { date: "2026-07-22", label: "Walk-in Immunization Clinic", timeRange: "9:00 AM – 4:00 PM" },
    ],
    cluster: "central",
    gridPosition: { row: 2, col: 3 },
    isOpen: true,
  },
  {
    id: "hosp-002",
    name: "Westside Pediatric Clinic",
    address: "845 Oak Lane, Suite 200",
    distanceKm: 2.8,
    services: ["vaccination", "growth_monitoring"],
    clinicDays: [
      { date: "2026-07-10", label: "Infant Immunization Session", timeRange: "8:30 AM – 12:30 PM" },
      { date: "2026-07-17", label: "School-age Vaccine Clinic", timeRange: "1:00 PM – 5:00 PM" },
    ],
    cluster: "west",
    gridPosition: { row: 3, col: 1 },
    isOpen: true,
  },
  {
    id: "hosp-003",
    name: "Community Health Center",
    address: "300 Riverside Ave",
    distanceKm: 4.1,
    services: ["vaccination", "maternity"],
    clinicDays: [
      { date: "2026-07-12", label: "Community Vaccination Drive", timeRange: "9:00 AM – 3:00 PM" },
      { date: "2026-07-19", label: "Maternal & Child Health Day", timeRange: "10:00 AM – 4:00 PM" },
    ],
    cluster: "north",
    gridPosition: { row: 1, col: 2 },
    isOpen: true,
  },
  {
    id: "hosp-004",
    name: "Northside Family Medicine",
    address: "510 Highland Blvd",
    distanceKm: 3.5,
    services: ["vaccination", "growth_monitoring", "maternity"],
    clinicDays: [
      { date: "2026-07-09", label: "Express Immunization Hours", timeRange: "7:30 AM – 11:30 AM" },
      { date: "2026-07-16", label: "Express Immunization Hours", timeRange: "7:30 AM – 11:30 AM" },
    ],
    cluster: "north",
    gridPosition: { row: 1, col: 4 },
    isOpen: false,
  },
  {
    id: "hosp-005",
    name: "Metro Children's Wellness",
    address: "77 Parkview Circle",
    distanceKm: 5.6,
    services: ["vaccination", "growth_monitoring"],
    clinicDays: [
      { date: "2026-07-14", label: "Weekend Vaccination Clinic", timeRange: "9:00 AM – 1:00 PM" },
    ],
    cluster: "west",
    gridPosition: { row: 4, col: 2 },
    isOpen: true,
  },
];

export function formatDistance(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${km.toFixed(1)} km`;
}

export function getUpcomingClinicDays(
  clinicDays: NearbyHospital["clinicDays"],
  referenceDate: Date = new Date(),
): NearbyHospital["clinicDays"] {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);

  return clinicDays
    .filter((day) => new Date(`${day.date}T00:00:00`) >= ref)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getHospitalsByCluster(
  hospitals: NearbyHospital[],
): Record<MapCluster, NearbyHospital[]> {
  return hospitals.reduce(
    (groups, hospital) => {
      groups[hospital.cluster].push(hospital);
      return groups;
    },
    { north: [], central: [], west: [] } as Record<MapCluster, NearbyHospital[]>,
  );
}

export function sortHospitalsByDistance(hospitals: NearbyHospital[]): NearbyHospital[] {
  return [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm);
}

export function filterHospitals(
  hospitals: NearbyHospital[],
  query: string,
): NearbyHospital[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return hospitals;
  }

  return hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(normalized) ||
      hospital.address.toLowerCase().includes(normalized),
  );
}
