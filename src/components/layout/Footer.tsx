"use client";

import Link from "next/link";
import { Lock, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const openAdminLogin = () => {
    const trigger = document.getElementById("admin-login-trigger");
    if (trigger) trigger.click();
  };

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="ABDC Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-white/30 shadow-lg"
              />
              <h3 className="font-bold text-2xl">ABDC</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Association pour la Bienfaisance et le Développement Communautaire.
              Penser Globalement, Agir localement.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Djibouti ville, commune Boulaos, Cité Progrès (Siège)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                <span>Djibouti ville, Balbala - Q5 (Branche)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span>+253 77 82 72 26 / +253 77 84 42 03</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-xl mb-6">Liens Rapides</h4>
            <ul className="space-y-3">
              {[
                { href: "#about", label: "À propos de nous" },
                { href: "#programs", label: "Nos Programmes" },
                { href: "#impact", label: "Notre Impact" },
                { href: "#partners", label: "Partenaires" },
                { href: "#perspectives", label: "Perspectives 2026" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Remerciements */}
          <div>
            <h4 className="font-bold text-xl mb-6">Remerciements</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Nous remercions le CRIPEN pour son soutien sur l&apos;achat de manuels scolaires. 
              Le MASS pour les bons d&apos;achats habits des orphelins (2018-2019). 
              Le Président de la Commune de Boulaos pour son accompagnement.
            </p>
            <Link href="#contact" className="btn bg-accent text-white hover:bg-accent-dark inline-flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4" /> Nous écrire
            </Link>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} ABDC - Association pour la Bienfaisance et le Développement Communautaire. Tous droits réservés.
          </p>
          
          {/* Admin Link */}
          <button
            onClick={openAdminLogin}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            title="Accès Administrateur"
          >
            <Lock className="w-3 h-3" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
