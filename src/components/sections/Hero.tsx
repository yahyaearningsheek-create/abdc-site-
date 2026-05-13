"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Users, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import EditableText from "@/components/EditableText";

const Hero = () => {
  const { siteData, language } = useStore();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Animated Green Background with Image */}
      <div className="absolute inset-0 z-0">
        {/* Base green gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary to-primary-light z-0" />

        {/* Background image with overlay */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 z-[1]"
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url('/images/Association  ABDC_page-0025.jpg')` }}
          />
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-primary/60 to-primary-dark/90 z-[2]" />

        {/* Animated particles / shapes */}
        <div className="absolute inset-0 z-[3] overflow-hidden">
          <motion.div
            animate={{ y: [-20, 20], x: [-10, 10] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-20 left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ y: [20, -20], x: [10, -10] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [10, -15], x: [-5, 15] }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-white/5 blur-2xl"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img
              src="/logo.png"
              alt="ABDC Logo"
              className="w-28 h-28 mx-auto rounded-full shadow-2xl border-4 border-white/30"
            />
          </motion.div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-lg mb-8 text-white font-medium text-sm"
          >
            <Users className="w-4 h-4" />
            {siteData.members.length} membres actifs depuis 2011
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            <EditableText id={`hero-title-${language}`}>
              {siteData.heroTitle[language]}
            </EditableText>
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 font-semibold mb-6"
          >
            <EditableText id={`hero-subtitle-${language}`}>
              {siteData.heroSubtitle[language]}
            </EditableText>
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-lg md:text-xl text-white/70 italic mb-10"
          >
            &ldquo;Penser Globalement, Agir localement&rdquo;
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="#programs"
              className="btn bg-accent text-white hover:bg-accent-dark shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              {language === "fr" ? "Nos Programmes" : language === "en" ? "Our Programs" : "برامجنا"}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="#contact"
              className="btn border-2 border-white/50 text-white hover:bg-white hover:text-primary w-full sm:w-auto"
            >
              {language === "fr" ? "Devenir Membre" : language === "en" ? "Become a Member" : "انضم إلينا"}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            className="fill-background dark:fill-background-dark"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
