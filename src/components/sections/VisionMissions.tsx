"use client";

import { motion } from "framer-motion";
import { Eye, Heart, Target } from "lucide-react";
import EditableText from "@/components/EditableText";

const VisionMissions = () => {
  const cards = [
    {
      icon: <Eye className="w-10 h-10" />,
      titleId: "vision-title-1",
      titleDefault: "Vision",
      color: "from-primary to-primary-dark",
      borderColor: "border-primary/20",
      descId: "vision-desc-1",
      descDefault: "Être une organisation non gouvernementale incontournable et active sur la situation économique, éducative, sanitaire, sociale et culturelle de la jeunesse.",
    },
    {
      icon: <Heart className="w-10 h-10" />,
      titleId: "vision-title-2",
      titleDefault: "Valeurs",
      subtitleId: "vision-sub-2",
      subtitleDefault: "Midnimo – Wadajir – Wax Tar",
      color: "from-accent to-accent-dark",
      borderColor: "border-accent/20",
      descId: "vision-desc-2",
      descDefault: "Unité – Solidarité – Utilité",
    },
    {
      icon: <Target className="w-10 h-10" />,
      titleId: "vision-title-3",
      titleDefault: "Missions",
      color: "from-secondary to-secondary-dark",
      borderColor: "border-secondary/20",
      descId: "vision-desc-3",
      descDefault: "Foyer de solidarité, d'assistance et de bienfaisance. Centre d'appui, d'orientation, de formation et d'informations. Pôle d'insertion et d'encadrement professionnel et social. Centre d'écoute et d'orientation pour l'Égalité du Genre et la lutte contre les VBG.",
    },
  ];

  return (
    <section id="vision" className="py-20 px-4 md:px-8 bg-primary/5 dark:bg-primary-dark/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="vision-section-title" defaultValue="Vision & Missions" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`relative bg-white dark:bg-surface-dark rounded-2xl shadow-xl border ${card.borderColor} overflow-hidden group hover:-translate-y-2 transition-all duration-300`}
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`} />
              <div className="p-8">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <EditableText id={card.titleId} defaultValue={card.titleDefault} tag="h3" className="text-2xl font-bold text-text dark:text-white mb-2" />
                {card.subtitleId && (
                  <EditableText id={card.subtitleId} defaultValue={card.subtitleDefault || ""} tag="p" className="text-accent font-semibold text-sm mb-4 italic" />
                )}
                <EditableText id={card.descId} defaultValue={card.descDefault} tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed" multiline />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMissions;
