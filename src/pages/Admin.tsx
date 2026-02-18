import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {
  Users, Newspaper, Handshake, Mail, Trash2, Edit, Plus, Eye, EyeOff, Save, X,
  BarChart3, TrendingUp, FileText, UserCheck, Download, Filter, Activity, Shield, ChevronDown,
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  mockMembers, mockArticles, weeklyActivity, monthlyGrowth,
  exportToCSV, exportToJSON,
  type MockMember, type MockArticle, type UserRole, type ArticleStatus,
} from "@/data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081";

type Tab = "analytics" | "members" | "articles" | "partners" | "newsletter" | "engagement";

const Admin = () => {
  const [tab, setTab] = useState<Tab>("analytics");

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "analytics", label: "Vue d'ensemble", icon: BarChart3 },
    { key: "engagement", label: "Engagement", icon: Activity },
    { key: "members", label: "Membres", icon: Users },
    { key: "articles", label: "Articles", icon: Newspaper },
    { key: "partners", label: "Partenaires", icon: Handshake },
    { key: "newsletter", label: "Newsletter", icon: Mail },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-8 hero-gradient">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary-foreground/80" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
              Administration
            </h1>
          </div>
          <p className="text-primary-foreground/70 mb-6 text-sm">Données simulées + Membres depuis backend</p>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button
                key={t.key}
                variant={tab === t.key ? "default" : "outline"}
                onClick={() => setTab(t.key)}
                className={`rounded-full text-sm ${tab === t.key ? "btn-primary-gradient" : "bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"}`}
              >
                <t.icon className="w-4 h-4 mr-2" />
                {t.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "engagement" && <EngagementTab />}
          {tab === "members" && <MembersTab />}
          {tab === "articles" && <ArticlesTab />}
          {tab === "partners" && <PartnersTab />}
          {tab === "newsletter" && <NewsletterTab />}
        </div>
      </section>
    </Layout>
  );
};

