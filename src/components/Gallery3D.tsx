"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Images, X, ChevronLeft, ChevronRight, Maximize2, Upload, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";

const defaultImages = Array.from({ length: 49 }, (_, i) => ({
  src: `/images/Association  ABDC_page-${String(i + 1).padStart(4, '0')}.jpg`,
  label: `Page ${i + 1}`,
}));

const Gallery3D = () => {
  const { isAdminMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [extraImages, setExtraImages] = useState<{ src: string; label: string }[]>(() => {
    try {
      const saved = localStorage.getItem("abdc-gallery-extra");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allImages = [...defaultImages, ...extraImages];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  const handleImageClick = (idx: number) => {
    if (idx === currentIndex) {
      setFullscreen(true);
    } else {
      setCurrentIndex(idx);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target?.result as string;
        const newImg = { src, label: file.name.replace(/\.[^.]+$/, "") };
        setExtraImages((prev) => {
          const updated = [...prev, newImg];
          localStorage.setItem("abdc-gallery-extra", JSON.stringify(updated));
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeExtraImage = (idx: number) => {
    const extraIdx = idx - defaultImages.length;
    if (extraIdx < 0) return;
    setExtraImages((prev) => {
      const updated = prev.filter((_, i) => i !== extraIdx);
      localStorage.setItem("abdc-gallery-extra", JSON.stringify(updated));
      return updated;
    });
    if (currentIndex >= allImages.length - 1) setCurrentIndex(Math.max(0, allImages.length - 2));
  };

  const getCardStyle = (idx: number) => {
    const diff = idx - currentIndex;
    const absDiff = Math.abs(diff);
    if (absDiff > 4) return { display: "none" as const };
    const translateX = diff * 280;
    const translateZ = -absDiff * 120;
    const rotateY = diff * -12;
    const scale = 1 - absDiff * 0.12;
    const opacity = 1 - absDiff * 0.25;
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity: Math.max(0.1, opacity),
      zIndex: 10 - absDiff,
    };
  };

  return (
    <>
      {/* Trigger Button */}
      <div className="flex justify-center py-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all font-bold text-lg"
        >
          <Images className="w-6 h-6" />
          Galerie 3D ({allImages.length} images)
        </motion.button>
      </div>

      {/* Hidden file input for importing images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImport}
        className="hidden"
      />

      {/* 3D Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <h2 className="text-white text-xl font-bold">Galerie ABDC</h2>
                <span className="text-white/50 text-sm">
                  {currentIndex + 1} / {allImages.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Import button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  Importer
                </button>
                {/* Delete extra image */}
                {currentIndex >= defaultImages.length && (
                  <button
                    onClick={() => removeExtraImage(currentIndex)}
                    className="flex items-center gap-2 bg-red-500/30 hover:bg-red-500/50 px-4 py-2 rounded-full text-white text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                )}
                {/* Fullscreen */}
                <button
                  onClick={() => setFullscreen(true)}
                  className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors"
                  title="Voir en plein écran"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 3D Carousel */}
            <div className="relative w-full flex-1 flex items-center justify-center" style={{ perspective: "1200px" }}>
              <div className="relative" style={{ width: "500px", height: "380px", transformStyle: "preserve-3d" }}>
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="absolute inset-0 cursor-pointer"
                    style={{
                      ...getCardStyle(idx),
                      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() => handleImageClick(idx)}
                  >
                    <div className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 flex items-center justify-center bg-black ${
                      idx === currentIndex ? "border-accent shadow-accent/30" : "border-white/10"
                    }`}>
                      <img
                        src={img.src}
                        alt={img.label}
                        className="max-w-full max-h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    {idx === currentIndex && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg text-center font-medium flex items-center justify-center gap-2">
                        {img.label}
                        <Maximize2 className="w-3 h-3 opacity-60" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6 pb-8 pt-4">
              <button onClick={goPrev} className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="flex gap-2 items-center">
                {Array.from({ length: Math.min(11, allImages.length) }, (_, i) => {
                  const startIdx = Math.max(0, Math.min(currentIndex - 5, allImages.length - 11));
                  const actualIdx = startIdx + i;
                  if (actualIdx >= allImages.length) return null;
                  return (
                    <button
                      key={actualIdx}
                      onClick={() => setCurrentIndex(actualIdx)}
                      className={`rounded-md overflow-hidden transition-all border-2 flex items-center justify-center bg-black ${
                        actualIdx === currentIndex
                          ? "w-12 h-8 border-accent opacity-100"
                          : "w-8 h-6 border-transparent opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img src={allImages[actualIdx].src} alt="" className="w-full h-full object-contain" loading="lazy" />
                    </button>
                  );
                })}
              </div>

              <button onClick={goNext} className="bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Image View */}
      <AnimatePresence>
        {fullscreen && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            onClick={() => setFullscreen(false)}
          >
            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Full image */}
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={allImages[currentIndex]?.src}
              alt={allImages[currentIndex]?.label}
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image info bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-4 text-sm">
              <span className="font-bold">{allImages[currentIndex]?.label}</span>
              <span className="opacity-50">|</span>
              <span className="opacity-70">{currentIndex + 1} / {allImages.length}</span>
            </div>

            {/* Close */}
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery3D;
