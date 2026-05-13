"use client";

import { motion } from "framer-motion";
import { Wallet, Shield, Heart, Baby, Flame, Hospital } from "lucide-react";
import EditableText from "@/components/EditableText";

const Governance = () => {
  const budget = [
    { label: "Contribution membres", value: "225 000 FDJ", type: "income" },
    { label: "Loyer", value: "70 000 FDJ", type: "expense" },
    { label: "Femme de ménage", value: "15 000 FDJ", type: "expense" },
    { label: "Président", value: "15 000 FDJ", type: "expense" },
    { label: "Téléphone", value: "5 000 FDJ", type: "expense" },
    { label: "Total dépenses fixes", value: "105 000 FDJ", type: "total" },
    { label: "Solde mensuel", value: "120 000 FDJ", type: "balance" },
  ];

  const entreAide = [
    { icon: <Shield className="w-5 h-5" />, label: "Décès proche (père, mère, frère, sœur, époux/se, enfant)", value: "40 000 FDJ", note: "60 000 si solde > 2M" },
    { icon: <Heart className="w-5 h-5" />, label: "Décès enfant 0-10 ans", value: "15 000 FDJ", note: "" },
    { icon: <Hospital className="w-5 h-5" />, label: "Hospitalisation >72h", value: "15 000 FDJ", note: "" },
    { icon: <Baby className="w-5 h-5" />, label: "Accouchement", value: "10 000 FDJ", note: "" },
    { icon: <Flame className="w-5 h-5" />, label: "Incendie locataire", value: "20 000 FDJ", note: "" },
    { icon: <Flame className="w-5 h-5" />, label: "Incendie propriétaire", value: "30 000 FDJ", note: "" },
  ];

  return (
    <section id="governance" className="py-20 px-4 md:px-8 bg-white dark:bg-background-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="governance-title" defaultValue="Transparence & Gouvernance" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Budget Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6">
              <div className="flex items-center gap-3">
                <Wallet className="w-8 h-8" />
                <EditableText id="governance-budget-title" defaultValue="Budget Mensuel" tag="h3" className="text-xl font-bold" />
              </div>
            </div>
            <div className="p-6 space-y-3">
              {budget.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-3 rounded-lg ${
                    item.type === "income"
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                      : item.type === "balance"
                      ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                      : item.type === "total"
                      ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      : "bg-gray-50 dark:bg-gray-800/50"
                  }`}
                >
                  <EditableText id={`gov-budget-label-${idx}`} defaultValue={item.label} tag="span" className="text-sm font-medium text-text dark:text-gray-300" />
                  <EditableText id={`gov-budget-val-${idx}`} defaultValue={item.value} tag="span" className={`font-bold text-sm ${
                    item.type === "income" ? "text-green-600 dark:text-green-400" :
                    item.type === "balance" ? "text-blue-600 dark:text-blue-400" :
                    item.type === "total" ? "text-red-600 dark:text-red-400" :
                    "text-gray-600 dark:text-gray-400"
                  }`} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Entre-Aide Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card overflow-hidden"
          >
            <div className="bg-gradient-to-r from-secondary to-secondary-dark text-white p-6">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8" />
                <div>
                  <EditableText id="governance-entreaide-title" defaultValue="Règlement d'Entre-Aide" tag="h3" className="text-xl font-bold" />
                  <EditableText id="governance-entreaide-sub" defaultValue="Article 10 – Condition : cotisation 3 derniers mois" tag="p" className="text-sm opacity-80" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              {entreAide.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-secondary/5 dark:hover:bg-secondary/10 transition-colors"
                >
                  <div className="text-secondary flex-shrink-0">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <EditableText id={`gov-entreaide-label-${idx}`} defaultValue={item.label} tag="p" className="text-sm font-medium text-text dark:text-gray-300 truncate" />
                    {item.note && <EditableText id={`gov-entreaide-note-${idx}`} defaultValue={item.note} tag="p" className="text-xs text-gray-500 dark:text-gray-500" />}
                  </div>
                  <EditableText id={`gov-entreaide-val-${idx}`} defaultValue={item.value} tag="span" className="font-bold text-sm text-secondary dark:text-secondary-light whitespace-nowrap" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Governance;
