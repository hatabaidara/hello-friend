// Simulated data for the admin dashboard

export type UserRole = "admin" | "moderator" | "user";
export type ArticleStatus = "published" | "draft";

export interface MockMember {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  created_at: string;
  last_active: string;
  avatar_url?: string;
}

export interface MockArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  image_url: string;
  author: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface WeeklyActivity {
  week: string;
  activeMembers: number;
  articleViews: number;
  newMembers: number;
}

export interface MonthlyGrowth {
  month: string;
  members: number;
  articles: number;
  views: number;
}

const cities = ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor", "Kaolack", "Tambacounda", "Kolda", "Matam", "Fatick", "Kaffrine", "Kédougou", "Sédhiou", "Diourbel", "Louga"];
const categories = ["Actualité", "Politique", "Éducation", "Santé", "Économie", "Culture", "Sport", "Environnement"];

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Generate 48 members
export const mockMembers: MockMember[] = Array.from({ length: 48 }, (_, i) => {
  const firstNames = ["Mamadou", "Fatou", "Ousmane", "Aminata", "Ibrahima", "Aïssatou", "Moussa", "Mariama", "Abdoulaye", "Khady", "Cheikh", "Ndèye", "Modou", "Sokhna", "Babacar", "Adama"];
  const lastNames = ["Diallo", "Ndiaye", "Fall", "Sow", "Ba", "Diop", "Sy", "Mbaye", "Kane", "Gueye", "Sarr", "Thiam", "Cissé", "Touré"];
  const roles: UserRole[] = ["user", "user", "user", "user", "moderator", "moderator", "admin"];
  const created = randomDate(new Date("2025-06-01"), new Date("2026-02-15"));
  return {
    id: `member-${i + 1}`,
    full_name: `${randomFrom(firstNames)} ${randomFrom(lastNames)}`,
    email: `user${i + 1}@example.com`,
    phone: `+221 7${Math.floor(Math.random() * 9)}${String(Math.floor(Math.random() * 10000000)).padStart(7, "0")}`,
    city: randomFrom(cities),
    role: randomFrom(roles),
    created_at: created,
    last_active: randomDate(new Date(created), new Date("2026-02-17")),
  };
});

// Generate 32 articles
export const mockArticles: MockArticle[] = Array.from({ length: 32 }, (_, i) => {
  const titles = [
    "Lancement du programme éducatif rural",
    "Visite officielle dans la région de Casamance",
    "Nouvelles mesures pour la jeunesse",
    "Partenariat avec l'Union Africaine",
    "Réforme du système de santé",
    "Initiative pour l'emploi des femmes",
    "Conférence sur le développement durable",
    "Résultats du sondage national",
    "Plan d'investissement infrastructurel",
    "Dialogue social et réconciliation",
    "Forum économique régional",
    "Programme d'alphabétisation numérique",
    "Loi sur la protection de l'environnement",
    "Sommet des leaders ouest-africains",
    "Campagne de vaccination nationale",
    "Inauguration du centre culturel",
  ];
  const created = randomDate(new Date("2025-08-01"), new Date("2026-02-15"));
  return {
    id: `article-${i + 1}`,
    title: `${titles[i % titles.length]}${i >= titles.length ? ` (${Math.ceil((i + 1) / titles.length)})` : ""}`,
    slug: `article-${i + 1}`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    content: "Contenu complet de l'article...",
    category: randomFrom(categories),
    published: Math.random() > 0.35,
    image_url: "",
    author: mockMembers[Math.floor(Math.random() * 5)].full_name,
    views: Math.floor(Math.random() * 2500) + 50,
    created_at: created,
    updated_at: randomDate(new Date(created), new Date("2026-02-17")),
  };
});

// Weekly activity (last 12 weeks)
export const weeklyActivity: WeeklyActivity[] = Array.from({ length: 12 }, (_, i) => {
  const d = new Date("2026-02-17");
  d.setDate(d.getDate() - (11 - i) * 7);
  return {
    week: `S${d.getDate()}/${d.getMonth() + 1}`,
    activeMembers: Math.floor(Math.random() * 25) + 10,
    articleViews: Math.floor(Math.random() * 800) + 200,
    newMembers: Math.floor(Math.random() * 8) + 1,
  };
});

// Monthly growth (last 8 months)
export const monthlyGrowth: MonthlyGrowth[] = (() => {
  const months = ["Jul", "Août", "Sep", "Oct", "Nov", "Déc", "Jan", "Fév"];
  let cumMembers = 12;
  let cumArticles = 5;
  return months.map((m) => {
    cumMembers += Math.floor(Math.random() * 8) + 2;
    cumArticles += Math.floor(Math.random() * 5) + 1;
    return {
      month: m,
      members: cumMembers,
      articles: cumArticles,
      views: Math.floor(Math.random() * 3000) + 500,
    };
  });
})();

// Export helpers
export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) =>
      headers.map((h) => {
        const val = String(row[h] ?? "").replace(/"/g, '""');
        return `"${val}"`;
      }).join(",")
    ),
  ].join("\n");
  downloadFile(csv, `${filename}.csv`, "text/csv");
}

export function exportToJSON(data: Record<string, any>[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  downloadFile(json, `${filename}.json`, "application/json");
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
