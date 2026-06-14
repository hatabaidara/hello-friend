import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, GraduationCap, HeartPulse, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/api";
import { useImages } from "@/hooks/useImages";
import heroImage from "@/assets/hero-mamadou.jpg";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";

const stats = [
  { value: "14", label: "Régions visitées" },
  { value: "50K+", label: "Jeunes formés" },
  { value: "200+", label: "Événements organisés" },
  { value: "100+", label: "Partenaires" },
];

const pillars = [
  {
    icon: GraduationCap,
    title: "Éducation",
    description: "Former la jeunesse sénégalaise aux métiers d'avenir et développer leurs compétences.",
    image: actionEducation,
  },
  {
    icon: Users,
    title: "Emploi des jeunes",
    description: "Créer des opportunités d'emploi et accompagner l'entrepreneuriat des jeunes.",
    image: actionRally,
  },
  {
    icon: HeartPulse,
    title: "Santé",
    description: "Améliorer l'accès aux soins de santé pour tous les citoyens sénégalais.",
    image: actionHealth,
  },
];

const Index = () => {
  const images = useImages();
  const [articles, setArticles] = useState<any[]>([]);
  const dynamicPillars = [
    { ...pillars[0], image: images["action-education"] || actionEducation },
    { ...pillars[1], image: images["action-rally"] || actionRally },
    { ...pillars[2], image: images["action-health"] || actionHealth },
  ];
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/news`).then(r => r.json()).then(d => setArticles(Array.isArray(d) ? d.slice(0, 3) : [])).catch(() => {});
    fetch(`${API_BASE_URL}/api/partners`).then(r => r.json()).then(d => setPartners(Array.isArray(d) ? d.slice(0, 4) : [])).catch(() => {});
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={images["hero"] || heroImage}
            alt="Mamadou Guey"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        {/* Content */}
        <div className="relative z-10 section-container text-center text-primary-foreground pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-accent font-semibold text-lg mb-4 tracking-wider uppercase"
            >
              Génération Original
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              La jeunesse au cœur
              <br />
              <span className="text-accent">du développement</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto"
            >
              Ensemble, construisons un Sénégal où chaque jeune a sa place et contribue 
              à bâtir l'avenir de notre nation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/biographie">
                <Button size="lg" className="btn-primary-gradient rounded-full px-8 py-6 text-lg group">
                  Découvrir Mamadou Guey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/actions">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Nos actions
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center text-primary-foreground/70"
            >
              <span className="text-sm mb-2">Défiler</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-secondary">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-primary font-semibold mb-4 uppercase tracking-wider">À propos</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Un leader engagé pour la{" "}
                <span className="text-primary">jeunesse sénégalaise</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Mamadou Guey, à travers Génération Original, œuvre sans relâche pour 
                l'épanouissement de la jeunesse sénégalaise. Son engagement se traduit 
                par des actions concrètes dans les domaines de l'éducation, de l'emploi 
                et de la santé.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Avec des tournées nationales touchant toutes les régions du Sénégal, 
                il porte un message d'espoir et d'autonomisation pour les jeunes citoyens.
              </p>
              <Link to="/biographie">
                <Button className="btn-primary-gradient rounded-full px-6 group">
                  En savoir plus
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={images["hero"] || heroImage}
                  alt="Mamadou Guey"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Nos piliers</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Les axes de notre engagement
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Trois domaines prioritaires pour construire un Sénégal plus fort et plus prospère.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dynamicPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group card-hover rounded-2xl overflow-hidden bg-card"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <pillar.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/actions">
              <Button className="btn-primary-gradient rounded-full px-8 group">
                Découvrir toutes nos actions
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Actualites Section */}
      {articles.length > 0 && (
        <section className="py-24 bg-secondary">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
              <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Actualites</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Dernieres nouvelles</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {articles.map((a, i) => (
                <motion.div key={a.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-green-100 hover:shadow-md transition-all">
                  <p className="text-xs text-muted-foreground mb-2">{a.datePublication}</p>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2">{a.titre}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">{a.contenu}</p>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to="/actualites"><Button className="btn-primary-gradient rounded-full px-8 group">Voir toutes les actualites <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            </div>
          </div>
        </section>
      )}

      {/* Partenaires Section */}
      {partners.length > 0 && (
        <section className="py-16">
          <div className="section-container">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
              <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Partenaires</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Ils nous font confiance</h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {partners.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-green-100 flex flex-col items-center text-center">
                  {p.logoUrl ? <img src={p.logoUrl} alt={p.nom} className="h-12 object-contain mb-2" /> : <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2"><span className="font-bold text-primary">{p.nom?.substring(0,2).toUpperCase()}</span></div>}
                  <p className="text-sm font-medium text-foreground">{p.nom}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Rejoignez le mouvement
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10">
              Ensemble, donnons à la jeunesse sénégalaise les moyens de construire 
              un avenir prospère. Rejoignez Génération Original et participez au changement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 py-6 text-lg"
                >
                  Nous contacter
                </Button>
              </Link>
              <Link to="/actualites">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="rounded-full px-8 py-6 text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Suivre les actualités
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
