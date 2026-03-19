import { principles } from "./principles";

export function findPrincipleById(id: string) {
  return principles.find((p) => p.id === id) ?? null;
}
