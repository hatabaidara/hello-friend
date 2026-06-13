import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import {
  Users, Newspaper, Handshake, Trash2, Edit, Plus, Save, X,
  BarChart3, TrendingUp, FileText, UserCheck, Download, Shield, Activity,
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { API_BASE_URL } from "@/lib/api";

type Tab = "analytics" | "members" | "articles" | "partners";

const getAuth = () => localStorage.getItem("auth") || "";

const Admin = () => {
  const [tab, setTab] = useState<Tab>("analytics");
  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "analytics", label: "Vue d ensemble", icon: BarChart3 },
    { key: "members", label: "Membres", icon: Users },
    { key: "articles", label: "Articles", icon: Newspaper },
    { key: "partners", label: "Partenaires", icon: Handshake },
  ];
  return (
    <Layout>
      <section className="pt-32 pb-8 hero-gradient">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary-foreground/80" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Dashboard Admin</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {tabs.map((t) => (
              <Button key={t.key} onClick={() => setTab(t.key)}
                className={`rounded-full text-sm ${tab === t.key ? "bg-white text-primary font-bold shadow" : "bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20"}`}>
                <t.icon className="w-4 h-4 mr-2" />{t.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-muted/30 min-h-screen">
        <div className="section-container">
          {tab === "analytics" && <AnalyticsTab />}
          {tab === "members" && <MembersTab />}
          {tab === "articles" && <ArticlesTab />}
          {tab === "partners" && <PartnersTab />}
        </div>
      </section>
    </Layout>
  );
};

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </motion.div>
);

