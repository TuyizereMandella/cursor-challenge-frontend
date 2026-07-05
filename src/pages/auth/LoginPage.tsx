import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthShell } from "@/components/auth";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getDemoCredentials } from "@/data/authStore";
import { useAuth } from "@/contexts";
import type { UserRole } from "@/types/auth";

interface LoginPageProps {
  role: UserRole;
}

export function LoginPage({ role }: LoginPageProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from ??
    (role === "parent" ? "/parent/dashboard" : "/admin/dashboard");

  const demo = getDemoCredentials(role);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password }, role);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setIsLoading(false);
    }
  }

  function fillDemo() {
    setEmail(demo.email);
    setPassword(demo.password);
    setError(null);
  }

  const isParent = role === "parent";

  return (
    <AuthShell
      role={role}
      title={isParent ? "Parent sign in" : "Admin sign in"}
      subtitle={
        isParent
          ? "Access your children's vaccination dashboard."
          : "Access the platform administration console."
      }
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to={`/auth/${role}/register`}
            className={cn(
              "font-medium hover:underline",
              isParent ? "text-teal" : "text-accent-bright",
            )}
          >
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={demo.email}
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-sm text-danger-bright" role="alert">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          Sign in
        </Button>

        <Button type="button" variant="outline" className="w-full" onClick={fillDemo}>
          Use demo account
        </Button>
      </form>
    </AuthShell>
  );
}
