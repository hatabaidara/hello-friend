import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {
  Users, Newspaper, Handshake, Mail, Trash2, Edit, Plus, Eye, EyeOff, Save, X, BarChart3, TrendingUp, FileText, UserCheck
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Tab = "analytics" | "members" | "articles" | "partners" | "newsletter";

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("analytics");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) return <Layout><div className="pt-32 pb-20 text-center">Chargement...</div></Layout>;
  if (!isAdmin) return null;

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "analytics", label: "Tableau de bord", icon: BarChart3 },
    { key: "members", label: "Membres", icon: Users },
    { key: "articles", label: "Articles", icon: Newspaper },
    { key: "partners", label: "Partenaires", icon: Handshake },
    { key: "newsletter", label: "Newsletter", icon: Mail },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-8 hero-gradient">
        <div className="section-container">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Administration
          </h1>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button
                key={t.key}
                variant={tab === t.key ? "default" : "outline"}
                onClick={() => setTab(t.key)}
                className={`rounded-full ${tab === t.key ? "btn-primary-gradient" : "bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20"}`}
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
          {tab === "members" && <MembersTab />}
          {tab === "articles" && <ArticlesTab />}
          {tab === "partners" && <PartnersTab />}
          {tab === "newsletter" && <NewsletterTab />}
        </div>
      </section>
    </Layout>
  );
};

