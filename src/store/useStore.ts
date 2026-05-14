import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  onSiteDataChange, initSiteData, updateCustomText,
  addMemberFB, removeMemberFB, addPresidentFB, removePresidentFB,
  addGalleryImage, removeGalleryImage, addPhotoFB, removePhotoFB, updatePassword, getPassword,
  type SiteDataFirebase
} from '@/lib/firebaseService';

export type Language = 'fr' | 'ar' | 'en';

export interface Member {
  id: string;
  name: string;
  role?: string;
}

export interface President {
  id: string;
  period: string;
  name: string;
  image?: string;
  isCurrent?: boolean;
}

export interface Photo {
  id: string;
  src: string;
  title: string;
  category: string;
}

interface SiteData {
  heroTitle: { fr: string; en: string; ar: string };
  heroSubtitle: { fr: string; en: string; ar: string };
  members: Member[];
  presidents: President[];
  customTexts: Record<string, string>;
  galleryImages: string[]; // Still keep this for the document pages
  photos: Photo[]; // New field for professional photos
}

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  siteData: SiteData;
  firebaseReady: boolean;
  setFirebaseReady: (ready: boolean) => void;
  updateSiteData: (data: Partial<SiteData>) => void;
  setCustomText: (key: string, value: string) => Promise<void>;
  getCustomText: (key: string, fallback: string) => string;
  addMember: (member: Member) => void;
  removeMember: (id: string) => void;
  addPresident: (president: President) => void;
  removePresident: (id: string) => void;
  addGalleryImg: (base64: string) => void;
  removeGalleryImg: (url: string) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
}

