import { create } from "zustand"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import type { User, UserRole } from "@/types"

interface AuthState {
  user: FirebaseUser | null
  userData: User | null
  loading: boolean
  initialized: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: string }>
  signInWithGoogle: () => Promise<{ error?: string }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
  refreshUserData: () => Promise<void>
  setUser: (user: FirebaseUser | null) => void
  isAdmin: () => boolean
  hasRole: (role: UserRole) => boolean
  initialize: () => () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  userData: null,
  loading: true,
  initialized: false,

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true })
      await signInWithEmailAndPassword(auth, email, password)
      return {}
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to sign in"
      set({ loading: false })
      return { error: message }
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      set({ loading: true })
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      const userDoc: User = {
        uid: credential.user.uid,
        email,
        displayName: name,
        role: "customer",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      await setDoc(doc(db, "users", credential.user.uid), {
        ...userDoc,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      set({ userData: userDoc })
      return {}
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to create account"
      set({ loading: false })
      return { error: message }
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ loading: true })
      const provider = new GoogleAuthProvider()
      const credential = await signInWithPopup(auth, provider)
      const userRef = doc(db, "users", credential.user.uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        const newUser: User = {
          uid: credential.user.uid,
          email: credential.user.email || "",
          displayName: credential.user.displayName || "",
          photoURL: credential.user.photoURL || undefined,
          role: "customer",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        await setDoc(userRef, {
          ...newUser,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
        set({ userData: newUser })
      }
      return {}
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to sign in with Google"
      set({ loading: false })
      return { error: message }
    }
  },

  logout: async () => {
    await signOut(auth)
    set({ user: null, userData: null })
  },

  resetPassword: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      return {}
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to send reset email"
      return { error: message }
    }
  },

  refreshUserData: async () => {
    const { user } = get()
    if (!user) return
    const userSnap = await getDoc(doc(db, "users", user.uid))
    if (userSnap.exists()) {
      set({ userData: userSnap.data() as User })
    }
  },

  setUser: (user: FirebaseUser | null) => {
    set({ user })
  },

  isAdmin: () => {
    const { userData } = get()
    return userData?.role === "admin"
  },

  hasRole: (role: UserRole) => {
    const { userData } = get()
    return userData?.role === role
  },

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      set({ user, loading: false, initialized: true })
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid))
        if (userSnap.exists()) {
          set({ userData: userSnap.data() as User })
        }
      } else {
        set({ userData: null })
      }
    })
    return unsubscribe
  },
}))
