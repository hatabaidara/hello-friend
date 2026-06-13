import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/api";
import actionRally from "@/assets/action-rally.jpg";

const Actualites = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`)
      .then(r => r.json())
      .then(data => { setArticles(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribing(true);
    toast({ title: "Inscription reussie !", description: "Bienvenue dans notre newsletter." });
    setNewsletterEmail("");
    setIsSubscribing(false);
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground max-w-3xl mx-auto">
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Actualites</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Restez informes</h1>
            <p className="text-xl text-primary-foreground/90">Suivez nos dernieres actualites, evenements et communiques officiels.</p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <section className="py-24">
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </section>
      ) : articles.length === 0 ? (
        <section className="py-24 text-center">
          <Newspaper className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Aucun article publie pour le moment.</p>
          <p className="text-muted-foreground mt-2">Revenez bientot pour decouvrir nos actualites.</p>
        </section>
      ) : (
        <>
          <section className="py-16">
            <div className="section-container">
              <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={actionRally} alt={articles[0].titre} className="w-full aspect-video object-cover" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">A la une</div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{articles[0].datePublication ? new Date(articles[0].datePublication).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{articles[0].titre}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6 line-clamp-4">{articles[0].contenu}</p>
                </div>
              </motion.article>
            </div>
          </section>

          {articles.length > 1 && (
            <section className="py-16 bg-secondary">
              <div className="section-container">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-12">Derniers articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {articles.slice(1).map((article, index) => (
                    <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }} viewport={{ once: true }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-green-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                      <div className="aspect-video overflow-hidden bg-green-50 flex items-center justify-center">
                        <Newspaper className="w-12 h-12 text-green-200" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3 text-muted-foreground text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{article.datePublication ? new Date(article.datePublication).toLocaleDateString("fr-FR") : ""}</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2">{article.titre}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.contenu}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="py-24">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Abonnez-vous a notre newsletter</h2>
            <p className="text-muted-foreground text-lg mb-8">Recevez nos dernieres actualites directement dans votre boite mail.</p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email" required
                className="px-6 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 max-w-md" />
              <Button type="submit" disabled={isSubscribing} className="btn-primary-gradient rounded-full px-8 py-4">
                {isSubscribing ? "Inscription..." : "S abonner"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Actualites;
