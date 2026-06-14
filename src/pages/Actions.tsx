import { motion } from "framer-motion";
import { useImages } from "@/hooks/useImages";
import { MapPin, Calendar, Users, ArrowRight, MessageCircle, TrendingUp, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import Commentaires from "@/components/Commentaires";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";

const actions = [
  {
    id: 1,
    title: "Tournée nationale 2024",
    description: "Rencontres citoyennes et formations dans les 14 régions du Sénégal pour autonomiser la jeunesse.",
    image: actionRally,
    date: "Janvier - Décembre 2024",
    location: "Tout le Sénégal",
    participants: "15 000+",
  },
  {
    id: 2,
    title: "Programme de formation professionnelle",
    description: "Formation aux métiers du numérique, de l'agriculture et de l'artisanat pour les jeunes diplômés.",
    image: actionEducation,
    date: "Toute l'année",
    location: "Dakar, Thiès, Saint-Louis",
    participants: "5 000+",
  },
  {
    id: 3,
    title: "Caravane santé",
    description: "Consultations médicales gratuites et sensibilisation à la santé dans les zones rurales.",
    image: actionHealth,
    date: "Mars - Juin 2024",
    location: "Zones rurales",
    participants: "10 000+",
  },
];

const impacts = [
  { value: "14", label: "Régions couvertes" },
  { value: "50K+", label: "Jeunes formés" },
  { value: "200+", label: "Villages visités" },
  { value: "500+", label: "Formations dispensées" },
];

const Actions = () => {
  const images = useImages();
  const actionsWithImages = [
    { ...actions[0], image: images["action-rally"] || actionRally },
    { ...actions[1], image: images["action-education"] || actionEducation },
    { ...actions[2], image: images["action-health"] || actionHealth },
  ];
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
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Nos Actions</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Agir pour transformer
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Découvrez nos actions concrètes pour l'autonomisation de la jeunesse 
              sénégalaise et le développement de notre nation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impacts.map((stat, index) => (
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

      {/* Actions List */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Programmes</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Nos programmes phares
            </h2>
          </motion.div>

          <div className="space-y-12">
            {actionsWithImages.map((action, index) => (
              <motion.article
                key={action.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="relative rounded-2xl overflow-hidden">
                    <img
                      src={action.image}
                      alt={action.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    {action.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {action.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{action.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{action.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5 text-primary" />
                      <span>{action.participants} participants</span>
                    </div>
                  </div>

                  <Button className="btn-primary-gradient rounded-full group">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Témoignages</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Ils témoignent
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Fatou Diallo",
                role: "Entrepreneure, Dakar",
                quote: "Grâce aux formations de Génération Original, j'ai pu lancer ma propre entreprise.",
              },
              {
                name: "Moussa Ndiaye",
                role: "Étudiant, Thiès",
                quote: "Les tournées m'ont donné espoir et les outils pour construire mon avenir.",
              },
              {
                name: "Aminata Fall",
                role: "Agricultrice, Kaolack",
                quote: "Le programme de formation agricole a transformé ma façon de travailler.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-card p-8 rounded-2xl card-hover"
              >
                <p className="text-foreground text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Travail Politique Détaillé */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Notre Travail Politique au Quotidien
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Des actions concrètes pour un Sénégal meilleur, basées sur l'écoute, 
              la transparence et l'engagement citoyen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Target className="h-8 w-8" />,
                title: "Mission",
                description: "Servir les citoyens avec intégrité et dévouement",
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Résultats",
                description: "50K+ jeunes formés, 200+ villages impactés",
                color: "text-green-600", 
                bgColor: "bg-green-100"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Engagement",
                description: "Présent sur le terrain 365 jours par an",
                color: "text-primary",
                bgColor: "bg-primary/10"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Inclusion",
                description: "Toutes les régions, toutes les communautés",
                color: "text-emerald-600",
                bgColor: "bg-emerald-100"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <div className={item.color}>{item.icon}</div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100">
            <h3 className="text-2xl font-bold mb-6 text-center">Nos Axes d'Action Prioritaires</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Éducation et Formation",
                  description: "Programmes d'alphabétisation, formations professionnelles, bourses d'études",
                  progress: 85
                },
                {
                  title: "Santé et Bien-être",
                  description: "Caravanes médicales, accès aux soins, prévention et sensibilisation",
                  progress: 75
                },
                {
                  title: "Développement Économique",
                  description: "Soutien aux PME, création d'emplois, formation entrepreneuriale",
                  progress: 70
                },
                {
                  title: "Infrastructure Locale",
                  description: "Adduction d'eau, routes, électricité, équipements publics",
                  progress: 60
                }
              ].map((axe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="p-6 border border-green-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold mb-2">{axe.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{axe.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${axe.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-primary h-2 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{axe.progress}% réalisé</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Commentaires */}
      <section className="py-20">
        <Commentaires />
      </section>

      {/* CTA */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Participez à nos actions
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10">
              Vous souhaitez participer à nos programmes ou organiser un événement 
              dans votre région ? Contactez-nous.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8"
              >
                Nous contacter
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Actions;
