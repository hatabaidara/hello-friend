import { motion } from "framer-motion";
import { useImages } from "@/hooks/useImages";
import { GraduationCap, Users, HeartPulse, Award, Globe, Target } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-mamadou.jpg";

const values = [
  {
    icon: Target,
    title: "Vision",
    description: "Un Sénégal où chaque jeune a accès à l'éducation et à l'emploi.",
  },
  {
    icon: Award,
    title: "Intégrité",
    description: "Des actions transparentes et un engagement sans faille.",
  },
  {
    icon: Globe,
    title: "Ouverture",
    description: "Une coopération internationale pour le développement local.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "Création de Génération Original",
    description: "Lancement du mouvement pour la jeunesse sénégalaise.",
  },
  {
    year: "2017",
    title: "Premières tournées nationales",
    description: "Début des formations et rencontres dans toutes les régions.",
  },
  {
    year: "2020",
    title: "Partenariats internationaux",
    description: "Collaboration avec des organisations internationales pour l'éducation.",
  },
  {
    year: "2023",
    title: "50 000 jeunes formés",
    description: "Cap symbolique de jeunes accompagnés vers l'autonomie.",
  },
];

const Biographie = () => {
  const images = useImages();
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Biographie</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Mamadou Guey
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Leader politique engagé et fondateur de Génération Original, Mamadou Guey 
                consacre sa vie à l'émancipation de la jeunesse sénégalaise. Son parcours 
                est marqué par un engagement constant pour l'éducation, l'emploi des jeunes 
                et la santé des citoyens.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Originaire du Sénégal, il a su mobiliser des milliers de jeunes à travers 
                le pays, organisant des tournées nationales pour former et autonomiser 
                les citoyens de demain.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={images["biographie"] || heroImage}
                  alt="Mamadou Guey"
                  className="w-full aspect-[4/5] object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <p className="font-display text-3xl font-bold">10+</p>
                <p className="text-sm">Années d'engagement</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Valeurs</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Les principes qui guident notre action
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-card card-hover"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-24 bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Engagement</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Trois piliers pour le développement
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-hover"
            >
              <GraduationCap className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Éducation et Formation
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Promouvoir l'accès à une éducation de qualité et à des formations 
                professionnelles adaptées aux besoins du marché du travail sénégalais.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-hover"
            >
              <Users className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Emploi des Jeunes
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Créer des opportunités d'emploi et encourager l'entrepreneuriat 
                pour permettre à chaque jeune de contribuer à l'économie nationale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-2xl card-hover"
            >
              <HeartPulse className="w-12 h-12 text-primary mb-6" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                Santé et Bien-être
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Améliorer l'accès aux soins de santé pour tous les citoyens, 
                avec un focus particulier sur les zones rurales et les populations vulnérables.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-primary font-semibold mb-4 uppercase tracking-wider">Parcours</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Les étapes clés
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="font-display text-2xl font-bold text-primary">{item.year}</span>
                </div>
                <div className="relative flex-grow pl-6 border-l-2 border-primary/20 pb-8 last:pb-0">
                  <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-primary" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 hero-gradient">
        <div className="section-container">
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-foreground leading-relaxed mb-8">
              "La jeunesse sénégalaise est notre plus grande richesse. 
              C'est en investissant dans elle que nous construirons 
              le Sénégal de demain."
            </p>
            <footer className="text-primary-foreground/80">
              <cite className="not-italic font-semibold">— Mamadou Guey</cite>
            </footer>
          </motion.blockquote>
        </div>
      </section>
    </Layout>
  );
};

export default Biographie;
