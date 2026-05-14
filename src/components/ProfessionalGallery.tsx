"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Images, X, ChevronLeft, ChevronRight, Maximize2, 
  Plus, Trash2, Upload, Filter, Grid, Layout
} from "lucide-react";
import { useStore, Photo } from "@/store/useStore";

const CATEGORIES = ["Tout", "Activités", "Événements", "Social", "Donations", "Éducation"];

const ProfessionalGallery = () => {
  const { siteData, isAdminMode, addPhoto, removePhoto } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  
  // Form state
  const [newPhotoSrc, setNewPhotoSrc] = useState("");
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState("Activités");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photos = siteData?.photos || [];

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "Tout") return photos;
    return photos.filter(p => p.category === selectedCategory);
  }, [photos, selectedCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewPhotoSrc(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = () => {
    if (!newPhotoSrc) return;
    const newPhoto: Photo = {
      id: Date.now().toString(),
      src: newPhotoSrc,
      title: newPhotoTitle || "Sans titre",
      category: newPhotoCategory
    };
    addPhoto(newPhoto);
    setNewPhotoSrc("");
    setNewPhotoTitle("");
    setIsAdding(false);
  };

  const nextPhoto = () => {
    if (!selectedPhoto) return;
    const idx = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIdx = (idx + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const prevPhoto = () => {
    if (!selectedPhoto) return;
    const idx = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const prevIdx = (idx - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 bg-gray-50 dark:bg-gray-900/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-text dark:text-white mb-4">Galerie de l&apos;ABDC</h2>
            <div className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6" />
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Découvrez nos activités et nos moments forts en images. Une organisation transparente au service de la communauté.
            </p>
          </motion.div>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {isAdminMode && (
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-full font-bold shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Ajouter une Photo
            </button>
          )}
        </div>

        {/* Grid View */}
        {filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{photo.category}</span>
                    <h3 className="text-white font-bold text-lg mb-2">{photo.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                      {isAdminMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(photo.id);
                          }}
                          className="bg-red-500/80 hover:bg-red-500 p-2 rounded-full text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Images className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-500">Aucune photo dans cette catégorie</h3>
            {isAdminMode && <p className="text-gray-400 mt-2">Commencez par ajouter des photos professionnelles.</p>}
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden sm:block"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hidden sm:block"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.img
                  key={selectedPhoto.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
                <div className="mt-6 text-center text-white">
                  <span className="inline-block px-3 py-1 bg-accent rounded-full text-xs font-bold mb-2 uppercase">{selectedPhoto.category}</span>
                  <h3 className="text-2xl font-bold">{selectedPhoto.title}</h3>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Photo Modal */}
        <AnimatePresence>
          {isAdding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[210] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsAdding(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Upload className="w-5 h-5 text-accent" /> Ajouter une Photo Pro
                  </h3>
                  <button onClick={() => setIsAdding(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-4">
                  <div 
                    className="aspect-video rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:border-accent transition-colors overflow-hidden"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {newPhotoSrc ? (
                      <img src={newPhotoSrc} className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <Upload className="w-10 h-10 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">Cliquer pour choisir une image</p>
                      </>
                    )}
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre de la photo</label>
                    <input 
                      type="text" 
                      value={newPhotoTitle} 
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      placeholder="Ex: Distribution de repas..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
                    <select 
                      value={newPhotoCategory} 
                      onChange={(e) => setNewPhotoCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none focus:ring-2 focus:ring-accent"
                    >
                      {CATEGORIES.filter(c => c !== "Tout").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
                  <button onClick={() => setIsAdding(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Annuler
                  </button>
                  <button 
                    onClick={handleAddPhoto}
                    disabled={!newPhotoSrc}
                    className="flex-1 bg-accent hover:bg-accent-dark text-white py-3 rounded-xl font-bold shadow-lg disabled:opacity-50 transition-all"
                  >
                    Publier
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProfessionalGallery;
