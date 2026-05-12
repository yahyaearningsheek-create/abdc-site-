"use client";

import { motion } from "framer-motion";
import EditableText from "@/components/EditableText";

const Organization = () => {
  return (
    <section id="organigramme" className="py-20 px-4 md:px-8 bg-white dark:bg-background-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <EditableText id="org-title" defaultValue="Notre Structure" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Organigramme */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto overflow-x-auto pb-8"
        >
          <div className="min-w-[700px] flex flex-col items-center">

            {/* Top Advisory Row */}
            <div className="flex justify-center gap-16 mb-6">
              <div className="glass-card px-6 py-3 text-center border-l-4 border-accent">
                <p className="font-bold text-sm text-text dark:text-white">Commission des Sages</p>
                <p className="text-xs text-gray-500">Conseil</p>
              </div>
              <div className="glass-card px-6 py-3 text-center border-l-4 border-accent">
                <p className="font-bold text-sm text-text dark:text-white">Comité de Développement</p>
                <p className="text-xs text-gray-500">Conseil</p>
              </div>
            </div>

            {/* Lines from advisory to president */}
            <div className="flex justify-center w-full mb-2">
              <svg height="30" width="400" className="text-gray-300 dark:text-gray-600">
                <line x1="100" y1="0" x2="200" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                <line x1="300" y1="0" x2="200" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>

            {/* President */}
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-4 rounded-xl shadow-lg text-center mb-6">
              <p className="font-bold text-lg">Président</p>
              <p className="text-sm opacity-80">Mr. Mohamed Moumin Barkhadleh</p>
            </div>

            {/* Line down */}
            <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600" />

            {/* VP + SG Row */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="flex flex-col items-center">
                <div className="glass-card px-6 py-3 text-center border-t-4 border-secondary">
                  <p className="font-bold text-sm text-text dark:text-white">Secrétaire Générale</p>
                </div>
              </div>
              <div className="w-0.5 bg-gray-300 dark:bg-gray-600" />
              <div className="flex flex-col items-center">
                <div className="glass-card px-6 py-3 text-center border-t-4 border-secondary">
                  <p className="font-bold text-sm text-text dark:text-white">Vice-Président</p>
                </div>
              </div>
            </div>

            {/* Line down */}
            <div className="flex justify-center w-full mb-2">
              <svg height="30" width="600" className="text-gray-300 dark:text-gray-600">
                <line x1="150" y1="0" x2="150" y2="28" stroke="currentColor" strokeWidth="2" />
                <line x1="300" y1="0" x2="300" y2="28" stroke="currentColor" strokeWidth="2" />
                <line x1="450" y1="0" x2="450" y2="28" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Commissions Row */}
            <div className="flex justify-center gap-6 flex-wrap mb-6">
              <div className="glass-card px-5 py-3 text-center border-t-4 border-primary-light">
                <p className="font-bold text-sm text-text dark:text-white">Commission des Finances</p>
              </div>
              <div className="glass-card px-5 py-3 text-center border-t-4 border-primary-light">
                <p className="font-bold text-sm text-text dark:text-white">Commission Sociale</p>
              </div>
              <div className="glass-card px-5 py-3 text-center border-t-4 border-accent">
                <p className="font-bold text-sm text-text dark:text-white">Commission Genre</p>
              </div>
            </div>

            {/* Line down */}
            <div className="flex justify-center w-full mb-2">
              <svg height="30" width="600" className="text-gray-300 dark:text-gray-600">
                <line x1="100" y1="0" x2="100" y2="28" stroke="currentColor" strokeWidth="2" />
                <line x1="250" y1="0" x2="250" y2="28" stroke="currentColor" strokeWidth="2" />
                <line x1="400" y1="0" x2="400" y2="28" stroke="currentColor" strokeWidth="2" />
                <line x1="500" y1="0" x2="500" y2="28" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Sub-commissions */}
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-xs text-text dark:text-gray-300">Trésorier</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-xs text-text dark:text-gray-300">Contrôleur</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-xs text-text dark:text-gray-300">Entre-aide & Solidarité</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-lg text-center border border-gray-200 dark:border-gray-700">
                <p className="font-medium text-xs text-text dark:text-gray-300">Environnementale</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Organization;
