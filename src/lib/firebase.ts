import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCFNbHt6S_KKyM3fNXUf0LoKGVWz3xzqzM",
  authDomain: "abdc-1.firebaseapp.com",
  projectId: "abdc-1",
  storageBucket: "abdc-1.firebasestorage.app",
  messagingSenderId: "238308520775",
  appId: "1:238308520775:web:c20293d99be472bc4fd262"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
