import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const Confidentialite = () => {
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
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Politique de confidentialité
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Protection de vos données personnelles
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container max-w-3xl mx-auto prose prose-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">1. Collecte des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous collectons les données personnelles que vous nous fournissez volontairement lors de votre inscription ou via notre formulaire de contact : nom, adresse email, numéro de téléphone et ville. Ces données sont nécessaires pour vous offrir nos services et vous tenir informé de nos actions.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">2. Utilisation des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vos données personnelles sont utilisées exclusivement pour : gérer votre adhésion, vous envoyer des informations sur nos activités et événements, répondre à vos demandes de contact, et améliorer nos services. Elles ne sont jamais vendues ni partagées à des tiers sans votre consentement.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">3. Sécurité des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction. Vos données sont stockées de manière sécurisée avec chiffrement.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">4. Vos droits</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conformément à la loi sénégalaise sur la protection des données personnelles, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition concernant vos données. Pour exercer ces droits, contactez-nous à : contact@generation-original.sn
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Ce site utilise des cookies strictement nécessaires au fonctionnement du site. Aucun cookie de traçage publicitaire n'est utilisé.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">6. Newsletter</h2>
              <p className="text-muted-foreground leading-relaxed">
                En vous inscrivant à notre newsletter, vous consentez à recevoir nos communications par email. Vous pouvez vous désabonner à tout moment en nous contactant.
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">7. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Pour toute question relative à notre politique de confidentialité, vous pouvez nous contacter à : contact@generation-original.sn ou via notre formulaire de contact.
              </p>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Confidentialite;
