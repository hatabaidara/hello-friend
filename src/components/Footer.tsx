import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const quickLinks = [
  { name: "Accueil", path: "/" },
  { name: "Biographie", path: "/biographie" },
  { name: "Actions", path: "/actions" },
  { name: "Galerie", path: "/galerie" },
  { name: "Actualités", path: "/actualites" },
  { name: "Contact", path: "/contact" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("newsletter_subscribers").insert({ email: email.trim() });
    if (error) {
      if (error.code === "23505") {
        toast({ title: "Déjà inscrit", description: "Cet email est déjà abonné à notre newsletter." });
      } else {
        toast({ title: "Erreur", description: error.message, variant: "destructive" });
      }
    } else {
      toast({ title: "Inscription réussie !", description: "Bienvenue dans notre newsletter." });
      setEmail("");
    }
    setIsSubmitting(false);
  };

  return (
    <footer className="bg-primary-dark text-primary-foreground">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#16a34a] font-display font-bold text-2xl">GOC</span>
              <div>
                <p className="font-display font-semibold text-lg leading-tight">Génération</p>
                <p className="font-display font-bold leading-tight text-accent">Original</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              La jeunesse au cœur du développement. Ensemble, construisons le Sénégal de demain.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors link-underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80">Dakar, Sénégal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">+221 77 378 65 13</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="text-primary-foreground/80">contact@generation-original.sn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-primary-foreground/80 mb-4">
              Restez informé de nos actions et événements.
            </p>
            <form onSubmit={handleNewsletter} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
                className="px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Inscription..." : "S'abonner"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="section-container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Génération Original. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/confidentialite" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
