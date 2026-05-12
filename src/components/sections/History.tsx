"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Users, Building, Star } from "lucide-react";
import EditableText from "@/components/EditableText";

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

const History = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, value: 244, label: "Membres", color: "text-primary", labelId: "stat-label-1" },
    { icon: <Calendar className="w-8 h-8" />, value: 14, label: "Ans d'existence", color: "text-secondary", labelId: "stat-label-2" },
    { icon: <Building className="w-8 h-8" />, value: 2, label: "Sièges", color: "text-accent", labelId: "stat-label-3" },
    { icon: <Star className="w-8 h-8" />, value: 5, label: "Programmes phares", color: "text-primary-light", labelId: "stat-label-4" },
  ];

  return (
    <section id="history" className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="history-title" defaultValue="Notre Histoire" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <EditableText
              id="history-para1"
              defaultValue="L'Association A.B.D.C est issue de la volonté de jeunes voulant contribuer leur savoir, savoir-faire et énergie positive au développement de leur communauté."
              tag="p"
              className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              multiline
            />
            <EditableText
              id="history-para2"
              defaultValue="En 2011, 7 personnes (5 hommes, 2 femmes) sans siège ni fonds ont initié cette structure. Aujourd'hui, l'association compte 244 membres qui cotisent mensuellement de façon continue et dispose de 2 sièges : Quartier 5 et Branche Balbala."
              tag="p"
              className="text-lg leading-relaxed text-gray-700 dark:text-gray-300"
              multiline
            />
            <div className="flex items-center gap-4 pt-4">
              <div className="w-16 h-1 bg-accent rounded-full" />
              <EditableText id="history-since" defaultValue="Depuis 2011 — Au service de la communauté" tag="p" className="text-sm font-medium text-gray-500 dark:text-gray-400 italic" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 text-center hover:-translate-y-1 transition-transform"
              >
                <div className={`${stat.color} mb-3 flex justify-center`}>{stat.icon}</div>
                <div className={`text-4xl font-extrabold ${stat.color} mb-1`}>
                  <AnimatedCounter end={stat.value} />
                </div>
                <EditableText id={stat.labelId} defaultValue={stat.label} tag="p" className="text-sm font-medium text-gray-600 dark:text-gray-400" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default History;