// Analytics Tab
const AnalyticsTab = () => {
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalArticles: 0,
    publishedArticles: 0,
    draftArticles: 0,
    totalPartners: 0,
    totalSubscribers: 0,
    recentMembers: [] as any[],
    recentArticles: [] as any[],
    membersByMonth: [] as { month: string; count: number }[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      const [membersRes, articlesRes, partnersRes, subscribersRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("articles").select("*").order("created_at", { ascending: false }),
        supabase.from("partners").select("id", { count: "exact" }),
        supabase.from("newsletter_subscribers").select("id", { count: "exact" }),
      ]);

      const members = membersRes.data || [];
      const articles = articlesRes.data || [];

      // Group members by month
      const monthMap = new Map<string, number>();
      members.forEach((m) => {
        const d = new Date(m.created_at);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        monthMap.set(key, (monthMap.get(key) || 0) + 1);
      });
      const membersByMonth = Array.from(monthMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-6)
        .map(([month, count]) => {
          const [y, m] = month.split("-");
          const label = new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
          return { month: label, count };
        });

      setStats({
        totalMembers: members.length,
        totalArticles: articles.length,
        publishedArticles: articles.filter((a) => a.published).length,
        draftArticles: articles.filter((a) => !a.published).length,
        totalPartners: partnersRes.count || 0,
        totalSubscribers: subscribersRes.count || 0,
        recentMembers: members.slice(0, 5),
        recentArticles: articles.slice(0, 5),
        membersByMonth,
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;

  const cards = [
    { label: "Membres", value: stats.totalMembers, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Articles publiés", value: stats.publishedArticles, icon: FileText, color: "bg-accent/10 text-accent-foreground" },
    { label: "Brouillons", value: stats.draftArticles, icon: Edit, color: "bg-muted text-muted-foreground" },
    { label: "Partenaires", value: stats.totalPartners, icon: Handshake, color: "bg-primary/10 text-primary" },
    { label: "Abonnés newsletter", value: stats.totalSubscribers, icon: Mail, color: "bg-accent/10 text-accent-foreground" },
    { label: "Total articles", value: stats.totalArticles, icon: Newspaper, color: "bg-muted text-muted-foreground" },
  ];

  // Simple bar chart
  const maxCount = Math.max(...stats.membersByMonth.map((m) => m.count), 1);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" /> Vue d'ensemble
      </h2>

      {/* Metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-2xl p-5 shadow-sm text-center">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${c.color}`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-foreground">{c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Members chart + Recent activity */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">Inscriptions récentes</h3>
          {stats.membersByMonth.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aucune donnée disponible</p>
          ) : (
            <div className="flex items-end gap-2 h-40">
              {stats.membersByMonth.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-foreground">{m.count}</span>
                  <div
                    className="w-full rounded-t-lg bg-primary/80 transition-all duration-500"
                    style={{ height: `${(m.count / maxCount) * 100}%`, minHeight: 4 }}
                  />
                  <span className="text-[10px] text-muted-foreground">{m.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent members */}
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" /> Derniers membres
          </h3>
          <div className="space-y-3">
            {stats.recentMembers.map((m) => (
              <div key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{m.full_name || "Sans nom"}</p>
                  <p className="text-xs text-muted-foreground">{m.email}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleDateString("fr-FR")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent articles */}
      <div className="bg-card rounded-2xl p-6 shadow-sm">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5 text-primary" /> Derniers articles
        </h3>
        <div className="space-y-3">
          {stats.recentArticles.map((a) => (
            <div key={a.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${a.published ? "bg-primary" : "bg-muted-foreground"}`} />
                <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                {new Date(a.created_at).toLocaleDateString("fr-FR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Members Tab
const MembersTab = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMembers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else setMembers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchMembers(); }, []);

  const deleteMember = async (userId: string) => {
    const { error } = await supabase.from("profiles").delete().eq("user_id", userId);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Membre supprimé" }); fetchMembers(); }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Gestion des membres ({members.length})</h2>
      {loading ? <p>Chargement...</p> : (
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Ville</TableHead>
                <TableHead>Inscrit le</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.full_name || "—"}</TableCell>
                  <TableCell>{m.email}</TableCell>
                  <TableCell>{m.phone || "—"}</TableCell>
                  <TableCell>{m.city || "—"}</TableCell>
                  <TableCell>{new Date(m.created_at).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteMember(m.user_id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

// Articles Tab
const ArticlesTab = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "", image_url: "", category: "actualite", published: false });
  const { toast } = useToast();

  const fetchArticles = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else setArticles(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const resetForm = () => {
    setForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", category: "actualite", published: false });
    setEditing(null);
  };

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    const slug = form.slug || generateSlug(form.title);
    const payload = { ...form, slug };

    if (editing) {
      const { error } = await supabase.from("articles").update(payload).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article mis à jour" });
    } else {
      const { error } = await supabase.from("articles").insert(payload);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Article créé" });
    }
    resetForm();
    fetchArticles();
  };

  const deleteArticle = async (id: string) => {
    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Article supprimé" }); fetchArticles(); }
  };

  const editArticle = (a: any) => {
    setEditing(a);
    setForm({ title: a.title, slug: a.slug, excerpt: a.excerpt || "", content: a.content || "", image_url: a.image_url || "", category: a.category || "actualite", published: a.published });
  };

  const togglePublish = async (a: any) => {
    await supabase.from("articles").update({ published: !a.published }).eq("id", a.id);
    fetchArticles();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Articles ({articles.length})</h2>
        {!editing && (
          <Button onClick={() => setEditing({})} className="btn-primary-gradient rounded-full">
            <Plus className="w-4 h-4 mr-2" />Nouvel article
          </Button>
        )}
      </div>

      {editing !== null && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-6 rounded-2xl shadow-sm mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg font-semibold">{editing?.id ? "Modifier" : "Nouvel"} article</h3>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <Input placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <Input placeholder="Catégorie" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input placeholder="URL image" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <Textarea placeholder="Extrait" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
          <Textarea placeholder="Contenu de l'article" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="rounded" />
              Publié
            </label>
            <Button onClick={handleSave} className="btn-primary-gradient rounded-full">
              <Save className="w-4 h-4 mr-2" />Enregistrer
            </Button>
          </div>
        </motion.div>
      )}

      {loading ? <p>Chargement...</p> : (
        <div className="space-y-4">
          {articles.map((a) => (
            <div key={a.id} className="bg-card p-4 rounded-xl shadow-sm flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${a.published ? "bg-primary" : "bg-muted-foreground"}`} />
                  <h3 className="font-semibold text-foreground truncate">{a.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{a.category} • {new Date(a.created_at).toLocaleDateString("fr-FR")}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublish(a)} title={a.published ? "Dépublier" : "Publier"}>
                  {a.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => editArticle(a)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteArticle(a.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Partners Tab
const PartnersTab = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", description: "", logo_url: "", website_url: "", display_order: 0 });
  const { toast } = useToast();

  const fetchPartners = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("partners").select("*").order("display_order");
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else setPartners(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPartners(); }, []);

  const resetForm = () => { setForm({ name: "", description: "", logo_url: "", website_url: "", display_order: 0 }); setEditing(null); };

  const handleSave = async () => {
    if (editing?.id) {
      const { error } = await supabase.from("partners").update(form).eq("id", editing.id);
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Partenaire mis à jour" });
    } else {
      const { error } = await supabase.from("partners").insert({ ...form, active: true });
      if (error) { toast({ title: "Erreur", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Partenaire ajouté" });
    }
    resetForm();
    fetchPartners();
  };

  const deletePartner = async (id: string) => {
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Partenaire supprimé" }); fetchPartners(); }
  };

  const editPartner = (p: any) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || "", logo_url: p.logo_url || "", website_url: p.website_url || "", display_order: p.display_order || 0 });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Partenaires ({partners.length})</h2>
        {!editing && (
          <Button onClick={() => setEditing({})} className="btn-primary-gradient rounded-full">
            <Plus className="w-4 h-4 mr-2" />Nouveau partenaire
          </Button>
        )}
      </div>

      {editing !== null && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-card p-6 rounded-2xl shadow-sm mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-lg font-semibold">{editing?.id ? "Modifier" : "Nouveau"} partenaire</h3>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <Input placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
          <Input placeholder="URL du logo" value={form.logo_url} onChange={(e) => setForm({ ...form, logo_url: e.target.value })} />
          <Input placeholder="URL du site web" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
          <Input type="number" placeholder="Ordre d'affichage" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} />
          <Button onClick={handleSave} className="btn-primary-gradient rounded-full"><Save className="w-4 h-4 mr-2" />Enregistrer</Button>
        </motion.div>
      )}

      {loading ? <p>Chargement...</p> : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p) => (
            <div key={p.id} className="bg-card p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{p.description}</p>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={() => editPartner(p)}><Edit className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deletePartner(p.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Newsletter Tab
const NewsletterTab = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSubscribers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("newsletter_subscribers").select("*").order("subscribed_at", { ascending: false });
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else setSubscribers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchSubscribers(); }, []);

  const deleteSubscriber = async (id: string) => {
    const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id);
    if (error) toast({ title: "Erreur", description: error.message, variant: "destructive" });
    else { toast({ title: "Abonné supprimé" }); fetchSubscribers(); }
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-6">Abonnés newsletter ({subscribers.length})</h2>
      {loading ? <p>Chargement...</p> : (
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Date d'inscription</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscribers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{new Date(s.subscribed_at).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteSubscriber(s.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Admin;
