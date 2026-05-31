// Absolute backend origin (e.g. http://localhost:3000 or the onrender URL).
// Used where a full URL is required: the websocket (socket.io) connection and
// resolving backend-hosted image URLs.
export const BACKEND_URL = import.meta.env.VITE_SERVER_URL;

// HTTP API base. Intentionally empty so /api/* requests are same-origin and get
// routed through the Vite dev proxy (see vite.config.ts) / the Vercel rewrite
// (see vercel.json). Keeping them first-party is what makes the auth cookies
// work in every browser, including incognito and Safari (which block
// cross-site/third-party cookies).
const API_BASE = '';

export default API_BASE;
