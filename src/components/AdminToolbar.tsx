"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, LogOut, Eye, EyeOff, Lock, X, Key, Users, Award, Plus, Trash2, Upload } from "lucide-react";
import { useStore } from "@/store/useStore";

const ADMIN_PASSWORD_KEY = "abdc-admin-password";
const DEFAULT_PASSWORD = "abdc2025";

const AdminToolbar = () => {
  const { isAdminMode, setAdminMode, siteData, addMember, removeMember, addPresident, removePresident } = useStore();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  // Toast from EditableText global edits
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      setToastMsg((e as CustomEvent).detail);
      setTimeout(() => setToastMsg(""), 3000);
    };
    window.addEventListener("abdc-toast", handler);
    return () => window.removeEventListener("abdc-toast", handler);
  }, []);

  // Panel state
  const [showPanel, setShowPanel] = useState(false);
  const [panelTab, setPanelTab] = useState<"members" | "presidents" | "password">("members");

  // Password change
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  // Add member
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("");

  // Add president
  const [newPresName, setNewPresName] = useState("");
  const [newPresPeriod, setNewPresPeriod] = useState("");
  const [newPresIsCurrent, setNewPresIsCurrent] = useState(false);
  const [newPresPhoto, setNewPresPhoto] = useState("");
  const presPhotoRef = useRef<HTMLInputElement>(null);

  const [successMsg, setSuccessMsg] = useState("");

  const getStoredPassword = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    }
    return DEFAULT_PASSWORD;
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === getStoredPassword()) {
      setAdminMode(true);
      setShowLogin(false);
      setPassword("");
      setError("");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  const handleLogout = () => {
    setAdminMode(false);
    setShowPanel(false);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMsg("");
    if (currentPwd !== getStoredPassword()) {
      setPwdMsg("❌ Mot de passe actuel incorrect");
      return;
    }
    if (newPwd.length < 4) {
      setPwdMsg("❌ Minimum 4 caractères");
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg("❌ Les mots de passe ne correspondent pas");
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPwd);
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
    setPwdMsg("✅ Mot de passe changé !");
    showSuccess("Mot de passe changé avec succès");
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;
    addMember({ id: Date.now().toString(), name: newMemberName.trim(), role: newMemberRole.trim() || "Membre Actif" });
    setNewMemberName("");
    setNewMemberRole("");
    showSuccess("Membre ajouté");
  };

  const handlePresPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setNewPresPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddPresident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresName.trim() || !newPresPeriod.trim()) return;
    addPresident({ id: Date.now().toString(), name: newPresName.trim(), period: newPresPeriod.trim(), isCurrent: newPresIsCurrent, image: newPresPhoto || undefined });
    setNewPresName("");
    setNewPresPeriod("");
    setNewPresIsCurrent(false);
    setNewPresPhoto("");
    if (presPhotoRef.current) presPhotoRef.current.value = "";
    showSuccess("Président ajouté");
  };

  return (
    <>
      {/* Success toast */}
      <AnimatePresence>
        {(successMsg || toastMsg) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-medium text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            {successMsg || toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Mode Floating Bar */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] bg-gradient-to-r from-primary-dark to-primary text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm"
          >
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-bold hidden sm:inline">Mode Édition</span>
            <span className="text-xs opacity-70 hidden md:inline">Cliquez sur les textes pour modifier</span>
            <div className="w-px h-5 bg-white/30" />
            <button onClick={() => setShowPanel(true)} className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1">
              <Users className="w-4 h-4" /> Gérer
            </button>
            <button onClick={handleLogout} className="bg-red-500/80 hover:bg-red-500 px-3 py-1.5 rounded-full font-medium transition-colors flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Quitter
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Management Panel */}
      <AnimatePresence>
        {showPanel && isAdminMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="text-lg font-bold text-text dark:text-white">Panneau d&apos;Administration</h3>
                <button onClick={() => setShowPanel(false)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b dark:border-gray-800 px-4">
                {[
                  { id: "members" as const, icon: <Users className="w-4 h-4" />, label: "Membres" },
                  { id: "presidents" as const, icon: <Award className="w-4 h-4" />, label: "Présidents" },
                  { id: "password" as const, icon: <Key className="w-4 h-4" />, label: "Mot de passe" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPanelTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                      panelTab === tab.id ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-4 overflow-y-auto flex-1">
                {/* MEMBERS */}
                {panelTab === "members" && (
                  <div className="space-y-4">
                    <form onSubmit={handleAddMember} className="flex gap-2">
                      <input value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} placeholder="Nom" required
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                      <input value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} placeholder="Rôle"
                        className="w-32 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                      <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark text-sm flex items-center gap-1">
                        <Plus className="w-4 h-4" />
                      </button>
                    </form>
                    <p className="text-xs text-gray-500">{(siteData?.members || []).length} membres</p>
                    <div className="space-y-1 max-h-[40vh] overflow-y-auto">
                      {(siteData?.members || []).map((m) => (
                        <div key={m.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 text-sm">
                          <div>
                            <span className="font-medium text-text dark:text-white">{m.name}</span>
                            <span className="text-xs text-gray-400 ml-2">{m.role}</span>
                          </div>
                          <button onClick={() => removeMember(m.id)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PRESIDENTS */}
                {panelTab === "presidents" && (
                  <div className="space-y-4">
                    <form onSubmit={handleAddPresident} className="space-y-3">
                      <div className="flex gap-2">
                        <input value={newPresName} onChange={(e) => setNewPresName(e.target.value)} placeholder="Nom" required
                          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                        <input value={newPresPeriod} onChange={(e) => setNewPresPeriod(e.target.value)} placeholder="Période" required
                          className="w-32 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      {/* Photo upload */}
                      <div className="flex items-center gap-3">
                        <input ref={presPhotoRef} type="file" accept="image/*" onChange={handlePresPhoto} className="hidden" />
                        <button type="button" onClick={() => presPhotoRef.current?.click()}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 hover:border-primary text-sm text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                          <Upload className="w-4 h-4" />
                          {newPresPhoto ? "Photo sélectionnée ✓" : "Ajouter une photo"}
                        </button>
                        {newPresPhoto && (
                          <img src={newPresPhoto} alt="Preview" className="w-10 h-10 rounded-full object-cover border-2 border-primary" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <input type="checkbox" checked={newPresIsCurrent} onChange={(e) => setNewPresIsCurrent(e.target.checked)} className="rounded" />
                          Président actuel
                        </label>
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark text-sm flex items-center gap-1">
                          <Plus className="w-4 h-4" /> Ajouter
                        </button>
                      </div>
                    </form>
                    <div className="space-y-2">
                       {(siteData?.presidents || []).map((p) => (
                        <div key={p.id} className={`flex items-center justify-between p-3 rounded-lg border text-sm ${p.isCurrent ? 'border-accent bg-accent/5' : 'border-gray-100 dark:border-gray-800'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                              {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <Award className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div>
                              <span className="font-bold text-text dark:text-white">{p.name}</span>
                              <span className="text-xs text-gray-500 ml-2">({p.period})</span>
                              {p.isCurrent && <span className="text-xs text-accent font-bold ml-2">Actuel</span>}
                            </div>
                          </div>
                          <button onClick={() => removePresident(p.id)} className="text-red-400 hover:text-red-600 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* PASSWORD */}
                {panelTab === "password" && (
                  <form onSubmit={handleChangePassword} className="max-w-sm space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Mot de passe actuel</label>
                      <input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Nouveau mot de passe</label>
                      <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 dark:text-gray-400 mb-1 block">Confirmer</label>
                      <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white text-sm outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    {pwdMsg && <p className={`text-sm ${pwdMsg.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>{pwdMsg}</p>}
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark text-sm flex items-center gap-2">
                      <Key className="w-4 h-4" /> Changer
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-dark rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-xl text-text dark:text-white mb-1">Administration ABDC</h3>
                <p className="text-xs text-gray-500 mb-6">Accès sécurisé</p>
              </div>
              <form onSubmit={handleLogin} className="px-6 pb-6 space-y-4">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-text dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <button type="submit" className="btn btn-primary w-full">Se connecter</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden trigger */}
      {!isAdminMode && (
        <button id="admin-login-trigger" onClick={() => setShowLogin(true)} className="hidden" />
      )}
    </>
  );
};

export default AdminToolbar;
