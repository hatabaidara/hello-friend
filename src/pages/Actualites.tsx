import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";

const fallbackImages: Record<string, string> = {
  "tournees": actionRally,
  "education": actionEducation,
  "sante": actionHealth,
  "actualite": actionRally,
};

const Actualites = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setArticles(data || []);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setIsSubscribing(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: newsletterEmail.trim() });
    if (error) {
      if (error.code === "23505") toast({ title: "Déjà inscrit !" });
      else toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Inscription réussie !", description: "Bienvenue dans notre newsletter." });
      setNewsletterEmail("");
    }
    setIsSubscribing(false);
  };

  const getImage = (article: any) => article.image_url || fallbackImages[article.category?.toLowerCase()] || actionRally;

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground max-w-3xl mx-auto"
          >
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Actualités</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Restez informés
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Suivez nos dernières actualités, événements et communiqués officiels.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <section className="py-24 text-center"><p className="text-muted-foreground">Chargement des articles...</p></section>
      ) : articles.length === 0 ? (
        <section className="py-24 text-center">
          <p className="text-muted-foreground text-lg">Aucun article publié pour le moment.</p>
          <p className="text-muted-foreground mt-2">Revenez bientôt pour découvrir nos actualités.</p>
        </section>
      ) : (
        <>
          {/* Featured Article */}
          <section className="py-16">
            <div className="section-container">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-2 gap-8 items-center"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={getImage(articles[0])} alt={articles[0].title} className="w-full aspect-video object-cover" />
                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    À la une
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {articles[0].category}
                    </span>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(articles[0].created_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}</span>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">{articles[0].title}</h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">{articles[0].excerpt}</p>
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
                    <motion.article
                      key={article.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-2xl overflow-hidden card-hover group"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img src={getImage(article)} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">{article.category}</span>
                          <span className="text-muted-foreground text-xs">{new Date(article.created_at).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2">{article.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Newsletter */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Abonnez-vous à notre newsletter
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Recevez nos dernières actualités et informations directement dans votre boîte mail.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="px-6 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 max-w-md"
              />
              <Button type="submit" disabled={isSubscribing} className="btn-primary-gradient rounded-full px-8 py-4">
                {isSubscribing ? "Inscription..." : "S'abonner"}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Actualites;