const AnalyticsTab = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/members?size=200`).then(r => r.json()).then(d => setMembers(d.content || []));
    fetch(`${API_BASE_URL}/api/news`).then(r => r.json()).then(setArticles).catch(() => {});
    fetch(`${API_BASE_URL}/api/partners`).then(r => r.json()).then(setPartners).catch(() => {});
  }, []);

  const admins = members.filter(m => m.role === "ADMIN").length;
  const membres = members.filter(m => m.role !== "ADMIN").length;

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" /> Vue d ensemble
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total membres" value={members.length} icon={Users} color="bg-green-100 text-green-700" />
        <StatCard label="Articles" value={articles.length} icon={FileText} color="bg-emerald-100 text-emerald-700" />
        <StatCard label="Partenaires" value={partners.length} icon={Handshake} color="bg-teal-100 text-teal-700" />
        <StatCard label="Administrateurs" value={admins} icon={Shield} color="bg-green-100 text-green-700" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><UserCheck className="w-5 h-5 text-primary" /> Derniers membres</h3>
          <div className="space-y-3">
            {members.slice(0, 5).map((m: any) => (
              <div key={m.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{m.nom}</p>
                  <p className="text-xs text-muted-foreground">{m.email} • {m.ville}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.role === "ADMIN" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{m.role}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Newspaper className="w-5 h-5 text-primary" /> Derniers articles</h3>
          <div className="space-y-3">
            {articles.slice(0, 5).map((a: any) => (
              <div key={a.id} className="flex items-center justify-between">
                <p className="text-sm font-medium truncate max-w-[200px]">{a.titre}</p>
                <p className="text-xs text-muted-foreground">{a.datePublication}</p>
              </div>
            ))}
            {articles.length === 0 && <p className="text-sm text-muted-foreground">Aucun article pour l instant.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const MembersTab = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/members?size=200`).then(r => r.json()).then(d => setMembers(d.content || []));
  }, []);

  const filtered = members.filter(m =>
    m.nom?.toLowerCase().includes(search.toLowerCase()) ||
    m.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce membre ?")) return;
    await fetch(`${API_BASE_URL}/api/members/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Basic " + getAuth() }
    });
    setMembers(members.filter(m => m.id !== id));
    toast({ title: "Membre supprime" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Membres ({filtered.length})</h2>
        <Input placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
        <Table>
          <TableHeader><TableRow className="bg-green-50">
            <TableHead>Nom</TableHead><TableHead>Email</TableHead>
            <TableHead>Ville</TableHead><TableHead>Role</TableHead>
            <TableHead>Inscrit le</TableHead><TableHead>Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map((m: any) => (
              <TableRow key={m.id} className="hover:bg-green-50/50">
                <TableCell className="font-medium">{m.nom}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.ville}</TableCell>
                <TableCell><span className={`text-xs px-2 py-0.5 rounded-full ${m.role === "ADMIN" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{m.role}</span></TableCell>
                <TableCell>{m.createdAt ? new Date(m.createdAt).toLocaleDateString("fr-FR") : "-"}</TableCell>
                <TableCell>
                  {m.role !== "ADMIN" && (
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ArticlesTab = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const load = () => fetch(`${API_BASE_URL}/api/news`).then(r => r.json()).then(setArticles).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? `${API_BASE_URL}/api/news` : `${API_BASE_URL}/api/news/${editing.id}`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: "Basic " + getAuth() },
      body: JSON.stringify({ titre: editing.titre, contenu: editing.contenu, datePublication: editing.datePublication }),
    });
    if (res.ok) { toast({ title: isNew ? "Article cree" : "Article modifie" }); setEditing(null); setIsNew(false); load(); }
    else toast({ title: "Erreur", variant: "destructive" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet article ?")) return;
    await fetch(`${API_BASE_URL}/api/news/${id}`, { method: "DELETE", headers: { Authorization: "Basic " + getAuth() } });
    setArticles(articles.filter(a => a.id !== id));
    toast({ title: "Article supprime" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Articles ({articles.length})</h2>
        <Button onClick={() => { setEditing({ titre: "", contenu: "", datePublication: new Date().toISOString().split("T")[0] }); setIsNew(true); }}
          className="bg-primary text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" /> Nouvel article
        </Button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 mb-6">
          <h3 className="font-semibold mb-4">{isNew ? "Nouvel article" : "Modifier article"}</h3>
          <div className="space-y-4">
            <Input placeholder="Titre" value={editing.titre} onChange={e => setEditing({...editing, titre: e.target.value})} />
            <Textarea placeholder="Contenu" value={editing.contenu} onChange={e => setEditing({...editing, contenu: e.target.value})} rows={5} />
            <Input type="date" value={editing.datePublication} onChange={e => setEditing({...editing, datePublication: e.target.value})} />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-primary text-white rounded-full"><Save className="w-4 h-4 mr-2" /> Sauvegarder</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }} className="rounded-full"><X className="w-4 h-4 mr-2" /> Annuler</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {articles.map((a: any) => (
          <div key={a.id} className="bg-white rounded-xl p-5 shadow-sm border border-green-100 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{a.titre}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{a.contenu}</p>
              <p className="text-xs text-muted-foreground mt-2">{a.datePublication}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Button size="sm" variant="outline" onClick={() => { setEditing(a); setIsNew(false); }} className="rounded-full border-green-200">
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {articles.length === 0 && <p className="text-center text-muted-foreground py-12">Aucun article. Creez-en un !</p>}
      </div>
    </div>
  );
};

const PartnersTab = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);
  const { toast } = useToast();

  const load = () => fetch(`${API_BASE_URL}/api/partners`).then(r => r.json()).then(setPartners).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? `${API_BASE_URL}/api/partners` : `${API_BASE_URL}/api/partners/${editing.id}`;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: "Basic " + getAuth() },
      body: JSON.stringify({ nom: editing.nom, description: editing.description, siteWeb: editing.siteWeb, logoUrl: editing.logoUrl }),
    });
    if (res.ok) { toast({ title: isNew ? "Partenaire cree" : "Partenaire modifie" }); setEditing(null); setIsNew(false); load(); }
    else toast({ title: "Erreur", variant: "destructive" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce partenaire ?")) return;
    await fetch(`${API_BASE_URL}/api/partners/${id}`, { method: "DELETE", headers: { Authorization: "Basic " + getAuth() } });
    setPartners(partners.filter(p => p.id !== id));
    toast({ title: "Partenaire supprime" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Partenaires ({partners.length})</h2>
        <Button onClick={() => { setEditing({ nom: "", description: "", siteWeb: "", logoUrl: "" }); setIsNew(true); }}
          className="bg-primary text-white rounded-full">
          <Plus className="w-4 h-4 mr-2" /> Nouveau partenaire
        </Button>
      </div>

      {editing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-200 mb-6">
          <h3 className="font-semibold mb-4">{isNew ? "Nouveau partenaire" : "Modifier partenaire"}</h3>
          <div className="space-y-4">
            <Input placeholder="Nom du partenaire" value={editing.nom} onChange={e => setEditing({...editing, nom: e.target.value})} />
            <Textarea placeholder="Description" value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} rows={3} />
            <Input placeholder="Site web (https://...)" value={editing.siteWeb} onChange={e => setEditing({...editing, siteWeb: e.target.value})} />
            <Input placeholder="URL du logo" value={editing.logoUrl} onChange={e => setEditing({...editing, logoUrl: e.target.value})} />
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-primary text-white rounded-full"><Save className="w-4 h-4 mr-2" /> Sauvegarder</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }} className="rounded-full"><X className="w-4 h-4 mr-2" /> Annuler</Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((p: any) => (
          <div key={p.id} className="bg-white rounded-xl p-5 shadow-sm border border-green-100">
            {p.logoUrl && <img src={p.logoUrl} alt={p.nom} className="h-12 object-contain mb-3" />}
            <h3 className="font-semibold text-foreground mb-1">{p.nom}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{p.description}</p>
            {p.siteWeb && <a href={p.siteWeb} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">{p.siteWeb}</a>}
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" onClick={() => { setEditing(p); setIsNew(false); }} className="rounded-full border-green-200 flex-1">
                <Edit className="w-4 h-4 mr-1" /> Modifier
              </Button>
              <Button size="sm" variant="ghost" onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
        {partners.length === 0 && <p className="text-center text-muted-foreground py-12 col-span-3">Aucun partenaire. Ajoutez-en un !</p>}
      </div>
    </div>
  );
};

export default Admin;