const rawMembers = [
  "Abdisalam djibril amir","Fatouma abdi houssien","Sahal axmed adan","Hodan osman adan",
  "Mahdi DJAMA nour","Fosiya cabdi cabdillahi","Casha ahmed micaad","Hodan dayib houssien",
  "Souleiman Dayib houssien","Dayib houssien igeh","Maryan nour cabdi","Fatouma abdi qaalib",
  "muna med Ibrahim","Cadar nour aareh","Sahra Mahamoud ali","Amina oumar dhimbiil",
  "Saida abdilaahi cukur","Halima abdi Abdillahi","Hamda abdi Abdillahi","Siraad muse qalinleh",
  "Hibo mouhoumed Abdillahi","JAWHAR mouhoumed idleh","ahmed abdi ali","kafiya abdikarim Abdillahi",
  "farduusa mouse med","Sahra Ibrahim cindi","Qureesho Ibrahim cabdi","Nimco nour libaan",
  "Saxardiid aadan libaan","Mawa abdi houssien","Ifraax Mahamoud Hassan","Maryan nour Farah",
  "Abdilaahi said djama","MED ABDILLAHI SAID","Ali mouse dixood","Ilhaan houssien dahir",
  "Amina ibrahim yusuf","Hodan houssien ahmed","Hawa abdilaahi WARSAME","HAWEEYA ABDIRASHIID",
  "Loula ismacil libaan","Mahdi yonis cidhereh","Fosiya farax nour","Jamaal mouse adan",
  "Med Moumin barkhad","Ifraax dhabar geedi","Abdi Ahmed Abdilahi","Ali mouse Abdirahman",
  "Wahiba abdi ducaaleh","BOUH AHMED ABDI","Kawsar Mahamoud MAYGAG","Fadxiya cabaade cawaleh",
  "Cawo cawaleh houssien","Hamze Mohamed Abdillahi","Ahmed dahir osman","Mukhtaar buuni",
  "Canab warsame dhimbiil","MED omar mouhoumed","Layla Ibrahim nour","Amina ibrahim nour",
  "Raaxo muuse Moumin","Faduma muse barkhad","Johara houssien ahmed","Mustafe houssien muxumed",
  "Mustafe hassan Deheyeh","OUBAH ELMI ABDI","Abdikarim Abdillahi qawrah","Hibo abdikarim Abdillahi",
  "Canab xaamud cumar","Med adan ahmed","Faysal osman idiris","Muxubo abdi farax",
  "Ilhaan faysal osman","Shugri MED idiris","Med idiris muxumed","Abdikarim MED dahir",
  "Qamar jamac digood","Abdifatah houssien","Abdulkadir houssien","Abdirahim Moud Ali",
  "Saynab dahir kahin","Madina buraalleh houssien","Cibaado bile dharaar","Souleiman ahmed yousouf",
  "Med adan DJAMA","Fadxiya hassan ahmed","Hamoud geleh gadiid","Kimiya kamil maydhaneh",
  "Hassan kamil maydhaneh","Sacada kamil maydhaneh","HASAN Abdillahi cukur","Hamda abdi muse",
  "Sacada cilmi omar","Ubax geesaleh adan","Xabiiba houssien ceelabe","Ubax barkhad",
  "Casha cali xadi","Deka moussa qalinleh","Saado xaashin","Wiilo buux XIRSI",
  "Sahra ismacil xadi","Fatouma ahmed","Deka Mahamoud","Nimco axmed obsiye",
  "Ahmed yasin osman","Adan farax ali","Deka abdi Moumin","Arab nour adan",
  "Deka bashir Ibrahim","Abdulkadir Ibrahim Ahmed","Fadxiya dahir mouhoumed","Haboon houssien Mahamoud",
  "Ilyaas maxamuud abdi","Med moud hassan","Hibo moud hassan","Nimco hassan Deheyeh",
  "IKRAN MOUD BOKH","Hamda Djama Hassan","Abdi HASHIN AADAN","Cadar houssien Ismael",
  "Kadra siyaad digood","Moukhar ilmi dahir","Rabica abdi adan","Haboon dahir cali",
  "SHUCAYB AADAN AHMED","Med amiin SHUCAYB","Ilhaan dayib nour","Abdillahi med Ibrahim",
  "Abdi hassan fadul","Ahmed Mahamoud wacaysay","Asma abdi Ahmed","Khalid Abdirahman ismacil",
  "Fatouma med ali","Halimo farax dahir","Oumalkaire yousuf suldaan","Deka dahir",
  "Ilyaas maxamuud abdi","Cali Ibrahim geedi","Abdiqani Abdilahi Ahmed","Nasra mouhoumed Mahamoud",
  "Asma farxaan cali","JAWHAR AADAN ABDI","JAWHAR AHMED WARSAME","Hodan nour ELMI",
  "Anisa Abdillahi cali","Xawa suge DJAMA","Ifraax hassan sugaal","Xalimo abdilaahi",
  "Misra med oumar","Abdi med mouhoumed","Jamal cawaleh Farah","Abshir omar Ahmed",
  "Muxiyadin mahamed adan","Casha jamac bahdoon","Mustafe houssien muxumed","Abdillahi MAYGAG",
  "Med Abdillahi MAYGAG","Ismacil abdi Abdillahi","Ayaan mouhoumed","Moussa houssien EGEH",
  "Abdisalam mouhoumed","med abdi JAMAC","ahmed dayib dahir","Filsan med oumar",
  "Ifraax med oumar","Jamaal med idiris","Abdi dhool bashir","Abdirahman maxamed yousouf",
  "Filsan yoonis sugaal","Rahma Abdirahman","Abubakar Abdirahman","Mawliid ahmed ELMI",
  "Filsan hassan dahir","Bashir khayr DOON","ELMI goureh oumar","Abdisamad barkhad",
  "Hawa yousouf suldaan","Mahamed cawaleh","Suleekha abdi muse","Abdihakin dayib muse",
  "Mawliid abdi HABANE","Mahamed ahmed ELMI","Farax wayrax diriye","Quraysh qalinleh WARSAME",
  "Hodan Abdilahi Ibrahim","Burco nour aadan","Abdirahman bashir Ibrahim","Filsan maydhaneh Ibrahim",
  "Mahamed farxye","Hodan abdi idleh","Hassan med ali","Abdirahman ali guelle",
  "Saynab jegreh Abdillahi","Dalmar said Ibrahim","Shamsadin mahad ELMI","HASHIN DAHIR MEGANEH",
  "cibaado hussien maydhaneh","Hassan houssien","Mahamed abdi nour","Mustafa MED ELMI",
  "mawliid mouse mouhoumed","Idiris abdi hassan","Mustafe mahamed ELMI"
];

const mappedMembers: Member[] = rawMembers.map((name, index) => ({
  id: (index + 1).toString(),
  name: name.trim(),
  role: index === 0 ? "Président Association ABDC" : "Membre Actif",
}));

const initialPresidents: President[] = [
  { id: '1', period: '2011-2012', name: 'Abdillahi Ciise' },
  { id: '2', period: '2013', name: 'Ziyaad Farax' },
  { id: '3', period: '2014-2015', name: 'Hassan Abdi' },
  { id: '4', period: '2016', name: 'Abdillahi Said' },
  { id: '5', period: '2017', name: 'Djemal Mohamed' },
  { id: '6', period: '2018-2019', name: 'Faycal Isman Idriss' },
  { id: '7', period: '2020', name: 'Chouaib Aden Ahmed' },
  { id: '8', period: '2020 (Intérim)', name: 'Mme Madina Bouraleh Houssein' },
  { id: '9', period: '2024', name: 'Abdikkarim Souleiman Said' },
  { id: '10', period: 'Président actuel', name: 'Mr. Mohamed Moumin Barkhadleh', isCurrent: true },
];

