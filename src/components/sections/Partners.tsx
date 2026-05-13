"use client";

import { motion } from "framer-motion";
import { Globe, Users, FileCheck } from "lucide-react";
import EditableText from "@/components/EditableText";

const partners = [
  { name: "PNUD / UNDP", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" },
  { name: "GEF / SGP", color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" },
  { name: "MEDD", color: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" },
  { name: "MASS", color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300" },
  { name: "CRIPEN", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300" },
  { name: "Mairie Boulaos", color: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300" },
];

const formations = [
  { region: "Dikhil", count: 32, color: "border-blue-500" },
  { region: "Ali Sabieh", count: 29, color: "border-green-500" },
  { region: "Arta", count: 17, color: "border-purple-500" },
  { region: "Damerjog", count: 21, color: "border-amber-500" },
];

const Partners = () => {
  return (
    <section id="partners" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="partners-title" defaultValue="Partenaires & Projets Internationaux" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* PNUD Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 mb-12 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Globe className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
                <EditableText id="partners-pnud-title" defaultValue="Programme PMF/FEM – 8ème Phase (2025-2028)" tag="h3" className="text-xl font-bold text-text dark:text-white mb-3" />
                <EditableText id="partners-pnud-desc" defaultValue="Dans le cadre de la 8ème phase opérationnelle du PMF/FEM (2025-2028), l'ABDC a été sélectionnée par le PNUD pour renforcer les capacités des organisations de la société civile." tag="p" className="text-gray-600 dark:text-gray-400 leading-relaxed" multiline />
            </div>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {partners.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className={`${p.color} rounded-xl p-6 text-center font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-1 transition-all`}
            >
              {p.name}
            </motion.div>
          ))}
        </div>

        {/* Formation Stats */}
        <div className="text-center mb-8">
          <EditableText id="partners-formation-title" defaultValue="Formations par Région" tag="h3" className="text-2xl font-bold text-text dark:text-white mb-2" />
          <EditableText id="partners-formation-sub" defaultValue="Renforcement des capacités des OSC" tag="p" className="text-gray-500 dark:text-gray-400 text-sm" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {formations.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`glass-card p-6 text-center border-t-4 ${f.color}`}
            >
              <div className="text-3xl font-extrabold text-text dark:text-white mb-1">{f.count}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">associations à</p>
              <p className="font-bold text-text dark:text-white">{f.region}</p>
            </motion.div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-primary/10 dark:bg-primary/20 px-6 py-3 rounded-full"
          >
            <Users className="w-5 h-5 text-primary" />
            <EditableText id="partners-total-assoc" defaultValue="99 associations formées" tag="span" className="font-bold text-primary dark:text-primary-light" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-accent/10 dark:bg-accent/20 px-6 py-3 rounded-full"
          >
            <FileCheck className="w-5 h-5 text-accent" />
            <EditableText id="partners-total-projects" defaultValue="57 projets retenus" tag="span" className="font-bold text-accent dark:text-accent-light" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
