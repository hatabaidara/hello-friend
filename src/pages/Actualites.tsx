import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";

const articles = [
  {
    id: 1,
    title: "Lancement de la tournée nationale 2024",
    excerpt: "Génération Original entame sa nouvelle tournée nationale pour former et accompagner les jeunes de toutes les régions du Sénégal.",
    image: actionRally,
    date: "15 Janvier 2024",
    category: "Tournées",
  },
  {
    id: 2,
    title: "Partenariat avec l'UNESCO pour l'éducation",
    excerpt: "Un nouvel accord de partenariat signé avec l'UNESCO pour renforcer les programmes d'éducation et de formation professionnelle.",
    image: actionEducation,
    date: "28 Décembre 2023",
    category: "Partenariats",
  },
  {
    id: 3,
    title: "Caravane santé : 5000 consultations gratuites",
    excerpt: "La caravane santé a permis d'offrir plus de 5000 consultations médicales gratuites dans les zones rurales du Sénégal.",
    image: actionHealth,
    date: "10 Décembre 2023",
    category: "Santé",
  },
  {
    id: 4,
    title: "Formation en entrepreneuriat digital",
    excerpt: "500 jeunes formés aux métiers du numérique lors du programme de formation en entrepreneuriat digital à Dakar.",
    image: actionEducation,
    date: "25 Novembre 2023",
    category: "Formation",
  },
  {
    id: 5,
    title: "Rencontre avec les jeunes de Thiès",
    excerpt: "Mamadou Guey a rencontré plus de 2000 jeunes lors de l'étape de Thiès de la tournée nationale.",
    image: actionRally,
    date: "15 Novembre 2023",
    category: "Tournées",
  },
  {
    id: 6,
    title: "Bilan annuel : 50 000 jeunes accompagnés",
    excerpt: "Génération Original célèbre le cap symbolique de 50 000 jeunes formés et accompagnés vers l'autonomie.",
    image: actionHealth,
    date: "1 Novembre 2023",
    category: "Bilan",
  },
];

const Actualites = () => {
  return (
    <Layout>
      {/* Hero Section */}
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
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full aspect-video object-cover"
              />
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
                  <span>{articles[0].date}</span>
                </div>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {articles[0].title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {articles[0].excerpt}
              </p>
              <Button className="btn-primary-gradient rounded-full group">
                Lire l'article
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Derniers articles
            </h2>
          </motion.div>

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
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {article.category}
                    </span>
                    <span className="text-muted-foreground text-xs">{article.date}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <button className="text-primary font-medium text-sm flex items-center gap-2 group/btn">
                    Lire la suite
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="rounded-full px-8">
              Voir tous les articles
            </Button>
          </div>
        </div>
      </section>

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
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="px-6 py-4 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary flex-1 max-w-md"
              />
              <Button className="btn-primary-gradient rounded-full px-8 py-4">
                S'abonner
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Actualites;
