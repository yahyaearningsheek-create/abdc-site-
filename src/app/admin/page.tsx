"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, LogOut, Users, Award, FileText, Key, Plus, Trash2, Save, ArrowLeft, Eye, EyeOff, Shield
} from "lucide-react";
import { useStore } from "@/store/useStore";

const ADMIN_PASSWORD_KEY = "abdc-admin-password";
const DEFAULT_PASSWORD = "abdc2025";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"members" | "presidents" | "content" | "password">("members");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const {
    siteData, addMember, removeMember, addPresident, removePresident, updateSiteData
  } = useStore();

  // New member form
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  // New president form
  const [newPresName, setNewPresName] = useState("");
  const [newPresPeriod, setNewPresPeriod] = useState("");
  const [newPresIsCurrent, setNewPresIsCurrent] = useState(false);

  // Content editing
  const [heroTitleFr, setHeroTitleFr] = useState("");
  const [heroTitleEn, setHeroTitleEn] = useState("");
  const [heroTitleAr, setHeroTitleAr] = useState("");
  const [heroSubFr, setHeroSubFr] = useState("");
  const [heroSubEn, setHeroSubEn] = useState("");
  const [heroSubAr, setHeroSubAr] = useState("");

  // Password change
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  useEffect(() => {
    setHeroTitleFr(siteData.heroTitle.fr);
    setHeroTitleEn(siteData.heroTitle.en);
    setHeroTitleAr(siteData.heroTitle.ar);
    setHeroSubFr(siteData.heroSubtitle.fr);
    setHeroSubEn(siteData.heroSubtitle.en);
    setHeroSubAr(siteData.heroSubtitle.ar);
  }, [siteData]);

  const getStoredPassword = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    }
    return DEFAULT_PASSWORD;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getStoredPassword()) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addMember({
      id: Date.now().toString(),
      name: newMemberName.trim(),
      role: newMemberRole.trim() || "Membre Actif",
    });
    setNewMemberName("");
    setNewMemberRole("");
    showSuccess("Membre ajouté avec succès");
  };

  const handleAddPresident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresName.trim() || !newPresPeriod.trim()) return;
    addPresident({
      id: Date.now().toString(),
      name: newPresName.trim(),
      period: newPresPeriod.trim(),
      isCurrent: newPresIsCurrent,
    });
    setNewPresName("");
    setNewPresPeriod("");
    setNewPresIsCurrent(false);
    showSuccess("Président ajouté avec succès");
  };

  const handleSaveContent = () => {
    updateSiteData({
      heroTitle: { fr: heroTitleFr, en: heroTitleEn, ar: heroTitleAr },
      heroSubtitle: { fr: heroSubFr, en: heroSubEn, ar: heroSubAr },
    });
    showSuccess("Contenu mis à jour avec succès");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPwd !== getStoredPassword()) {
      setError("Mot de passe actuel incorrect");
      return;
    }
    if (newPwd.length < 6) {
      setError("Le nouveau mot de passe doit avoir au moins 6 caractères");
      return;
    }
    if (newPwd !== confirmPwd) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPwd);
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setError("");
    showSuccess("Mot de passe changé avec succès");
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-background-dark flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-text dark:text-white mb-2">Administration ABDC</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Accès sécurisé au panneau de contrôle</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  placeholder="Mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              <button type="submit" className="btn btn-primary w-full">
                Se connecter
              </button>
            </form>

            <button
              onClick={() => router.push("/")}
              className="mt-6 flex items-center gap-2 text-gray-500 hover:text-primary mx-auto text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Retour au site
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ADMIN DASHBOARD
  const tabs = [
    { id: "members" as const, icon: <Users className="w-5 h-5" />, label: "Membres" },
    { id: "presidents" as const, icon: <Award className="w-5 h-5" />, label: "Présidents" },
    { id: "content" as const, icon: <FileText className="w-5 h-5" />, label: "Contenu" },
    { id: "password" as const, icon: <Key className="w-5 h-5" />, label: "Mot de passe" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark">
      {/* Success Message */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-medium"
          >
            ✓ {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="bg-white dark:bg-surface-dark shadow-sm border-b dark:border-gray-800 px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">A</div>
            <div>
              <h1 className="font-bold text-text dark:text-white">Panel Admin ABDC</h1>
              <p className="text-xs text-gray-500">Gestion du site</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/")} className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Site
            </button>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Déconnexion
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setError(""); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* MEMBERS TAB */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <form onSubmit={handleAddMember} className="glass-card p-6">
              <h3 className="font-bold text-lg text-text dark:text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Ajouter un Membre
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nom complet"
                  required
                />
                <input
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Rôle (optionnel)"
                />
                <button type="submit" className="btn btn-primary">
                  <Plus className="w-5 h-5" /> Ajouter
                </button>
              </div>
            </form>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg text-text dark:text-white mb-4">
                Membres ({siteData.members.length})
              </h3>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {siteData.members.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-text dark:text-white">{m.name}</p>
                        <p className="text-xs text-gray-500">{m.role}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMember(m.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PRESIDENTS TAB */}
        {activeTab === "presidents" && (
          <div className="space-y-6">
            <form onSubmit={handleAddPresident} className="glass-card p-6">
              <h3 className="font-bold text-lg text-text dark:text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Ajouter un Président
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <input
                  value={newPresName}
                  onChange={(e) => setNewPresName(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nom complet"
                  required
                />
                <input
                  value={newPresPeriod}
                  onChange={(e) => setNewPresPeriod(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Période (ex: 2020-2022)"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={newPresIsCurrent}
                    onChange={(e) => setNewPresIsCurrent(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Président actuel
                </label>
                <button type="submit" className="btn btn-primary">
                  <Plus className="w-5 h-5" /> Ajouter
                </button>
              </div>
            </form>

            <div className="glass-card p-6">
              <h3 className="font-bold text-lg text-text dark:text-white mb-4">
                Présidents ({siteData.presidents.length})
              </h3>
              <div className="space-y-3">
                {siteData.presidents.map((p) => (
                  <div key={p.id} className={`flex items-center justify-between p-4 rounded-xl border ${p.isCurrent ? "border-accent bg-accent/5" : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Award className={`w-6 h-6 ${p.isCurrent ? "text-accent" : "text-secondary"}`} />
                      </div>
                      <div>
                        <p className="font-bold text-text dark:text-white">{p.name}</p>
                        <p className="text-sm text-gray-500">{p.period}</p>
                        {p.isCurrent && <span className="text-xs text-accent font-bold">Président Actuel</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => removePresident(p.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CONTENT TAB */}
        {activeTab === "content" && (
          <div className="glass-card p-6 space-y-6">
            <h3 className="font-bold text-lg text-text dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5" /> Modifier le Contenu du Site
            </h3>

            <div>
              <h4 className="font-bold text-sm text-gray-500 mb-3">Titre Principal</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Français</label>
                  <input value={heroTitleFr} onChange={(e) => setHeroTitleFr(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">English</label>
                  <input value={heroTitleEn} onChange={(e) => setHeroTitleEn(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">العربية</label>
                  <input value={heroTitleAr} onChange={(e) => setHeroTitleAr(e.target.value)} dir="rtl"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm text-gray-500 mb-3">Sous-titre</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Français</label>
                  <input value={heroSubFr} onChange={(e) => setHeroSubFr(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">English</label>
                  <input value={heroSubEn} onChange={(e) => setHeroSubEn(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">العربية</label>
                  <input value={heroSubAr} onChange={(e) => setHeroSubAr(e.target.value)} dir="rtl"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
            </div>

            <button onClick={handleSaveContent} className="btn btn-primary gap-2">
              <Save className="w-5 h-5" /> Enregistrer les modifications
            </button>
          </div>
        )}

        {/* PASSWORD TAB */}
        {activeTab === "password" && (
          <div className="glass-card p-6 max-w-md">
            <h3 className="font-bold text-lg text-text dark:text-white mb-6 flex items-center gap-2">
              <Key className="w-5 h-5" /> Changer le Mot de Passe
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Mot de passe actuel</label>
                <input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Nouveau mot de passe</label>
                <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Confirmer le mot de passe</label>
                <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white outline-none focus:ring-2 focus:ring-primary" />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="btn btn-primary w-full gap-2">
                <Key className="w-5 h-5" /> Changer le mot de passe
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
