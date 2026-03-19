import { findBeaconById } from "./tree";

function weightedPick(ids: string[]) {
  const weighted = ids.map((id) => {
    const beacon = findBeaconById(id);
    return { id, weight: Math.max(1, beacon?.importance ?? 1) };
  });

  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;

  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.id;
  }

  return weighted[0]?.id ?? null;
}

export function selectNextBeacon(
  ids: string[],
  mode: "random" | "weighted" = "random"
) {
  if (!ids.length) return null;
  if (mode === "weighted") return weightedPick(ids);
  return ids[Math.floor(Math.random() * ids.length)] ?? null;
}
