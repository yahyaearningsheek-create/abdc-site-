"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import History from "@/components/sections/History";
import VisionMissions from "@/components/sections/VisionMissions";
import Organization from "@/components/sections/Organization";
import Programs from "@/components/sections/Programs";
import Impact from "@/components/sections/Impact";
import Partners from "@/components/sections/Partners";
import Governance from "@/components/sections/Governance";
import Perspectives from "@/components/sections/Perspectives";
import Contact from "@/components/sections/Contact";
import AdminToolbar from "@/components/AdminToolbar";
import Gallery3D from "@/components/Gallery3D";
import ProfessionalGallery from "@/components/ProfessionalGallery";
import { GlobalEditableProvider } from "@/components/EditableText";
import { initFirebaseSync } from "@/store/useStore";

export default function Home() {
  useEffect(() => {
    const unsubscribe = initFirebaseSync();
    return () => unsubscribe();
  }, []);

  return (
    <GlobalEditableProvider>
      <Navbar />
      <main>
        <Hero />
        <Identity />
        <History />
        <VisionMissions />
        <Organization />
        <Programs />
        <Impact />
        <Partners />
        <Governance />
        <Perspectives />
        <ProfessionalGallery />
        <Contact />
        <Gallery3D />
      </main>
      <Footer />
      <AdminToolbar />
    </GlobalEditableProvider>
  );
}
