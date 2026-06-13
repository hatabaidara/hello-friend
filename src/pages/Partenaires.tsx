import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Globe, Handshake } from "lucide-react";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/api";

const Partenaires = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/partners`)
      .then(r => r.json())
      .then(data => { setPartners(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground max-w-3xl mx-auto">
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Partenaires</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Nos partenaires</h1>
            <p className="text-xl text-primary-foreground/90">Ensemble, nous construisons un Senegal plus fort grace a des partenariats nationaux et internationaux.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ value: "50+", label: "Partenaires" }, { value: "15", label: "Pays" }, { value: "100+", label: "Projets communs" }, { value: "10M", label: "Investissements" }].map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{stat.value}</p>
                <p className="text-primary-foreground/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Ils nous font confiance</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Des organisations internationales aux institutions nationales, nos partenaires partagent notre vision pour la jeunesse.</p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-20">
              <Handshake className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Aucun partenaire pour le moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div key={partner.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }} viewport={{ once: true }}
                  className="bg-white border border-green-100 p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                  <div className="flex items-center gap-4 mb-5">
                    {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.nom}
                        className="w-16 h-16 rounded-xl object-contain border border-green-100 p-1 bg-white"
                        onError={(e: any) => { e.target.style.display = "none"; }} />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-display font-bold text-primary text-xl">{partner.nom?.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                    <h3 className="font-display text-lg font-semibold text-foreground leading-tight">{partner.nom}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5 flex-1 text-sm line-clamp-4">{partner.description}</p>
                  {partner.siteWeb && (
                    <a href={partner.siteWeb} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all mt-auto border border-primary/20 rounded-full px-4 py-2 hover:bg-primary/5 w-fit">
                      <Globe className="w-4 h-4" /> Visiter le site <ExternalLink className="w-3 h-3" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Devenez partenaire</h2>
            <p className="text-muted-foreground text-lg mb-10">Vous souhaitez contribuer au developpement de la jeunesse senegalaise ? Rejoignez notre reseau de partenaires.</p>
            <a href="/contact" className="inline-flex items-center gap-2 btn-primary-gradient rounded-full px-8 py-4 text-lg font-medium">Nous contacter</a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Partenaires;