/* ── Analytics Tab ── */
const AnalyticsTab = () => {
  const totalMembers = mockMembers.length;
  const publishedArticles = mockArticles.filter((a) => a.published).length;
  const draftArticles = mockArticles.filter((a) => !a.published).length;
  const totalViews = mockArticles.reduce((s, a) => s + a.views, 0);
  const admins = mockMembers.filter((m) => m.role === "admin").length;
  const moderators = mockMembers.filter((m) => m.role === "moderator").length;

  const cards = [
    { label: "Total membres", value: totalMembers, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Articles publiés", value: publishedArticles, icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Brouillons", value: draftArticles, icon: Edit, color: "bg-muted text-muted-foreground" },
    { label: "Total vues", value: totalViews.toLocaleString("fr-FR"), icon: Eye, color: "bg-accent/20 text-accent-foreground" },
    { label: "Administrateurs", value: admins, icon: Shield, color: "bg-primary/10 text-primary" },
    { label: "Modérateurs", value: moderators, icon: UserCheck, color: "bg-accent/20 text-accent-foreground" },
  ];

  const maxGrowth = Math.max(...monthlyGrowth.map((m) => m.members), 1);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" /> Vue d'ensemble
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl p-5 shadow-sm text-center card-hover"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${c.color}`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Growth chart */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Croissance des membres</h3>
          <div className="flex items-end gap-2 h-44">
            {monthlyGrowth.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-medium text-foreground">{m.members}</span>
                <div
                  className="w-full rounded-t-lg bg-primary/80 transition-all duration-500"
                  style={{ height: `${(m.members / maxGrowth) * 100}%`, minHeight: 4 }}
                />
                <span className="text-[10px] text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Role distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Répartition par rôle</h3>
          <div className="space-y-4 mt-6">
            {(["admin", "moderator", "user"] as UserRole[]).map((role) => {
              const count = mockMembers.filter((m) => m.role === role).length;
              const pct = Math.round((count / totalMembers) * 100);
              const labels: Record<UserRole, string> = { admin: "Administrateurs", moderator: "Modérateurs", user: "Utilisateurs" };
              const colors: Record<UserRole, string> = { admin: "bg-primary", moderator: "bg-accent", user: "bg-muted-foreground/40" };
              return (
                <div key={role}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{labels[role]}</span>
                    <span className="text-muted-foreground">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${colors[role]} transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent members & articles */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" /> Derniers membres
          </h3>
          <div className="space-y-3">
            {mockMembers.slice(0, 5).map((m) => (
              <div key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{m.full_name}</p>
                  <p className="text-xs text-muted-foreground">{m.email} • {m.city}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.role === "admin" ? "bg-primary/10 text-primary" : m.role === "moderator" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-primary" /> Articles populaires
          </h3>
          <div className="space-y-3">
            {[...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${a.published ? "bg-primary" : "bg-muted-foreground"}`} />
                  <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">{a.views} vues</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Engagement Tab ── */
const EngagementTab = () => {
  const maxActive = Math.max(...weeklyActivity.map((w) => w.activeMembers), 1);
  const maxViews = Math.max(...weeklyActivity.map((w) => w.articleViews), 1);

  const avgActive = Math.round(weeklyActivity.reduce((s, w) => s + w.activeMembers, 0) / weeklyActivity.length);
  const avgViews = Math.round(weeklyActivity.reduce((s, w) => s + w.articleViews, 0) / weeklyActivity.length);
  const totalNewMembers = weeklyActivity.reduce((s, w) => s + w.newMembers, 0);

  // Retention rate (simulated)
  const retentionWeeks = weeklyActivity.map((w, i) => ({
    week: w.week,
    rate: Math.min(95, 60 + Math.random() * 30 + (i * 0.5)),
  }));

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" /> Rétention & Engagement
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Membres actifs / semaine (moy.)", value: avgActive, icon: Users },
          { label: "Vues articles / semaine (moy.)", value: avgViews, icon: Eye },
          { label: "Nouveaux membres (12 sem.)", value: totalNewMembers, icon: TrendingUp },
        ].map((c) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{c.label}</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Weekly active members chart */}
      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Membres actifs par semaine</h3>
        <div className="flex items-end gap-1.5 h-48">
          {weeklyActivity.map((w) => (
            <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-foreground">{w.activeMembers}</span>
              <div
                className="w-full rounded-t-lg bg-primary/70 transition-all duration-500"
                style={{ height: `${(w.activeMembers / maxActive) * 100}%`, minHeight: 4 }}
              />
              <span className="text-[9px] text-muted-foreground leading-tight">{w.week}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Article views + Retention side by side */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Vues des articles par semaine</h3>
          <div className="flex items-end gap-1.5 h-40">
            {weeklyActivity.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-foreground">{w.articleViews}</span>
                <div
                  className="w-full rounded-t-lg bg-accent/80 transition-all duration-500"
                  style={{ height: `${(w.articleViews / maxViews) * 100}%`, minHeight: 4 }}
                />
                <span className="text-[9px] text-muted-foreground">{w.week}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Taux de rétention (%)</h3>
          <div className="flex items-end gap-1.5 h-40">
            {retentionWeeks.map((w) => (
              <div key={w.week} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-medium text-foreground">{Math.round(w.rate)}%</span>
                <div
                  className="w-full rounded-t-lg bg-primary/60 transition-all duration-500"
                  style={{ height: `${w.rate}%`, minHeight: 4 }}
                />
                <span className="text-[9px] text-muted-foreground">{w.week}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Members Tab with filters & export ── */
const MembersTab = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("all");
  const [members, setMembers] = useState<typeof mockMembers>([]);
  const { toast } = useToast();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/members?size=200`, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const page = await res.json();
        const content = Array.isArray(page?.content) ? page.content : [];
        const mapped = content.map((m: any) => ({
          id: String(m.id ?? ""),
          full_name: m.nom ?? "",
          email: m.email ?? "",
          phone: m.telephone ?? "",
          city: m.ville ?? "",
          role: (m.role ?? "MEMBRE").toString().toUpperCase() === "ADMIN" ? "admin" : "user",
          created_at: m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString(),
          last_active: m.lastActivityAt ? new Date(m.lastActivityAt).toISOString() : (m.createdAt ? new Date(m.createdAt).toISOString() : new Date().toISOString()),
        }));

        if (!cancelled) {
          setMembers(mapped);
        }
      } catch {
        if (!cancelled) {
          toast({
            title: "Erreur",
            description: "Impossible de charger les membres depuis le backend.",
            variant: "destructive",
          });
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const cities = useMemo(() => [...new Set(members.map((m) => m.city))].filter(Boolean).sort(), [members]);

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (roleFilter !== "all" && m.role !== roleFilter) return false;
      if (cityFilter !== "all" && m.city !== cityFilter) return false;
      if (search && !m.full_name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [members, search, roleFilter, cityFilter]);

  const handleExport = (format: "csv" | "json") => {
    const data = filtered.map(({ id, full_name, email, phone, city, role, created_at }) => ({ id, full_name, email, phone, city, role, created_at }));
    if (format === "csv") exportToCSV(data, "membres");
    else exportToJSON(data, "membres");
    toast({ title: `Export ${format.toUpperCase()} réussi`, description: `${data.length} membres exportés.` });
  };

  const roleLabels: Record<string, string> = { admin: "Admin", moderator: "Modérateur", user: "Utilisateur" };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-display text-2xl font-bold text-foreground">Membres ({filtered.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("csv")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("json")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          placeholder="Rechercher un membre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Modérateur</SelectItem>
            <SelectItem value="user">Utilisateur</SelectItem>
          </SelectContent>
        </Select>
        <Select value={cityFilter} onValueChange={setCityFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Ville" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Inscrit le</TableHead>
              <TableHead>Dernière activité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((m) => (
              <TableRow key={m.id}>
                <TableCell className="font-medium">{m.full_name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone}</TableCell>
                <TableCell>{m.city}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.role === "admin" ? "bg-primary/10 text-primary" : m.role === "moderator" ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {roleLabels[m.role]}
                  </span>
                </TableCell>
                <TableCell>{new Date(m.created_at).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>{new Date(m.last_active).toLocaleDateString("fr-FR")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

/* ── Articles Tab with filters & export ── */
const ArticlesTab = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const categories = useMemo(() => [...new Set(mockArticles.map((a) => a.category))].sort(), []);

  const filtered = useMemo(() => {
    return mockArticles.filter((a) => {
      if (statusFilter === "published" && !a.published) return false;
      if (statusFilter === "draft" && a.published) return false;
      if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
      if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, statusFilter, categoryFilter]);

  const handleExport = (format: "csv" | "json") => {
    const data = filtered.map(({ id, title, category, published, author, views, created_at }) => ({
      id, title, category, statut: published ? "Publié" : "Brouillon", author, views, created_at,
    }));
    if (format === "csv") exportToCSV(data, "articles");
    else exportToJSON(data, "articles");
    toast({ title: `Export ${format.toUpperCase()} réussi`, description: `${data.length} articles exportés.` });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="font-display text-2xl font-bold text-foreground">Articles ({filtered.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("csv")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("json")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="published">Publiés</SelectItem>
            <SelectItem value="draft">Brouillons</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes catégories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2 h-2 rounded-full ${a.published ? "bg-primary" : "bg-muted-foreground"}`} />
                <h3 className="font-semibold text-foreground truncate">{a.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {a.category} • {a.author} • {a.views} vues • {new Date(a.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${a.published ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              {a.published ? "Publié" : "Brouillon"}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ── Partners Tab (mock) ── */
const mockPartners = [
  { id: "p1", name: "Fondation Éducation Pour Tous", description: "Partenaire stratégique pour les programmes éducatifs.", website: "https://example.com", active: true },
  { id: "p2", name: "ONG Santé Communautaire", description: "Collaboration sur les initiatives de santé rurale.", website: "https://example.com", active: true },
  { id: "p3", name: "Alliance Jeunesse Africaine", description: "Réseau de soutien pour l'emploi des jeunes.", website: "https://example.com", active: true },
  { id: "p4", name: "Institut de Développement Durable", description: "Partenariat pour les projets environnementaux.", website: "https://example.com", active: false },
];

const PartnersTab = () => (
  <div>
    <h2 className="font-display text-2xl font-bold text-foreground mb-6">Partenaires ({mockPartners.length})</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockPartners.map((p) => (
        <div key={p.id} className="bg-card p-6 rounded-xl shadow-sm card-hover">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground">{p.name}</h3>
            <span className={`w-2.5 h-2.5 rounded-full ${p.active ? "bg-primary" : "bg-muted-foreground"}`} />
          </div>
          <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full ${p.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
            {p.active ? "Actif" : "Inactif"}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* ── Newsletter Tab (mock) ── */
const mockSubscribers = Array.from({ length: 18 }, (_, i) => ({
  id: `sub-${i}`,
  email: `subscriber${i + 1}@example.com`,
  subscribed_at: new Date(2025, 6 + Math.floor(i / 3), 1 + i * 2).toISOString(),
  active: Math.random() > 0.15,
}));

const NewsletterTab = () => {
  const { toast } = useToast();

  const handleExport = (format: "csv" | "json") => {
    const data = mockSubscribers.map(({ email, subscribed_at, active }) => ({ email, subscribed_at, active: active ? "Oui" : "Non" }));
    if (format === "csv") exportToCSV(data, "newsletter");
    else exportToJSON(data, "newsletter");
    toast({ title: `Export ${format.toUpperCase()} réussi` });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Abonnés newsletter ({mockSubscribers.length})</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => handleExport("csv")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleExport("json")} className="rounded-full">
            <Download className="w-4 h-4 mr-1" /> JSON
          </Button>
        </div>
      </div>
      <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Inscrit le</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSubscribers.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.email}</TableCell>
                <TableCell>{new Date(s.subscribed_at).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${s.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {s.active ? "Actif" : "Désabonné"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
