import { findBeaconById } from "./tree";

export function updateBeaconFrequency(id: string) {
  const beacon = findBeaconById(id);
  if (!beacon) return null;

  beacon.f += 1;
  return beacon;
}
