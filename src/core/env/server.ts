export function getRequiredServerEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required server env variable: ${name}`);
  }
  return value;
}
