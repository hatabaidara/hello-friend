import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import actionRally from "@/assets/action-rally.jpg";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news/${id}`)
      .then(r => r.json())
      .then(data => { setArticle(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <Layout>
      <div className="pt-32 flex justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </Layout>
  );

  if (!article) return (
    <Layout>
      <div className="pt-32 text-center">
        <p className="text-muted-foreground text-lg">Article introuvable.</p>
        <Link to="/actualites"><Button className="mt-4 rounded-full">Retour aux actualites</Button></Link>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-primary-foreground">
            <Link to="/actualites" className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux actualites
            </Link>
            <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>{article.datePublication ? new Date(article.datePublication).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold">{article.titre}</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={article.imageUrl || actionRally} alt={article.titre} className="w-full aspect-video object-cover" />
            </div>
            <div className="prose prose-lg max-w-none">
              {article.contenu.split("\n").map((para: string, i: number) => (
                para.trim() && <p key={i} className="text-foreground leading-relaxed mb-4">{para}</p>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-border">
              <Link to="/actualites">
                <Button variant="outline" className="rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux actualites
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetail;
