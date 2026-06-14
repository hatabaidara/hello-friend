import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Layout from "@/components/Layout";
import { API_BASE_URL } from "@/lib/api";



const Galerie = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [categories, setCategories] = useState(["Tous", "Evenements", "Education", "Sante", "Portrait"]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data);
          const cats = ["Tous", ...new Set(data.map((i: any) => i.categorie).filter(Boolean))];
          if (cats.length > 1) setCategories(cats);
        }
      }).catch(() => {});
  }, []);

  const filtered = selectedCategory === "Tous" ? items : items.filter(i => i.categorie === selectedCategory);

  return (
    <Layout>
      <section className="pt-32 pb-20 hero-gradient">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-center text-primary-foreground max-w-3xl mx-auto">
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Galerie</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Nos moments forts</h1>
            <p className="text-xl text-primary-foreground/90">Revivez les temps forts de nos actions a travers photos et videos.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-secondary sticky top-0 z-40">
        <div className="section-container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-card text-foreground hover:bg-primary/10"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer card-hover"
                  onClick={() => setSelectedItem(item)}>
                  <img src={item.imageUrl || item.src} alt={item.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-accent text-sm font-medium">{item.categorie}</span>
                    <h3 className="text-primary-foreground font-display text-xl font-semibold">{item.titre}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}>
            <button onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
              <X className="w-6 h-6 text-primary-foreground" />
            </button>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
              <img src={selectedItem.imageUrl || selectedItem.src} alt={selectedItem.titre} className="w-full rounded-2xl" />
              <div className="mt-4 text-center">
                <span className="text-accent text-sm font-medium">{selectedItem.categorie}</span>
                <h3 className="text-primary-foreground font-display text-2xl font-semibold">{selectedItem.titre}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galerie;
