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
  Users, Newspaper, Handshake, Mail, Trash2, Edit, Plus, Eye, EyeOff, Save, X
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Tab = "members" | "articles" | "partners" | "newsletter";

const Admin = () => {
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("members");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, authLoading, navigate]);

  if (authLoading) return <Layout><div className="pt-32 pb-20 text-center">Chargement...</div></Layout>;
  if (!isAdmin) return null;

  const tabs: { key: Tab; label: string; icon: any }[] = [
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
          {tab === "members" && <MembersTab />}
          {tab === "articles" && <ArticlesTab />}
          {tab === "partners" && <PartnersTab />}
          {tab === "newsletter" && <NewsletterTab />}
        </div>
      </section>
    </Layout>
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
