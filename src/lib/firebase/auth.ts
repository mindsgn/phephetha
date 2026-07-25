import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  type User,
  type UserCredential,
  type IdTokenResult,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { auth, db } from './config';
import type { User as AppUser, UserRole } from '@/types';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  await firebaseUpdateProfile(credential.user, { displayName });
  await createUserDocument(credential.user, { displayName });
  return credential;
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const credential = await signInWithPopup(auth, googleProvider);
  const existingDoc = await getDoc(doc(db, 'users', credential.user.uid));
  if (!existingDoc.exists()) {
    await createUserDocument(credential.user);
  }
  return credential;
}

export async function signOut(): Promise<void> {
  return firebaseSignOut(auth);
}

export async function resetPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(auth, email);
}

export async function verifyEmail(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return sendEmailVerification(user);
}

export async function updateProfile(
  data: { displayName?: string | null; photoURL?: string | null }
): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return firebaseUpdateProfile(user, data);
}

export function onAuthStateChanged(
  callback: (user: User | null) => void
): () => void {
  return firebaseOnAuthStateChanged(auth, callback);
}

export function getCurrentUser(): User | null {
  return auth.currentUser;
}

export async function getIdTokenResult(): Promise<IdTokenResult> {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user');
  return user.getIdTokenResult();
}

export async function getAllUsers(): Promise<AppUser[]> {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    uid: doc.id,
    ...doc.data(),
  })) as AppUser[];
}

export async function setCustomUserClaims(
  uid: string,
  claims: Record<string, unknown>
): Promise<void> {
  const httpsCallable = (await import('firebase/functions')).httpsCallable;
  const { functions } = await import('./config');
  const fn = httpsCallable(functions, 'setCustomUserClaims');
  await fn({ uid, claims });
}

export async function createUserDocument(
  user: User,
  additionalData?: Partial<AppUser>
): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const now = new Date().toISOString();
    const data: Record<string, unknown> = {
      email: user.email ?? '',
      displayName: user.displayName ?? additionalData?.displayName ?? '',
      photoURL: user.photoURL ?? undefined,
      phoneNumber: user.phoneNumber ?? undefined,
      role: (additionalData?.role as UserRole) ?? 'customer',
      isActive: true,
      isEmailVerified: user.emailVerified,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
      ...additionalData,
    };

    await setDoc(userRef, { uid: user.uid, ...data });
  } else {
    const { setDoc: _setDoc } = await import('firebase/firestore');
    await _setDoc(userRef, { lastLoginAt: new Date().toISOString() }, { merge: true });
  }
}
