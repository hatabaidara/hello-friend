// Central API configuration
// Priority order (most desirable first):
// 1. runtime override injected by the hosting platform: window.__ENV?.VITE_API_BASE_URL or window.__ENV?.API_BASE_URL or window.__API_BASE_URL
// 2. Vite build-time variable: import.meta.env.VITE_API_BASE_URL
// 3. build-time fallback if your CI injects API_BASE_URL without VITE_ (not recommended): (import.meta.env as any).API_BASE_URL
// 4. final fallback: localhost (development)

declare global {
  interface Window { __ENV?: Record<string,string>; __API_BASE_URL?: string }
}

export const API_BASE_URL: string = (
  // runtime overrides (useful if server injects a script to set window.__ENV or window.__API_BASE_URL)
  (typeof window !== 'undefined' && (
    // prefer explicit VITE_ runtime key, then generic API_BASE_URL
    window.__ENV?.VITE_API_BASE_URL || window.__ENV?.API_BASE_URL || window.__API_BASE_URL
  )) ||
  // build-time Vite variable (recommended for static builds on Render)
  (import.meta.env.VITE_API_BASE_URL ?? (import.meta.env as any).API_BASE_URL) ||
  // fallback for local dev
  "http://localhost:8081"
);
