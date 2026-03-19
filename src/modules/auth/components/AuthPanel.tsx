"use client";

import { useEffect, useMemo, useState } from "react";
import { authApi } from "@/modules/auth/api/auth.api";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { SignupForm } from "@/modules/auth/components/SignupForm";
import type { AuthUser, LoginCredentials, SignupData } from "@/modules/auth/model/types";

type Mode = "login" | "signup";

export function AuthPanel() {
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  const title = useMemo(() => (mode === "login" ? "Anmeldung" : "Registrierung"), [mode]);

  useEffect(() => {
    let active = true;

    authApi
      .me()
      .then((response) => {
        if (!active || !response.user) return;
        setUser({
          ...response.user,
          token: "session",
        });
      })
      .catch(() => {
        if (!active) return;
        setError(null);
      });

    return () => {
      active = false;
    };
  }, []);

  const onLogin = async (credentials: LoginCredentials) => {
    setError(null);

    try {
      const response = await authApi.login(credentials);
      setUser(response.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
    }
  };

  const onSignup = async (data: SignupData) => {
    setError(null);

    try {
      const response = await authApi.signup(data);
      setUser(response.user);
      setMode("login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registrierung fehlgeschlagen.");
    }
  };

  const onLogout = async () => {
    setError(null);

    try {
      await authApi.logout();
      setUser(null);
    } catch {
      setError("Abmeldung fehlgeschlagen.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800"
        >
          {mode === "login" ? "Konto erstellen" : "Zum Login"}
        </button>
      </div>

      {user ? (
        <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm text-emerald-900">
            Eingeloggt als <strong>{user.name}</strong> ({user.email})
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
          >
            Abmelden
          </button>
        </div>
      ) : mode === "login" ? (
        <LoginForm onSubmit={onLogin} />
      ) : (
        <SignupForm onSubmit={onSignup} />
      )}

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
