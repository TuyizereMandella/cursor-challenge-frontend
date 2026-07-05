import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import {
  EmptyState,
  HospitalCard,
  HospitalMapView,
  HospitalViewToggle,
  type HospitalViewMode,
} from "@/components/parent";
import { Button, Card, Input } from "@/components/ui";
import {
  filterHospitals,
  mockNearbyHospitals,
  sortHospitalsByDistance,
} from "@/data/mockHospitals";
import { useParentContext } from "@/contexts";

export function HospitalMapsPage() {
  const navigate = useNavigate();
  const {
    children,
    activeChild,
    activeChildId,
    setActiveChildId,
    setPreferredHospital,
  } = useParentContext();

  const [viewMode, setViewMode] = useState<HospitalViewMode>("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMapHospitalId, setSelectedMapHospitalId] = useState<string | null>(
    mockNearbyHospitals[0]?.id ?? null,
  );

  const filteredHospitals = useMemo(
    () => sortHospitalsByDistance(filterHospitals(mockNearbyHospitals, searchQuery)),
    [searchQuery],
  );

  const preferredHospitalId = activeChild?.preferredHospitalId ?? null;

  function handleTogglePreferred(hospitalId: string) {
    if (!activeChildId) {
      return;
    }
    setPreferredHospital(activeChildId, hospitalId);
  }

  if (children.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Nearby Hospitals
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find clinics and set a preferred vaccination center for your child.
          </p>
        </div>
        <EmptyState
          icon={MapPin}
          title="Add a child profile first"
          description="Hospital lookup and preferred center selection become available after you register at least one child on the dashboard."
          actionLabel="Go to Dashboard"
          onAction={() => navigate("/parent/dashboard")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Nearby Hospitals
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Find clinics, compare services, and set a preferred center for your child.
          </p>
        </div>
        <HospitalViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1">
          <Input
            label="Search location"
            placeholder="Search by hospital name or address"
            hint="Using mock geolocation from Downtown Metro Area"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {children.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Select child for preferred center"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Preferred center for:
          </span>
          {children.map((child) => (
            <Button
              key={child.id}
              variant={child.id === activeChildId ? "primary" : "secondary"}
              size="sm"
              onClick={() => setActiveChildId(child.id)}
              role="tab"
              aria-selected={child.id === activeChildId}
            >
              {child.name}
            </Button>
          ))}
        </div>
      )}

      {viewMode === "map" ? (
        <div className="space-y-4">
          <HospitalMapView
            hospitals={filteredHospitals}
            preferredHospitalId={preferredHospitalId}
            selectedHospitalId={selectedMapHospitalId}
            onSelectHospital={setSelectedMapHospitalId}
          />

          {selectedMapHospitalId && (
            <HospitalCard
              hospital={
                filteredHospitals.find((h) => h.id === selectedMapHospitalId) ??
                mockNearbyHospitals.find((h) => h.id === selectedMapHospitalId)!
              }
              isPreferred={preferredHospitalId === selectedMapHospitalId}
              onTogglePreferred={() => handleTogglePreferred(selectedMapHospitalId)}
              preferredForLabel={activeChild?.name}
              compact
            />
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHospitals.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <p className="text-sm text-slate-500">No hospitals match your search.</p>
            </Card>
          ) : (
            filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                isPreferred={preferredHospitalId === hospital.id}
                onTogglePreferred={() => handleTogglePreferred(hospital.id)}
                preferredForLabel={activeChild?.name}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
