"use client";

import { motion } from "framer-motion";
import { Monitor, Scissors, Trash2, ChefHat, TreePine, BookOpen } from "lucide-react";
import EditableText from "@/components/EditableText";

const projects = [
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "Salle de formation informatique",
    desc: "Système de gestion ODOO",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: <Scissors className="w-8 h-8" />,
    title: "Formation de couture",
    desc: "Pour les femmes",
    color: "from-pink-500 to-rose-600",
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: "Collecte des ordures",
    desc: "Commune de Boulaos et plages",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: <ChefHat className="w-8 h-8" />,
    title: "Incubateur culinaire",
    desc: "Formations culinaires",
    color: "from-orange-500 to-amber-600",
  },
  {
    icon: <TreePine className="w-8 h-8" />,
    title: "Plantation d'arbres",
    desc: "60 arbres dans la République",
    color: "from-green-500 to-green-600",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Bibliothèque communautaire",
    desc: "Espace de travail collaboratif",
    color: "from-purple-500 to-indigo-600",
  },
];

const Perspectives = () => {
  return (
    <section id="perspectives" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="perspectives-title" defaultValue="Nos Projets pour 2026" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${p.color} p-8 text-white h-full`}>
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{p.title}</h3>
                <p className="text-white/80 text-sm">{p.desc}</p>
              </div>
              <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Perspectives;
