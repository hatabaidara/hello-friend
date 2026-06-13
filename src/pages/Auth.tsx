import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { LogIn, UserPlus, Mail, Lock, User, Phone, MapPin } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const credentials = btoa(form.email + ":" + form.password);
        const res = await fetch(`${API_BASE_URL}/api/members/${encodeURIComponent(form.email)}`, {
          headers: { Authorization: "Basic " + credentials },
        });
        if (!res.ok) throw new Error("Email ou mot de passe incorrect");
        const user = await res.json();
        localStorage.setItem("auth", credentials);
        localStorage.setItem("user", JSON.stringify(user));
        toast({ title: "Connexion reussie !" });
        if (user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        const res = await fetch(`${API_BASE_URL}/api/members/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nom: form.full_name,
            email: form.email,
            telephone: form.phone,
            ville: form.city,
            motDePasse: form.password,
          }),
        });
        if (!res.ok) throw new Error("Inscription echouee");
        toast({ title: "Inscription reussie !", description: "Vous pouvez maintenant vous connecter." });
        setIsLogin(true);
      }
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

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
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">
              {isLogin ? "Connexion" : "Inscription"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {isLogin ? "Bienvenue" : "Rejoignez-nous"}
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="section-container max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User className="w-4 h-4 inline mr-2" />Nom complet *
                    </label>
                    <Input name="full_name" value={form.full_name} onChange={handleChange} required placeholder="Votre nom complet" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />Telephone
                    </label>
                    <Input name="phone" value={form.phone} onChange={handleChange} placeholder="+221 XX XXX XX XX" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />Ville
                    </label>
                    <Input name="city" value={form.city} onChange={handleChange} placeholder="Votre ville" className="rounded-lg" />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />Email *
                </label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com" className="rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />Mot de passe *
                </label>
                <Input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="••••••••" className="rounded-lg" />
              </div>
              <Button type="submit" disabled={isLoading} className="btn-primary-gradient rounded-full w-full py-6 text-lg">
                {isLoading ? "Chargement..." : isLogin ? (
                  <><LogIn className="w-5 h-5 mr-2" />Se connecter</>
                ) : (
                  <><UserPlus className="w-5 h-5 mr-2" />S inscrire</>
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
                {isLogin ? "Pas encore membre ? S inscrire" : "Deja membre ? Se connecter"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
