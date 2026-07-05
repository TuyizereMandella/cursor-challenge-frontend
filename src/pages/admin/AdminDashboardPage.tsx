import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CalendarCheck,
  GitMerge,
  Search,
  Users,
} from "lucide-react";
import { DataTable, MetricCard, RegionalRateBar } from "@/components/admin";
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from "@/components/ui";
import {
  filterAccountRecords,
  filterAlertLogs,
  formatAlertTimestamp,
  getDuplicateGroups,
  mergeDuplicateGroup,
  mockAccountRecords,
  mockAlertLogs,
  platformMetrics,
  regionalOverdueRates,
} from "@/data/mockAdminAnalytics";
import type { AccountRecord, AlertLog } from "@/types/admin";

export function AdminDashboardPage() {
  const [alertFilter, setAlertFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [accounts, setAccounts] = useState<AccountRecord[]>(mockAccountRecords);
  const [mergeMessage, setMergeMessage] = useState<string | null>(null);

  const filteredAlerts = useMemo(
    () => filterAlertLogs(mockAlertLogs, alertFilter),
    [alertFilter],
  );

  const filteredAccounts = useMemo(
    () => filterAccountRecords(accounts, accountFilter),
    [accounts, accountFilter],
  );

  const duplicateGroups = useMemo(
    () => getDuplicateGroups(filteredAccounts),
    [filteredAccounts],
  );

  const averageOverdueRate = useMemo(() => {
    const total = regionalOverdueRates.reduce((sum, region) => sum + region.rate, 0);
    return (total / regionalOverdueRates.length).toFixed(1);
  }, []);

  function handleMerge(groupId: string, keepAccountId: string) {
    setAccounts((current) => mergeDuplicateGroup(current, groupId, keepAccountId));
    setMergeMessage("Duplicate records merged successfully.");
  }

  const alertColumns = [
    {
      key: "timestamp",
      header: "Time",
      className: "whitespace-nowrap w-36",
      render: (log: AlertLog) => (
        <span className="text-slate-400">{formatAlertTimestamp(log.timestamp)}</span>
      ),
    },
    {
      key: "message",
      header: "Alert",
      render: (log: AlertLog) => (
        <div>
          <p className="font-medium text-slate-200">{log.message}</p>
          <p className="mt-0.5 text-xs text-slate-500">{log.doseLabel}</p>
        </div>
      ),
    },
    {
      key: "region",
      header: "Region",
      className: "whitespace-nowrap",
      render: (log: AlertLog) => log.region,
    },
    {
      key: "phone",
      header: "Phone",
      className: "whitespace-nowrap font-mono text-xs",
      render: (log: AlertLog) => log.phoneNumber,
    },
    {
      key: "severity",
      header: "Severity",
      className: "whitespace-nowrap",
      render: (log: AlertLog) => (
        <Badge priority={log.severity === "high" ? "high" : "medium"}>
          {log.severity === "high" ? "High" : "Medium"}
        </Badge>
      ),
    },
  ];

  const accountColumns = [
    {
      key: "parent",
      header: "Account",
      render: (record: AccountRecord) => (
        <div>
          <p className="font-medium text-slate-200">{record.parentName}</p>
          <p className="text-xs text-slate-500">{record.region}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      className: "whitespace-nowrap font-mono text-xs",
      render: (record: AccountRecord) => record.phoneNumber,
    },
    {
      key: "children",
      header: "Children",
      className: "whitespace-nowrap text-center",
      render: (record: AccountRecord) => record.childCount,
    },
    {
      key: "status",
      header: "Status",
      className: "whitespace-nowrap",
      render: (record: AccountRecord) =>
        record.duplicateGroupId ? (
          <Badge priority="high">Duplicate</Badge>
        ) : (
          <Badge priority="core">Verified</Badge>
        ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
          Platform Executive Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          High-level platform metrics, regional overdue rates, and alert monitoring.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricCard
          label="Total Registered Children"
          value={platformMetrics.totalRegisteredChildren.toLocaleString()}
          icon={Users}
          subtitle="Across all connected regions"
          trend="+3.2% vs last month"
        />

        <MetricCard
          label="Overdue Vaccination Rates by Region"
          value={`${averageOverdueRate}% avg`}
          icon={AlertTriangle}
          subtitle={`${platformMetrics.totalOverdueAlerts} active overdue alerts`}
          priority="high"
        >
          <div className="space-y-3">
            {regionalOverdueRates.map((region) => (
              <RegionalRateBar
                key={region.region}
                region={region.region}
                rate={region.rate}
                overdueCount={region.overdueCount}
              />
            ))}
          </div>
        </MetricCard>

        <MetricCard
          label="Active Clinic Sessions"
          value={platformMetrics.activeClinicSessionsThisWeek.toString()}
          icon={CalendarCheck}
          subtitle="Operating this week platform-wide"
          priority="core"
          trend="12 sessions added since Monday"
        />
      </div>

      <section className="space-y-4" aria-labelledby="alert-logs-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 id="alert-logs-heading" className="text-lg font-semibold text-slate-100">
              Recent Alert Logs
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Overdue vaccination alerts across all regions.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Input
              label="Filter alerts"
              placeholder="Phone, child, region..."
              value={alertFilter}
              onChange={(event) => setAlertFilter(event.target.value)}
              aria-label="Filter alert logs by phone number, child name, or region"
            />
          </div>
        </div>

        <DataTable
          columns={alertColumns}
          data={filteredAlerts}
          getRowId={(log) => log.id}
          caption="Recent vaccination alert logs"
          emptyMessage="No alert logs match your filter."
        />
      </section>

      <section className="space-y-4" aria-labelledby="account-lookup-heading">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 id="account-lookup-heading" className="text-lg font-semibold text-slate-100">
              Account Lookup &amp; Duplicate Merge
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Search by phone number to find accounts and merge duplicate records.
            </p>
          </div>
          <div className="w-full sm:max-w-xs">
            <Input
              label="Search accounts"
              placeholder="Phone number or parent name..."
              value={accountFilter}
              onChange={(event) => {
                setAccountFilter(event.target.value);
                setMergeMessage(null);
              }}
              aria-label="Search accounts by phone number or parent name"
            />
          </div>
        </div>

        {mergeMessage && (
          <div
            className="rounded-lg border border-accent/30 bg-accent-glow px-4 py-3 text-sm text-accent-bright"
            role="status"
          >
            {mergeMessage}
          </div>
        )}

        {duplicateGroups.length > 0 && (
          <div className="space-y-3">
            {duplicateGroups.map((group) => (
              <Card key={group.duplicateGroupId} className="border-alert/20 bg-alert-glow/10">
                <CardHeader className="border-b-0 pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <CardTitle className="text-sm">Duplicate records detected</CardTitle>
                      <CardDescription>
                        {group.records.length} accounts share {group.phoneNumber}
                      </CardDescription>
                    </div>
                    <Badge priority="high">Merge required</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-3">
                  <div className="flex flex-wrap gap-2">
                    {group.records.map((record: AccountRecord) => (
                      <Button
                        key={record.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleMerge(group.duplicateGroupId, record.id)}
                      >
                        <GitMerge className="h-4 w-4" aria-hidden="true" />
                        Keep {record.parentName}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <DataTable
          columns={accountColumns}
          data={filteredAccounts}
          getRowId={(record) => record.id}
          caption="Parent account records for lookup and duplicate resolution"
          emptyMessage="No accounts match your search."
        />

        {accountFilter && filteredAccounts.length > 0 && duplicateGroups.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-slate-500">
            <Search className="h-4 w-4" aria-hidden="true" />
            No duplicate groups found for this search. All matching accounts are unique.
          </p>
        )}
      </section>

      <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-surface-muted/50 px-4 py-3 text-xs text-slate-500">
        <Activity className="h-4 w-4 text-info-bright" aria-hidden="true" />
        Dashboard refreshes from mock analytics engine — wire to live API endpoints when ready.
      </div>
    </div>
  );
}
