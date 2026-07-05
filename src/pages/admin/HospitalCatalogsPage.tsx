import { useMemo, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import {
  DataTable,
  RegisterHospitalForm,
  SlideOver,
} from "@/components/admin";
import { Badge, Button, Input } from "@/components/ui";
import {
  filterHospitals,
  formatCoordinates,
  mockAdminHospitals,
  registerHospital,
} from "@/data/mockAdminCatalogs";
import { VERIFIED_TAG_LABELS, type AdminHospitalFacility, type RegisterHospitalInput } from "@/types/catalog";
import { SERVICE_LABELS } from "@/types/hospital";

export function HospitalCatalogsPage() {
  const [hospitals, setHospitals] = useState<AdminHospitalFacility[]>(mockAdminHospitals);
  const [searchQuery, setSearchQuery] = useState("");
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredHospitals = useMemo(
    () => filterHospitals(hospitals, searchQuery),
    [hospitals, searchQuery],
  );

  function handleRegister(input: RegisterHospitalInput) {
    setHospitals((current) => registerHospital(current, input));
    setSlideOverOpen(false);
    setSuccessMessage(`${input.name} registered and pending verification.`);
  }

  const columns = [
    {
      key: "name",
      header: "Facility",
      render: (hospital: AdminHospitalFacility) => (
        <div>
          <p className="font-medium text-slate-200">{hospital.name}</p>
          <p className="text-xs text-slate-500">{hospital.address}</p>
        </div>
      ),
    },
    {
      key: "region",
      header: "Region",
      className: "whitespace-nowrap",
      render: (hospital: AdminHospitalFacility) => hospital.region,
    },
    {
      key: "coordinates",
      header: "Coordinates",
      className: "whitespace-nowrap font-mono text-xs",
      render: (hospital: AdminHospitalFacility) => (
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-accent-bright" aria-hidden="true" />
          {formatCoordinates(hospital.coordinates)}
        </span>
      ),
    },
    {
      key: "tags",
      header: "Verified Tags",
      render: (hospital: AdminHospitalFacility) => (
        <div className="flex flex-wrap gap-1.5">
          {hospital.verifiedTags.length === 0 ? (
            <span className="text-xs text-slate-500">None</span>
          ) : (
            hospital.verifiedTags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px]">
                {VERIFIED_TAG_LABELS[tag]}
              </Badge>
            ))
          )}
        </div>
      ),
    },
    {
      key: "services",
      header: "Services",
      render: (hospital: AdminHospitalFacility) => (
        <div className="flex flex-wrap gap-1.5">
          {hospital.services.map((service) => (
            <Badge key={service} priority="medium" className="text-[10px]">
              {SERVICE_LABELS[service]}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "whitespace-nowrap",
      render: (hospital: AdminHospitalFacility) => (
        <Badge
          priority={
            hospital.status === "active"
              ? "core"
              : hospital.status === "pending"
                ? "high"
                : "medium"
          }
        >
          {hospital.status.charAt(0).toUpperCase() + hospital.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "vaccines",
      header: "Vaccines",
      className: "whitespace-nowrap text-center",
      render: (hospital: AdminHospitalFacility) => hospital.vaccinesAvailable,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Hospital Directory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Register facilities with coordinates, verified tags, and service classifications.
          </p>
        </div>
        <Button size="sm" onClick={() => setSlideOverOpen(true)}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Register Facility
        </Button>
      </div>

      {successMessage && (
        <div
          className="rounded-lg border border-accent/30 bg-accent-glow px-4 py-3 text-sm text-accent-bright"
          role="status"
        >
          {successMessage}
        </div>
      )}

      <Input
        label="Search directory"
        placeholder="Search by name, region, or address..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        aria-label="Search hospital directory"
      />

      <DataTable
        columns={columns}
        data={filteredHospitals}
        getRowId={(hospital) => hospital.id}
        caption="Registered hospital and clinic facilities"
        emptyMessage="No facilities match your search."
      />

      <SlideOver
        open={slideOverOpen}
        onClose={() => setSlideOverOpen(false)}
        title="Register Health Facility"
        description="Add a new facility with structural coordinates and verified tagging options."
      >
        <RegisterHospitalForm
          onSubmit={handleRegister}
          onCancel={() => setSlideOverOpen(false)}
        />
      </SlideOver>
    </div>
  );
}
