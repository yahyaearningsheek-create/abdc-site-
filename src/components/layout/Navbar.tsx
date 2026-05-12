"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useStore, Language } from "@/store/useStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { language, setLanguage, isAdminMode } = useStore();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang: Record<Language, Language> = { fr: "en", en: "ar", ar: "fr" };
    setLanguage(nextLang[language]);
  };

  const navLinks = [
    { href: "#about", label: language === "fr" ? "À propos" : language === "en" ? "About" : "حول" },
    { href: "#history", label: language === "fr" ? "Historique" : language === "en" ? "History" : "تاريخ" },
    { href: "#programs", label: language === "fr" ? "Programmes" : language === "en" ? "Programs" : "برامج" },
    { href: "#impact", label: language === "fr" ? "Impact" : language === "en" ? "Impact" : "تأثير" },
    { href: "#partners", label: language === "fr" ? "Partenaires" : language === "en" ? "Partners" : "شركاء" },
    { href: "#contact", label: language === "fr" ? "Contact" : language === "en" ? "Contact" : "اتصل" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-background-dark/90 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      {/* Admin mode indicator */}
      {isAdminMode && (
        <div className="bg-primary text-white text-center text-xs py-1 font-medium">
          ✏️ Mode Édition — Cliquez sur les textes pour modifier
        </div>
      )}

      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="ABDC Logo"
            className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-110 transition-transform"
          />
          <span className={`font-bold text-xl tracking-tight ${scrolled ? "text-primary dark:text-white" : "text-white"}`}>
            ABDC
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors hover:text-accent ${
                scrolled ? "text-text dark:text-gray-300" : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              scrolled ? "bg-gray-100 dark:bg-gray-800 text-text dark:text-gray-300" : "bg-white/20 text-white"
            }`}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {language.toUpperCase()}
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 rounded-full transition-colors ${
                scrolled ? "text-text dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" : "text-white hover:bg-white/20"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          <Link href="#contact" className="btn bg-accent text-white hover:bg-accent-dark text-sm px-4 py-2 shadow-md">
            {language === "fr" ? "Nous Contacter" : language === "en" ? "Contact Us" : "اتصل بنا"}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 ${scrolled ? "text-text dark:text-gray-300" : "text-white"}`}
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 ${scrolled ? "text-text dark:text-gray-300" : "text-white"}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-background-dark shadow-lg border-t dark:border-gray-800">
          <nav className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 px-4 text-text dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between py-3 px-4 border-t dark:border-gray-800 mt-2">
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-text dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-bold">
                <Globe className="w-4 h-4" /> {language.toUpperCase()}
              </button>
              <Link href="#contact" onClick={() => setIsOpen(false)} className="text-primary font-bold">
                Contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
