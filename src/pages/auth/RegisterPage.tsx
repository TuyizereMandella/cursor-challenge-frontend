import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "@/components/auth";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useAuth } from "@/contexts";
import { DEFAULT_REMINDER_CHANNELS, type ReminderChannels, type UserRole } from "@/types/auth";

interface RegisterPageProps {
  role: UserRole;
}

const CHANNEL_OPTIONS: Array<{
  key: keyof ReminderChannels;
  label: string;
  description: string;
}> = [
  {
    key: "sms",
    label: "SMS",
    description: "Text message reminders to your phone",
  },
  {
    key: "email",
    label: "Email",
    description: "Reminder emails to your registered address",
  },
  {
    key: "inApp",
    label: "In-app",
    description: "Alerts inside the website notification drawer",
  },
];

export function RegisterPage({ role }: RegisterPageProps) {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [reminderChannels, setReminderChannels] = useState<ReminderChannels>(
    DEFAULT_REMINDER_CHANNELS,
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function toggleChannel(key: keyof ReminderChannels) {
    setReminderChannels((current) => ({ ...current, [key]: !current[key] }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await register(
        {
          name,
          email,
          password,
          confirmPassword,
          organization: role === "admin" ? organization : undefined,
          phone: role === "parent" ? phone : undefined,
          reminderChannels: role === "parent" ? reminderChannels : undefined,
        },
        role,
      );
      navigate(role === "parent" ? "/parent/dashboard" : "/admin/dashboard", {
        replace: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  }

  const isParent = role === "parent";

  return (
    <AuthShell
      role={role}
      title={isParent ? "Create parent account" : "Create admin account"}
      subtitle={
        isParent
          ? "Register with your contact details to receive SMS, email, and in-app reminders."
          : "Register for platform administration access."
      }
      footer={
        <>
          Already have an account?{" "}
          <Link
            to={`/auth/${role}/login`}
            className={cn(
              "font-medium hover:underline",
              isParent ? "text-teal" : "text-accent-bright",
            )}
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isParent ? "Sarah Chen" : "Dr. Marcus Webb"}
          required
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          hint={isParent ? "Used for email vaccination reminders" : undefined}
          required
        />

        {isParent && (
          <>
            <Input
              label="Phone number"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 234-8891"
              hint="Required for SMS reminders"
              required
            />

            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-slate-300">
                Reminder delivery methods
              </legend>
              <p className="text-xs text-slate-500">
                Choose how you want to receive vaccination alerts. In-app reminders are
                available to registered website users.
              </p>
              <div className="space-y-2">
                {CHANNEL_OPTIONS.map(({ key, label, description }) => (
                  <label
                    key={key}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-3 transition-all",
                      reminderChannels[key]
                        ? "border-accent/30 bg-accent-glow/10"
                        : "border-border-subtle bg-surface-muted/30",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={reminderChannels[key]}
                      onChange={() => toggleChannel(key)}
                      className="mt-0.5 h-4 w-4 rounded border-border-strong accent-accent"
                    />
                    <span>
                      <span className="block text-sm font-medium text-slate-200">{label}</span>
                      <span className="block text-xs text-slate-500">{description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        )}

        {!isParent && (
          <Input
            label="Organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="VaxReminder Health Network"
            hint="Optional — defaults to VaxReminder Network"
          />
        )}
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          hint="Minimum 8 characters"
          required
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-danger-bright" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
