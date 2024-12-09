import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from './firebase';
import { store } from '@/store';
import { setUser, logout } from '@/store/slices/authSlice';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export type Provider = 'google' | 'facebook';

export async function signInWithProvider(providerName: Provider) {
  try {
    const provider = providerName === 'google' ? googleProvider : facebookProvider;
    const result = await signInWithPopup(auth, provider);
    
    store.dispatch(setUser({
      uid: result.user.uid,
      email: result.user.email!,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    }));

    return result.user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    store.dispatch(setUser({
      uid: result.user.uid,
      email: result.user.email!,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    }));

    return result.user;
  } catch (error) {
    console.error('Email sign in error:', error);
    throw error;
  }
}

export async function signUpWithEmail(email: string, password: string) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    store.dispatch(setUser({
      uid: result.user.uid,
      email: result.user.email!,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    }));

    return result.user;
  } catch (error) {
    console.error('Email sign up error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth);
    store.dispatch(logout());
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}