import { vi } from "vitest"

export const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  onAuthStateChanged: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}

export const mockFirestore = {
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  collection: vi.fn(),
  onSnapshot: vi.fn(),
}

export const mockStorage = {
  ref: vi.fn(),
  uploadBytes: vi.fn(),
  getDownloadURL: vi.fn(),
  deleteObject: vi.fn(),
}

export const mockApp = {
  name: "[DEFAULT]",
  options: {},
}

vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => mockApp),
  getApps: vi.fn(() => []),
  getApp: vi.fn(() => mockApp),
}))

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => mockAuth),
  signInWithEmailAndPassword: (...args: unknown[]) => mockAuth.signInWithEmailAndPassword(...args),
  createUserWithEmailAndPassword: (...args: unknown[]) => mockAuth.createUserWithEmailAndPassword(...args),
  signInWithPopup: (...args: unknown[]) => mockAuth.signInWithPopup(...args),
  signOut: (...args: unknown[]) => mockAuth.signOut(...args),
  onAuthStateChanged: (...args: unknown[]) => mockAuth.onAuthStateChanged(...args),
  sendPasswordResetEmail: (...args: unknown[]) => mockAuth.sendPasswordResetEmail(...args),
  GoogleAuthProvider: vi.fn(),
}))

vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(() => ({})),
  doc: (...args: unknown[]) => mockFirestore.doc(...args),
  getDoc: (...args: unknown[]) => mockFirestore.getDoc(...args),
  getDocs: (...args: unknown[]) => mockFirestore.getDocs(...args),
  addDoc: (...args: unknown[]) => mockFirestore.addDoc(...args),
  updateDoc: (...args: unknown[]) => mockFirestore.updateDoc(...args),
  deleteDoc: (...args: unknown[]) => mockFirestore.deleteDoc(...args),
  query: (...args: unknown[]) => mockFirestore.query(...args),
  where: (...args: unknown[]) => mockFirestore.where(...args),
  orderBy: (...args: unknown[]) => mockFirestore.orderBy(...args),
  collection: (...args: unknown[]) => mockFirestore.collection(...args),
  onSnapshot: (...args: unknown[]) => mockFirestore.onSnapshot(...args),
}))

vi.mock("firebase/storage", () => ({
  getStorage: vi.fn(() => ({})),
  ref: (...args: unknown[]) => mockStorage.ref(...args),
  uploadBytes: (...args: unknown[]) => mockStorage.uploadBytes(...args),
  getDownloadURL: (...args: unknown[]) => mockStorage.getDownloadURL(...args),
  deleteObject: (...args: unknown[]) => mockStorage.deleteObject(...args),
}))

export function resetMocks() {
  vi.clearAllMocks()
  mockAuth.currentUser = null
  ;(mockAuth.signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockReset()
  ;(mockAuth.createUserWithEmailAndPassword as ReturnType<typeof vi.fn>).mockReset()
  ;(mockAuth.signInWithPopup as ReturnType<typeof vi.fn>).mockReset()
  ;(mockAuth.signOut as ReturnType<typeof vi.fn>).mockReset()
  ;(mockAuth.onAuthStateChanged as ReturnType<typeof vi.fn>).mockReset()
  ;(mockAuth.sendPasswordResetEmail as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.getDoc as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.getDocs as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.addDoc as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.updateDoc as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.deleteDoc as ReturnType<typeof vi.fn>).mockReset()
  ;(mockFirestore.query as ReturnType<typeof vi.fn>).mockReset()
  ;(mockStorage.uploadBytes as ReturnType<typeof vi.fn>).mockReset()
  ;(mockStorage.getDownloadURL as ReturnType<typeof vi.fn>).mockReset()
  ;(mockStorage.deleteObject as ReturnType<typeof vi.fn>).mockReset()
}
