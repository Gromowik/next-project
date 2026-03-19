import { findBeaconById } from "./tree";

export function updateBeaconImportance(id: string, importance: number) {
  const beacon = findBeaconById(id);
  if (!beacon) return null;

  beacon.importance = Math.max(1, Math.min(10, importance));
  return beacon;
}
