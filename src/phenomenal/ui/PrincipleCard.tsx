import { findPrincipleById } from "@/phenomenal/rf/find-principle";

export function PrincipleCard({ principleId }: { principleId?: string }) {
  if (!principleId) return null;

  const principle = findPrincipleById(principleId);
  if (!principle) return null;

  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-slate-900">
      <h4 className="font-semibold text-slate-900">Принцип: {principle.title}</h4>
      <p className="text-sm text-gray-700">{principle.description}</p>
    </div>
  );
}
