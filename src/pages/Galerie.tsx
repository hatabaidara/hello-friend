import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import Layout from "@/components/Layout";
import actionRally from "@/assets/action-rally.jpg";
import actionEducation from "@/assets/action-education.jpg";
import actionHealth from "@/assets/action-health.jpg";
import heroImage from "@/assets/hero-mamadou.jpg";

const galleryItems = [
  {
    id: 1,
    type: "image",
    src: actionRally,
    title: "Rassemblement à Dakar",
    category: "Événements",
  },
  {
    id: 2,
    type: "image",
    src: actionEducation,
    title: "Formation professionnelle",
    category: "Éducation",
  },
  {
    id: 3,
    type: "image",
    src: actionHealth,
    title: "Caravane santé",
    category: "Santé",
  },
  {
    id: 4,
    type: "image",
    src: heroImage,
    title: "Mamadou Guey",
    category: "Portrait",
  },
  {
    id: 5,
    type: "image",
    src: actionRally,
    title: "Tournée nationale",
    category: "Événements",
  },
  {
    id: 6,
    type: "image",
    src: actionEducation,
    title: "Atelier numérique",
    category: "Éducation",
  },
];

const categories = ["Tous", "Événements", "Éducation", "Santé", "Portrait"];

const Galerie = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = selectedCategory === "Tous"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

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
            <p className="text-accent font-semibold mb-4 uppercase tracking-wider">Galerie</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Nos moments forts
            </h1>
            <p className="text-xl text-primary-foreground/90">
              Revivez les temps forts de nos actions à travers photos et vidéos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-secondary sticky top-0 z-40">
        <div className="section-container">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="section-container">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer card-hover"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-accent text-sm font-medium">{item.category}</span>
                    <h3 className="text-primary-foreground font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                  </div>

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="w-6 h-6 text-primary-foreground" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="w-full rounded-2xl"
              />
              <div className="mt-4 text-center">
                <span className="text-accent text-sm font-medium">{selectedItem.category}</span>
                <h3 className="text-primary-foreground font-display text-2xl font-semibold">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Galerie;
