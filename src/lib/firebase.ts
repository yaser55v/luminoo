import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDJnsX9hvqoytdrkmV61l2hPggChkR5eFM",
  authDomain: "luminoo-2b5a2.firebaseapp.com",
  projectId: "luminoo-2b5a2",
  storageBucket: "luminoo-2b5a2.firebasestorage.app",
  messagingSenderId: "616346724616",
  appId: "1:616346724616:web:bc62b2b43fe8a31b3964bd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);