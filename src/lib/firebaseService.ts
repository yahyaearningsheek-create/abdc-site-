import { db } from './firebase';
import {
  doc, getDoc, setDoc, updateDoc,
  onSnapshot
} from 'firebase/firestore';

const SITE_DOC = 'site/data';

export interface FirebaseMember {
  id: string;
  name: string;
  role?: string;
}

export interface FirebasePresident {
  id: string;
  period: string;
  name: string;
  image?: string; // base64 string stored directly in Firestore
  isCurrent?: boolean;
}

export interface SiteDataFirebase {
  members: FirebaseMember[];
  presidents: FirebasePresident[];
  customTexts: Record<string, string>;
  galleryImages: string[]; // base64 strings stored directly in Firestore
  password: string;
}

// ============ INIT DATA ============
export async function initSiteData(defaultData: SiteDataFirebase): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (!snap.exists()) {
    await setDoc(docRef, defaultData);
  }
}

// ============ GET DATA ============
export async function getSiteData(): Promise<SiteDataFirebase | null> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as SiteDataFirebase) : null;
}

// ============ REALTIME LISTENER ============
export function onSiteDataChange(callback: (data: SiteDataFirebase) => void) {
  const docRef = doc(db, 'site', 'data');
  return onSnapshot(docRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as SiteDataFirebase);
    }
  });
}

// ============ UPDATE CUSTOM TEXTS ============
export async function updateCustomText(key: string, value: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  await updateDoc(docRef, {
    [`customTexts.${key}`]: value
  });
}

// ============ MEMBERS ============
export async function addMemberFB(member: FirebaseMember): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    await updateDoc(docRef, { members: [...data.members, member] });
  }
}

export async function removeMemberFB(id: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    await updateDoc(docRef, { members: data.members.filter(m => m.id !== id) });
  }
}

// ============ PRESIDENTS ============
export async function addPresidentFB(president: FirebasePresident): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    await updateDoc(docRef, { presidents: [...data.presidents, president] });
  }
}

export async function removePresidentFB(id: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    await updateDoc(docRef, { presidents: data.presidents.filter(p => p.id !== id) });
  }
}

// ============ GALLERY (base64 dans Firestore) ============
export async function addGalleryImage(base64: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    const images = data.galleryImages || [];
    await updateDoc(docRef, { galleryImages: [...images, base64] });
  }
}

export async function removeGalleryImage(base64: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    const data = snap.data() as SiteDataFirebase;
    await updateDoc(docRef, { galleryImages: (data.galleryImages || []).filter(img => img !== base64) });
  }
}

// ============ PASSWORD ============
export async function updatePassword(newPassword: string): Promise<void> {
  const docRef = doc(db, 'site', 'data');
  await updateDoc(docRef, { password: newPassword });
}

export async function getPassword(): Promise<string> {
  const data = await getSiteData();
  return data?.password || 'abdc2025';
}
