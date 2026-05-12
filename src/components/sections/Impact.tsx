"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EditableText from "@/components/EditableText";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

const activityData = [
  { year: "2018", sang: 83, nourriture: 85, habits: 32, fournitures: 44, coran: 0, env: 2 },
  { year: "2019", sang: 86, nourriture: 90, habits: 70, fournitures: 55, coran: 42, env: 0 },
  { year: "2020", sang: 0, nourriture: 0, habits: 61, fournitures: 65, coran: 54, env: 5 },
  { year: "2021", sang: 105, nourriture: 43, habits: 82, fournitures: 69, coran: 32, env: 0 },
  { year: "2022", sang: 54, nourriture: 86, habits: 0, fournitures: 0, coran: 0, env: 3 },
  { year: "2023", sang: 74, nourriture: 67, habits: 63, fournitures: 97, coran: 72, env: 0 },
  { year: "2024", sang: 54, nourriture: 86, habits: 0, fournitures: 0, coran: 0, env: 3 },
  { year: "2025", sang: 0, nourriture: 25, habits: 55, fournitures: 72, coran: 0, env: 0 },
];

const tableData = [
  { name: "Dons de sang", values: [83, 86, "-", 105, 54, 74, 54, "-"] },
  { name: "Dons nourriture Ramadan", values: [85, 90, "-", 43, 86, 67, 86, 25] },
  { name: "Dons habits orphelins", values: [32, 70, 61, 82, "-", 63, "-", 55] },
  { name: "Fournitures scolaires", values: [44, 55, 65, 69, "-", 97, "-", 72] },
  { name: "Concours Coran", values: ["-", 42, 54, 32, "-", 72, "-", "-"] },
  { name: "Activités environnementales", values: [2, "-", 5, "-", 3, "-", 3, "-"] },
];

const years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"];

const Impact = () => {
  const [view, setView] = useState<"chart" | "table">("chart");

  return (
    <section id="impact" className="py-20 px-4 md:px-8 bg-white dark:bg-background-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EditableText id="impact-title" defaultValue="Notre Impact en Chiffres (2018-2025)" tag="h2" className="text-3xl md:text-4xl font-bold text-text dark:text-white mb-4" />
          </motion.div>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setView("chart")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                view === "chart"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-text dark:hover:text-white"
              }`}
            >
              Graphique
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                view === "table"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-text dark:hover:text-white"
              }`}
            >
              Tableau
            </button>
          </div>
        </div>

        {/* Chart View */}
        {view === "chart" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6 mb-8"
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="sang" name="Dons de sang" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="nourriture" name="Nourriture Ramadan" fill="#F9A825" radius={[4, 4, 0, 0]} />
                <Bar dataKey="habits" name="Habits orphelins" fill="#ec4899" radius={[4, 4, 0, 0]} />
                <Bar dataKey="fournitures" name="Fournitures scolaires" fill="#1565C0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="coran" name="Concours Coran" fill="#2E7D32" radius={[4, 4, 0, 0]} />
                <Bar dataKey="env" name="Environnement" fill="#14b8a6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {/* Table View */}
        {view === "table" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card overflow-x-auto mb-8"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="p-4 text-left font-bold">Activité</th>
                  {years.map((y) => (
                    <th key={y} className="p-4 text-center font-bold">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 dark:border-gray-800 ${
                      idx % 2 === 0 ? "bg-gray-50/50 dark:bg-gray-800/30" : ""
                    } hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors`}
                  >
                    <td className="p-4 font-medium text-text dark:text-white">{row.name}</td>
                    {row.values.map((val, i) => (
                      <td key={i} className="p-4 text-center text-gray-600 dark:text-gray-400">
                        {val === "-" ? (
                          <span className="text-gray-300 dark:text-gray-600">—</span>
                        ) : (
                          <span className="font-semibold">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary/10 dark:bg-primary/20 rounded-2xl p-6 text-center"
        >
          <EditableText id="impact-footer" defaultValue="💡 Toutes nos activités sont financées sur fonds propres et par la contribution mensuelle de nos membres." tag="p" className="text-primary dark:text-primary-light font-medium" />
        </motion.div>
      </div>
    </section>
  );
};

export default Impact;
