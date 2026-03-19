import Link from "next/link";
import { AuthPanel } from "@/modules/auth/components/AuthPanel";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-lime-50 px-4 py-10">
      <div className="mx-auto mb-6 flex w-full max-w-xl items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Next Learning Auth
        </h2>
        <Link href="/quiz" className="text-sm font-semibold text-emerald-800 underline-offset-4 hover:underline">
          Zurueck zum Quiz
        </Link>
      </div>

      <AuthPanel />
    </main>
  );
}
