import { useState, type FormEvent } from "react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { VERIFIED_TAG_LABELS, type RegisterHospitalInput, type VerifiedTag } from "@/types/catalog";
import { SERVICE_LABELS, type HospitalService } from "@/types/hospital";

interface RegisterHospitalFormProps {
  onSubmit: (input: RegisterHospitalInput) => void;
  onCancel: () => void;
}

const ALL_SERVICES = Object.keys(SERVICE_LABELS) as HospitalService[];
const ALL_VERIFIED_TAGS = Object.keys(VERIFIED_TAG_LABELS) as VerifiedTag[];

const initialState: RegisterHospitalInput = {
  name: "",
  address: "",
  region: "",
  latitude: 0,
  longitude: 0,
  verifiedTags: [],
  services: ["vaccination"],
};

export function RegisterHospitalForm({ onSubmit, onCancel }: RegisterHospitalFormProps) {
  const [form, setForm] = useState<RegisterHospitalInput>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleTag(tag: VerifiedTag) {
    setForm((current) => ({
      ...current,
      verifiedTags: current.verifiedTags.includes(tag)
        ? current.verifiedTags.filter((item) => item !== tag)
        : [...current.verifiedTags, tag],
    }));
  }

  function toggleService(service: HospitalService) {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  }

  function validate(): Record<string, string> {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Facility name is required.";
    if (!form.address.trim()) nextErrors.address = "Address is required.";
    if (!form.region.trim()) nextErrors.region = "Region is required.";
    if (form.latitude < -90 || form.latitude > 90) {
      nextErrors.latitude = "Latitude must be between -90 and 90.";
    }
    if (form.longitude < -180 || form.longitude > 180) {
      nextErrors.longitude = "Longitude must be between -180 and 180.";
    }
    if (form.services.length === 0) {
      nextErrors.services = "Select at least one service.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Facility name"
        value={form.name}
        onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
        placeholder="e.g. Riverside Community Clinic"
        error={errors.name}
      />

      <Input
        label="Street address"
        value={form.address}
        onChange={(e) => setForm((c) => ({ ...c, address: e.target.value }))}
        placeholder="Full street address"
        error={errors.address}
      />

      <Input
        label="Region / district"
        value={form.region}
        onChange={(e) => setForm((c) => ({ ...c, region: e.target.value }))}
        placeholder="e.g. Central District"
        error={errors.region}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Latitude"
          type="number"
          step="any"
          value={form.latitude || ""}
          onChange={(e) =>
            setForm((c) => ({ ...c, latitude: parseFloat(e.target.value) || 0 }))
          }
          placeholder="40.7128"
          error={errors.latitude}
        />
        <Input
          label="Longitude"
          type="number"
          step="any"
          value={form.longitude || ""}
          onChange={(e) =>
            setForm((c) => ({ ...c, longitude: parseFloat(e.target.value) || 0 }))
          }
          placeholder="-74.0060"
          error={errors.longitude}
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-300">Verified tags</legend>
        <div className="flex flex-wrap gap-2">
          {ALL_VERIFIED_TAGS.map((tag) => (
            <label
              key={tag}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ring-1 transition-all",
                form.verifiedTags.includes(tag)
                  ? "bg-accent-glow text-accent-bright ring-accent/30"
                  : "bg-surface-muted text-slate-400 ring-border-subtle hover:text-slate-200",
              )}
            >
              <input
                type="checkbox"
                checked={form.verifiedTags.includes(tag)}
                onChange={() => toggleTag(tag)}
                className="sr-only"
              />
              {VERIFIED_TAG_LABELS[tag]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-slate-300">Services offered</legend>
        {errors.services && (
          <p className="text-xs text-danger-bright" role="alert">
            {errors.services}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {ALL_SERVICES.map((service) => (
            <label
              key={service}
              className={cn(
                "cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium ring-1 transition-all",
                form.services.includes(service)
                  ? "bg-info-glow text-info-bright ring-info/30"
                  : "bg-surface-muted text-slate-400 ring-border-subtle hover:text-slate-200",
              )}
            >
              <input
                type="checkbox"
                checked={form.services.includes(service)}
                onChange={() => toggleService(service)}
                className="sr-only"
              />
              {SERVICE_LABELS[service]}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col-reverse gap-2 border-t border-border-subtle pt-5 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Register Facility</Button>
      </div>
    </form>
  );
}
