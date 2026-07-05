import { useMemo, useState } from "react";
import { GitBranchPlus, History, Plus } from "lucide-react";
import {
  DataTable,
  ScheduleRuleForm,
  SlideOver,
} from "@/components/admin";
import { Badge, Button, Input } from "@/components/ui";
import {
  createScheduleVersion,
  filterScheduleVersions,
  formatAgeMonths,
  mockScheduleVersions,
  versionExistingSchedule,
} from "@/data/mockAdminCatalogs";
import type {
  CreateScheduleInput,
  VaccineScheduleVersion,
  VersionScheduleInput,
} from "@/types/catalog";

type SlideOverMode = "create" | "version" | null;

export function ScheduleRulesPage() {
  const [versions, setVersions] = useState<VaccineScheduleVersion[]>(mockScheduleVersions);
  const [searchQuery, setSearchQuery] = useState("");
  const [slideOverMode, setSlideOverMode] = useState<SlideOverMode>(null);
  const [versionTarget, setVersionTarget] = useState<VaccineScheduleVersion | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredVersions = useMemo(
    () => filterScheduleVersions(versions, searchQuery),
    [versions, searchQuery],
  );

  function openCreate() {
    setVersionTarget(null);
    setSlideOverMode("create");
  }

  function openVersion(version: VaccineScheduleVersion) {
    if (version.status !== "active") {
      return;
    }
    setVersionTarget(version);
    setSlideOverMode("version");
  }

  function closeSlideOver() {
    setSlideOverMode(null);
    setVersionTarget(null);
  }

  function handleCreate(input: CreateScheduleInput) {
    setVersions((current) => createScheduleVersion(current, input));
    closeSlideOver();
    setSuccessMessage(`${input.vaccineName} added to catalog as v${new Date().getFullYear()}.1.`);
  }

  function handleVersion(input: VersionScheduleInput) {
    const previous = versions.find(
      (v) => v.catalogId === input.catalogId && v.status === "active",
    );
    setVersions((current) => versionExistingSchedule(current, input));
    closeSlideOver();
    if (previous) {
      setSuccessMessage(
        `${previous.vaccineName} v${previous.version} archived. New active version published.`,
      );
    }
  }

  const columns = [
    {
      key: "vaccine",
      header: "Vaccine",
      render: (version: VaccineScheduleVersion) => (
        <div>
          <p className="font-medium text-slate-200">{version.vaccineName}</p>
          <p className="text-xs text-slate-500">Catalog ID: {version.catalogId}</p>
        </div>
      ),
    },
    {
      key: "version",
      header: "Version",
      className: "whitespace-nowrap font-mono text-xs",
      render: (version: VaccineScheduleVersion) => (
        <span className="text-slate-300">v{version.version}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "whitespace-nowrap",
      render: (version: VaccineScheduleVersion) => (
        <Badge priority={version.status === "active" ? "core" : "medium"}>
          {version.status === "active" ? "Active" : "Archived"}
        </Badge>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      className: "whitespace-nowrap capitalize",
      render: (version: VaccineScheduleVersion) => (
        <Badge priority={version.priority}>{version.priority}</Badge>
      ),
    },
    {
      key: "doses",
      header: "Dosing Rules",
      render: (version: VaccineScheduleVersion) => (
        <div className="space-y-1">
          {version.dosingRules.map((rule) => (
            <p key={rule.doseNumber} className="text-xs text-slate-400">
              {rule.label} · {formatAgeMonths(rule.ageMonths)}
            </p>
          ))}
        </div>
      ),
    },
    {
      key: "checkups",
      header: "Check-up Ages",
      className: "whitespace-nowrap text-xs",
      render: (version: VaccineScheduleVersion) =>
        version.checkUpAgeMonths.map(formatAgeMonths).join(", "),
    },
    {
      key: "effective",
      header: "Effective",
      className: "whitespace-nowrap text-xs",
      render: (version: VaccineScheduleVersion) => version.effectiveFrom,
    },
    {
      key: "actions",
      header: "Actions",
      className: "whitespace-nowrap",
      render: (version: VaccineScheduleVersion) =>
        version.status === "active" ? (
          <Button variant="outline" size="sm" onClick={() => openVersion(version)}>
            <GitBranchPlus className="h-4 w-4" aria-hidden="true" />
            New Version
          </Button>
        ) : (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <History className="h-3.5 w-3.5" aria-hidden="true" />
            Historical
          </span>
        ),
    },
  ];

  const activeCount = versions.filter((v) => v.status === "active").length;
  const archivedCount = versions.filter((v) => v.status === "archived").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Vaccine Schedule Catalog
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage master schedule versions. Versioning preserves historical records.
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Vaccine Rule
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
        <span>
          <span className="font-semibold text-accent-bright">{activeCount}</span> active versions
        </span>
        <span>
          <span className="font-semibold text-slate-300">{archivedCount}</span> archived (historical)
        </span>
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
        label="Search catalog"
        placeholder="Search by vaccine name or version..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        aria-label="Search vaccine schedule catalog"
      />

      <DataTable
        columns={columns}
        data={filteredVersions}
        getRowId={(version) => version.id}
        caption="Master vaccine schedule versions"
        emptyMessage="No schedule versions match your search."
      />

      <SlideOver
        open={slideOverMode !== null}
        onClose={closeSlideOver}
        title={slideOverMode === "version" ? "Version Schedule" : "Add Vaccination Rule"}
        description={
          slideOverMode === "version"
            ? "Publish a new version without disrupting historical records."
            : "Append a new vaccine dosing rule to the master catalog."
        }
        width="lg"
      >
        {slideOverMode === "create" && (
          <ScheduleRuleForm
            mode="create"
            onSubmitCreate={handleCreate}
            onSubmitVersion={handleVersion}
            onCancel={closeSlideOver}
          />
        )}
        {slideOverMode === "version" && versionTarget && (
          <ScheduleRuleForm
            mode="version"
            baseVersion={versionTarget}
            onSubmitCreate={handleCreate}
            onSubmitVersion={handleVersion}
            onCancel={closeSlideOver}
          />
        )}
      </SlideOver>
    </div>
  );
}
