"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Heart, Activity, Leaf, TreePine, ChevronDown, ChevronUp } from "lucide-react";
import EditableText from "@/components/EditableText";

const programs = [
  {
    id: "smart",
    icon: <BookOpen className="w-8 h-8" />,
    title: "SMART PROJECT",
    subtitle: "Éducation / Formation / Sensibilisation",
    color: "from-blue-500 to-blue-700",
    borderColor: "border-blue-500",
    vision: "Repérer et orienter les jeunes talents, former les futures élites.",
    objectifs: "Éducation civique, encadrement jeunes 1ère à 9ème année, renouer avec les langues locales.",
    actions: ["Dons de fournitures scolaires","Cours de soutien gratuits","Formation adultes","Apprentissage Coran et Arabe gratuit"],
    impact: "72 élèves bénéficiaires de fournitures scolaires en 2025",
    image: "/images/Association  ABDC_page-0013.jpg",
  },
  {
    id: "social",
    icon: <Heart className="w-8 h-8" />,
    title: "SOCIAL PROJECT",
    subtitle: "Solidarité / Entre-aide",
    color: "from-pink-500 to-rose-700",
    borderColor: "border-pink-500",
    vision: "La famille au cœur de la société.",
    objectifs: "Promotion culturelle, émancipation de la femme, préservation de la famille.",
    actions: ["Cours Coran & séances éducation civique","Cours matrimoniaux","Dons d'habits pour 55 orphelins vulnérables (Aïd Juin 2019)","Dons de nourriture pendant le Ramadan"],
    impact: "55 enfants vulnérables habillés pour l'Aïd",
    image: "/images/Association  ABDC_page-0018.jpg",
  },
  {
    id: "health",
    icon: <Activity className="w-8 h-8" />,
    title: "HEALTH PROJECT",
    subtitle: "Santé",
    color: "from-red-500 to-red-700",
    borderColor: "border-red-500",
    vision: "Une société en bonne santé.",
    objectifs: "Améliorer la santé et le bien-être des habitants de Djibouti.",
    actions: ["Dons de sang annuels (Maternité Dar El Hanan & Hôpital Peltier)","Distribution kits hygiéniques femmes (avec OIM/Suède)","Distribution savons sans-abris (prévention Ebola)","Distribution vivres et masques COVID"],
    impact: "83+ dons de sang collectés par an",
    image: "/images/Association  ABDC_page-0022.jpg",
  },
  {
    id: "clean",
    icon: <Leaf className="w-8 h-8" />,
    title: "CLEAN PROJECT",
    subtitle: "Environnement",
    color: "from-teal-500 to-teal-700",
    borderColor: "border-teal-500",
    vision: "Embellir la ville et faire de Djibouti une ville verte et propre.",
    objectifs: "Actions de nettoyage et rénovation communautaire.",
    actions: ["Journée nettoyage Avenue 26 avec la Mairie","Collecte ordures Plage Siesta","Travaux rénovation peinture centre communautaire Q5"],
    impact: "Multiples journées de nettoyage depuis 2018",
    image: "/images/Association  ABDC_page-0025.jpg",
  },
  {
    id: "green",
    icon: <TreePine className="w-8 h-8" />,
    title: "GREEN PROJECT",
    subtitle: "Environnement",
    color: "from-green-500 to-green-700",
    borderColor: "border-green-500",
    vision: "Contribuer à la muraille verte de Djibouti.",
    objectifs: "Plantation d'arbres dans la capitale.",
    actions: ["Plantation d'arbres dans la capitale (contribution muraille verte)","60 arbres prévus en 2026"],
    impact: "60 arbres prévus pour 2026",
    image: "/images/Association  ABDC_page-0026.jpg",
  },
];

const Programs = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="programs" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="programs-title" defaultValue="Nos Programmes" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <EditableText id="programs-subtitle" defaultValue="5 programmes phares au service de la communauté djiboutienne" tag="p" className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" />
          <div className="w-24 h-1 bg-accent mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${prog.color} opacity-80 z-10`} />
                <img src={prog.image} alt={prog.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      {prog.icon}
                    </div>
                    <EditableText id={`prog-title-${prog.id}`} defaultValue={prog.title} tag="h3" className="text-xl font-bold" />
                    <EditableText id={`prog-sub-${prog.id}`} defaultValue={prog.subtitle} tag="p" className="text-sm opacity-80" />
                  </div>
                </div>
              </div>

              <div className="p-6">
                <EditableText id={`prog-vision-${prog.id}`} defaultValue={prog.vision} tag="p" className="text-gray-600 dark:text-gray-400 text-sm mb-4 italic" />
                <button
                  onClick={() => setExpanded(expanded === prog.id ? null : prog.id)}
                  className="flex items-center gap-2 text-primary dark:text-primary-light font-medium text-sm hover:underline"
                >
                  {expanded === prog.id ? "Moins de détails" : "Voir les détails"}
                  {expanded === prog.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <AnimatePresence>
                  {expanded === prog.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pt-4 space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-text dark:text-white mb-1">Objectifs :</h4>
                          <EditableText id={`prog-obj-${prog.id}`} defaultValue={prog.objectifs} tag="p" className="text-xs text-gray-600 dark:text-gray-400" multiline />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-text dark:text-white mb-1">Actions :</h4>
                          <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            {prog.actions.map((a, i) => (<li key={i}>{a}</li>))}
                          </ul>
                        </div>
                        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg px-4 py-2">
                          <EditableText id={`prog-impact-${prog.id}`} defaultValue={`📊 ${prog.impact}`} tag="p" className="text-sm font-bold text-primary dark:text-primary-light" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
