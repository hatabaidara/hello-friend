import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { LogIn, UserPlus, Mail, Lock, User, Phone, MapPin } from "lucide-react";

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
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        toast({ title: "Connexion réussie !" });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: form.full_name,
              phone: form.phone,
              city: form.city,
            },
          },
        });
        if (error) throw error;
        toast({
          title: "Inscription réussie !",
          description: "Vérifiez votre email pour confirmer votre compte.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
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
                    <Input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom complet"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />Téléphone
                    </label>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+221 XX XXX XX XX"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />Ville
                    </label>
                    <Input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Votre ville"
                      className="rounded-lg"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  className="rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />Mot de passe *
                </label>
                <Input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="rounded-lg"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="btn-primary-gradient rounded-full w-full py-6 text-lg"
              >
                {isLoading ? "Chargement..." : isLogin ? (
                  <><LogIn className="w-5 h-5 mr-2" />Se connecter</>
                ) : (
                  <><UserPlus className="w-5 h-5 mr-2" />S'inscrire</>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-medium hover:underline"
              >
                {isLogin ? "Pas encore membre ? S'inscrire" : "Déjà membre ? Se connecter"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
