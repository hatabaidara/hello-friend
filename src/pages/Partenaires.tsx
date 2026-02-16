import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/Layout";

const Partenaires = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data } = await supabase
        .from("partners")
        .select("*")
        .eq("active", true)
        .order("display_order");
      setPartners(data || []);
      setLoading(false);
    };
    fetchPartners();
  }, []);

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
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Partenaires</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nos partenaires
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Ensemble, nous construisons un Sénégal plus fort grâce à des partenariats 
              nationaux et internationaux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "50+", label: "Partenaires" },
              { value: "15", label: "Pays" },
              { value: "100+", label: "Projets communs" },
              { value: "10M€", label: "Investissements" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des organisations internationales aux institutions nationales, 
              nos partenaires partagent notre vision pour la jeunesse.
            </p>
          </motion.div>

          {loading ? (
            <p className="text-center text-muted-foreground">Chargement...</p>
          ) : partners.length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun partenaire pour le moment.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-card p-8 rounded-2xl card-hover group"
                >
                  <div className="flex items-start justify-between mb-6">
                    {partner.logo_url ? (
                      <img src={partner.logo_url} alt={partner.name} className="w-16 h-16 rounded-xl object-contain" />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="font-display font-bold text-primary text-xl">
                          {partner.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {partner.description}
                  </p>
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      <Globe className="w-4 h-4" />
                      Visiter le site
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Devenez partenaire
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Vous souhaitez contribuer au développement de la jeunesse sénégalaise ? 
              Rejoignez notre réseau de partenaires et participez à notre mission.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 btn-primary-gradient rounded-full px-8 py-4 text-lg font-medium"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Partenaires;
