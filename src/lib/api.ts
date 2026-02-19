// Central API configuration
// Prefer VITE_API_BASE_URL (exposed by Vite). If your CI sets API_BASE_URL (without VITE_),
// try to read it via import.meta.env as any (build-time). Fallback to localhost for dev.
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL ?? (import.meta.env as any).API_BASE_URL) || "http://localhost:8081";