const initialSiteData: SiteData = {
  heroTitle: {
    fr: "Association pour la Bienfaisance et le Développement Communautaire",
    en: "Association for Charity and Community Development",
    ar: "جمعية الإحسان وتنمية المجتمع"
  },
  heroSubtitle: {
    fr: "ABDC - Quartier 5 et Branche Balbala",
    en: "ABDC - District 5 and Balbala Branch",
    ar: "ABDC - الحي 5 وفرع بلبلا"
  },
  members: mappedMembers,
  presidents: initialPresidents,
  customTexts: {},
  galleryImages: [],
  photos: [],
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      setLanguage: (lang) => set({ language: lang }),
      isAdminMode: false,
      setAdminMode: (mode) => set({ isAdminMode: mode }),
      firebaseReady: false,
      setFirebaseReady: (ready) => set({ firebaseReady: ready }),
      siteData: initialSiteData,
      updateSiteData: (data) =>
        set((state) => ({
          siteData: { ...state.siteData, ...data },
        })),
      setCustomText: async (key, value) => {
        // Optimistic update
        set((state) => ({
          siteData: {
            ...state.siteData,
            customTexts: { ...(state.siteData.customTexts || {}), [key]: value },
          },
        }));
        // Persist to Firebase
        try {
          await updateCustomText(key, value);
        } catch (error) {
          console.error("Firebase update failed:", error);
          // Optional: revert state if needed
        }
      },
      getCustomText: (key, fallback) => {
        const custom = (get().siteData?.customTexts || {})[key];
        return custom !== undefined ? custom : fallback;
      },
      addMember: (member) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            members: [...state.siteData.members, member],
          },
        }));
        addMemberFB(member).catch(console.error);
      },
      removeMember: (id) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            members: state.siteData.members.filter((m) => m.id !== id),
          },
        }));
        removeMemberFB(id).catch(console.error);
      },
      addPresident: async (president) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            presidents: [...state.siteData.presidents, president],
          },
        }));
        addPresidentFB(president).catch(console.error);
      },
      removePresident: (id) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            presidents: state.siteData.presidents.filter((p) => p.id !== id),
          },
        }));
        removePresidentFB(id).catch(console.error);
      },
      addGalleryImg: async (base64) => {
        try {
          await addGalleryImage(base64);
          set((state) => ({
            siteData: {
              ...state.siteData,
              galleryImages: [...state.siteData.galleryImages, base64],
            },
          }));
        } catch (e) {
          console.error('Gallery upload failed:', e);
        }
      },
      removeGalleryImg: (url) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            galleryImages: state.siteData.galleryImages.filter((u) => u !== url),
          },
        }));
        removeGalleryImage(url).catch(console.error);
      },
      addPhoto: (photo) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            photos: [...(state.siteData.photos || []), photo],
          },
        }));
        addPhotoFB(photo).catch(console.error);
      },
      removePhoto: (id) => {
        set((state) => ({
          siteData: {
            ...state.siteData,
            photos: (state.siteData.photos || []).filter((p) => p.id !== id),
          },
        }));
        removePhotoFB(id).catch(console.error);
      },
    }),
    {
      name: 'abdc-storage',
      partialize: (state) => ({
        language: state.language,
        isAdminMode: state.isAdminMode,
      }),
    }
  )
);

// ============ FIREBASE SYNC ============
export function initFirebaseSync() {
  const store = useStore.getState();
  
  const defaultFirebaseData: SiteDataFirebase = {
    heroTitle: store.siteData.heroTitle,
    heroSubtitle: store.siteData.heroSubtitle,
    members: store.siteData.members,
    presidents: store.siteData.presidents,
    customTexts: store.siteData.customTexts,
    galleryImages: store.siteData.galleryImages || [],
    photos: store.siteData.photos || [],
    password: 'abdc2025',
  };
  
  initSiteData(defaultFirebaseData).catch(console.error);

  const unsubscribe = onSiteDataChange((data) => {
    const storeState = useStore.getState();
    
      // Helper to merge lists by ID
      const mergeById = (initial: any[], remote: any[] = []) => {
        const map = new Map();
        initial.forEach(item => map.set(item.id, item));
        remote.forEach(item => map.set(item.id, item));
        return Array.from(map.values());
      };

      useStore.setState({
        firebaseReady: true,
        siteData: {
          ...storeState.siteData,
          heroTitle: { ...initialSiteData.heroTitle, ...data.heroTitle },
          heroSubtitle: { ...initialSiteData.heroSubtitle, ...data.heroSubtitle },
          members: mergeById(initialSiteData.members, data.members),
          presidents: mergeById(initialSiteData.presidents, data.presidents),
          customTexts: data.customTexts || {},
          galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
          photos: Array.isArray(data.photos) ? data.photos : [],
        },
      });
  });

  return unsubscribe;
}
