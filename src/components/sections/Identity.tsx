"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, MapPin, Phone, Building, Users, Award, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import EditableText from "@/components/EditableText";

const Identity = () => {
  const { siteData } = useStore();
  const [showMembers, setShowMembers] = useState(false);
  const [showPresidents, setShowPresidents] = useState(false);
  const [selectedPresidentImage, setSelectedPresidentImage] = useState<string | null>(null);

  const cards = [
    {
      icon: <Info className="w-8 h-8 text-primary" />,
      titleId: "identity-card1-title",
      titleDefault: "Nom & Sigle",
      descId: "identity-card1-desc",
      descDefault: "Association pour la Bienfaisance et le Développement Communautaire (ABDC)",
    },
    {
      icon: <Building className="w-8 h-8 text-secondary" />,
      titleId: "identity-card2-title",
      titleDefault: "Siège Principal",
      descId: "identity-card2-desc",
      descDefault: "Djibouti ville, commune Boulaos, Cité Progrès",
    },
    {
      icon: <MapPin className="w-8 h-8 text-accent" />,
      titleId: "identity-card3-title",
      titleDefault: "Branche Secondaire",
      descId: "identity-card3-desc",
      descDefault: "Djibouti ville, commune Balbala - Quartier 5",
    },
    {
      icon: <Phone className="w-8 h-8 text-primary-light" />,
      titleId: "identity-card4-title",
      titleDefault: "Contact",
      descId: "identity-card4-desc",
      descDefault: "+253 77 82 72 26 / 77 84 42 03",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 md:px-8 bg-white dark:bg-background-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="identity-title" defaultValue="Fiche d'Identité" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4 shadow-inner">
                {card.icon}
              </div>
              <EditableText id={card.titleId} defaultValue={card.titleDefault} tag="h3" className="font-bold text-lg mb-2 text-text dark:text-white" />
              <EditableText id={card.descId} defaultValue={card.descDefault} tag="p" className="text-gray-600 dark:text-gray-400 text-sm" />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowMembers(true)}
            className="btn bg-primary text-white shadow-lg hover:shadow-xl hover:bg-primary-dark flex items-center gap-3">
            <Users className="w-6 h-6" />
            <span className="font-semibold text-lg">Voir les Membres ({(siteData?.members || []).length})</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowPresidents(true)}
            className="btn bg-secondary text-white shadow-lg hover:shadow-xl hover:bg-secondary-dark flex items-center gap-3">
            <Award className="w-6 h-6" />
            <span className="font-semibold text-lg">Nos Présidents</span>
          </motion.button>
        </div>

        {/* Members Modal */}
        <AnimatePresence>
          {showMembers && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowMembers(false)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                  <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <Users className="w-5 h-5" /> Membres ({(siteData?.members || []).length})
                  </h3>
                  <button onClick={() => setShowMembers(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <div className="space-y-2">
                    {(siteData?.members || []).map((member, i) => (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.01 }}
                        key={member.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text dark:text-white text-sm truncate">{member.name}</p>
                          {member.role && <p className="text-xs text-gray-500 dark:text-gray-400">{member.role}</p>}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Presidents Modal */}
        <AnimatePresence>
          {showPresidents && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowPresidents(false)}>
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                  <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                    <Award className="w-5 h-5" /> Nos Présidents
                  </h3>
                  <button onClick={() => setShowPresidents(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto">
                  <div className="relative border-l-2 border-secondary/30 ml-4 space-y-6 pb-4">
                    {(siteData?.presidents || []).map((president, i) => (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        key={president.id} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-white ${president.isCurrent ? 'bg-accent scale-125' : 'bg-secondary'}`} />
                        <div className={`p-4 rounded-xl border ${president.isCurrent ? 'border-accent bg-accent/5' : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30'}`}>
                          <span className={`text-sm font-bold px-2 py-1 rounded ${president.isCurrent ? 'bg-accent text-white' : 'bg-secondary/10 text-secondary dark:text-secondary-light'}`}>
                            {president.period}
                          </span>
                          <div className="flex items-center gap-4 mt-3">
                            <div 
                              className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                              onClick={() => president.image && setSelectedPresidentImage(president.image)}
                            >
                              {president.image ? (
                                <img src={president.image} alt={president.name} className="w-full h-full object-cover" />
                              ) : (
                                <Award className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg text-text dark:text-white">{president.name}</h4>
                              {president.isCurrent && <p className="text-accent font-medium text-sm">Président Actuel</p>}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fullscreen President Image */}
        <AnimatePresence>
          {selectedPresidentImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setSelectedPresidentImage(null)}
            >
              <button
                onClick={() => setSelectedPresidentImage(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                src={selectedPresidentImage}
                alt="Président en grand"
                className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Identity;
