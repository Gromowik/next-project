'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { quizHost } from "@/phenomenal/host/host-object";
import { authApi } from "@/modules/auth/api/auth.api";

type NavbarProps = {
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
};

export function Navbar({ primaryActionLabel, onPrimaryAction }: NavbarProps) {
  const marqueeParts = [quizHost.O.name, quizHost.O.description];
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    authApi.me().then((res) => {
      if (res.user) setUserName(res.user.name);
    }).catch(() => null);
  }, []);

  const onLogout = async () => {
    await authApi.logout();
    setUserName(null);
  };

  return (
    <nav className="relative left-1/2 right-1/2 mb-8 w-screen -translate-x-1/2 border-y border-emerald-200/70 bg-linear-to-r from-[#effdf4] via-[#f8fffb] to-[#ecfff5] shadow-[0_10px_35px_rgba(16,185,129,0.10)] backdrop-blur">
      {/* Бегущая строка — на всю ширину */}
      <div className="overflow-hidden px-4 py-4">
        <div className="quiz-marquee-track gap-8 pr-8 text-sm font-semibold sm:text-base">
          {[0, 1, 2].map((index) => (
            <span key={index} aria-hidden={index > 0} className="quiz-marquee-item gap-3">
              <span className="bg-linear-to-r from-[#059669] via-[#10b981] to-[#65a30d] bg-clip-text text-transparent">
                {marqueeParts[0]}
              </span>
              <span className="text-emerald-400">•</span>
              <span className="bg-linear-to-r from-[#0f766e] via-[#14b8a6] to-[#22c55e] bg-clip-text text-transparent">
                {marqueeParts[1]}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Брендовый блок — прижат к левому краю, ссылка на главную */}
      <Link href="/" className="absolute left-4 top-1/2 -translate-y-1/2 min-w-0 shrink-0 rounded-2xl bg-linear-to-br from-emerald-700 via-emerald-800 to-teal-900 px-4 py-3 text-white shadow-lg transition hover:opacity-90">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
          Phenomenal Quiz
        </div>
        <div className="mt-1 text-sm text-emerald-50">Live host stream</div>
      </Link>

      {/* Кнопки — прижаты к правому краю */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex shrink-0 items-center gap-3">
          {primaryActionLabel && onPrimaryAction && (
            <button
              type="button"
              onClick={onPrimaryAction}
              className="rounded-xl bg-linear-to-r from-emerald-500 to-lime-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-emerald-600 hover:to-lime-600"
            >
              {primaryActionLabel}
            </button>
          )}

          {userName ? (
            <>
              <Link
                href="/auth"
                className="flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
                </span>
                {userName}
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Abmelden
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded-xl border border-emerald-300 bg-white/80 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-white"
            >
              Anmelden
            </Link>
          )}
        </div>
    </nav>
  );
}
