import {
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  count as firestoreCount,
  writeBatch,
  runTransaction as firestoreRunTransaction,
  type QueryConstraint,
  type DocumentData,
  type QueryDocumentSnapshot,
  type DocumentReference,
  type Unsubscribe,
  type QuerySnapshot,
  type Query,
  type FirestoreDataConverter,
  type WithFieldValue,
  type CollectionReference,
  type Transaction,
} from 'firebase/firestore';
import { db } from './config';

interface Pagination {
  page: number;
  perPage: number;
}

interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export async function getDocument<T>(
  collectionPath: string,
  id: string,
  converter?: FirestoreDataConverter<T>
): Promise<T | null> {
  const collectionRef = converter
    ? collection(db, collectionPath).withConverter(converter)
    : collection(db, collectionPath);
  const docRef = doc(collectionRef as CollectionReference<DocumentData>, id) as DocumentReference<T>;
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return converter ? snapshot.data() : (snapshot.data() as T);
}

export async function getDocuments<T>(
  collectionPath: string,
  queryConstraints?: QueryConstraint[],
  converter?: FirestoreDataConverter<T>
): Promise<T[]> {
  const baseCollection = collection(db, collectionPath);
  const collectionRef = converter
    ? baseCollection.withConverter(converter)
    : baseCollection;
  const q = queryConstraints
    ? query(collectionRef as CollectionReference<DocumentData>, ...queryConstraints)
    : collectionRef;
  const snapshot = await getDocs(q as Query<T>);
  return snapshot.docs.map((d) => (converter ? d.data() : (d.data() as T)));
}

export async function addDocument<T extends Record<string, unknown>>(
  collectionPath: string,
  data: T,
  converter?: FirestoreDataConverter<WithFieldValue<T>>
): Promise<DocumentReference> {
  const baseCollection = collection(db, collectionPath);
  const collectionRef = converter
    ? baseCollection.withConverter(converter)
    : baseCollection;
  return addDoc(collectionRef as CollectionReference<DocumentData>, { ...data } as WithFieldValue<T>);
}

export async function updateDocument<T extends Record<string, unknown>>(
  collectionPath: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  const docRef = doc(db, collectionPath, id) as DocumentReference<T>;
  return updateDoc(docRef, data as Partial<DocumentData>);
}

export async function deleteDocument(
  collectionPath: string,
  id: string
): Promise<void> {
  const docRef = doc(db, collectionPath, id);
  return deleteDoc(docRef);
}

export function onSnapshotDocument<T>(
  collectionPath: string,
  id: string,
  callback: (data: T | null) => void,
  converter?: FirestoreDataConverter<T>
): Unsubscribe {
  const collectionRef = converter
    ? collection(db, collectionPath).withConverter(converter)
    : collection(db, collectionPath);
  const docRef = doc(collectionRef as CollectionReference<DocumentData>, id) as DocumentReference<T>;
  return onSnapshot(docRef, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    callback(converter ? snapshot.data() : (snapshot.data() as T));
  });
}

export function onSnapshotCollection<T>(
  collectionPath: string,
  queryConstraints: QueryConstraint[],
  callback: (data: T[]) => void,
  converter?: FirestoreDataConverter<T>
): Unsubscribe {
  const baseCollection = collection(db, collectionPath);
  const collectionRef = converter
    ? baseCollection.withConverter(converter)
    : baseCollection;
  const q = query(collectionRef as CollectionReference<DocumentData>, ...queryConstraints) as Query<T>;
  return onSnapshot(q, (snapshot: QuerySnapshot<T>) => {
    const data = snapshot.docs.map((d) =>
      converter ? d.data() : (d.data() as T)
    );
    callback(data);
  });
}

export async function queryDocuments<T>(
  collectionPath: string,
  queryConstraints: QueryConstraint[],
  converter?: FirestoreDataConverter<T>
): Promise<T[]> {
  return getDocuments<T>(collectionPath, queryConstraints, converter);
}

export async function countDocuments<T>(
  collectionPath: string,
  queryConstraints?: QueryConstraint[]
): Promise<number> {
  const baseCollection = collection(db, collectionPath);
  const q = queryConstraints
    ? query(baseCollection, ...queryConstraints)
    : baseCollection;
  const snapshot = await getDocs(q as Query<T>);
  return snapshot.size;
}

export interface BatchOperation {
  type: 'set' | 'update' | 'delete';
  collectionPath: string;
  id: string;
  data?: Record<string, unknown>;
}

export async function batchWrite(
  operations: BatchOperation[]
): Promise<void> {
  const batch = writeBatch(db);
  for (const op of operations) {
    const docRef = doc(db, op.collectionPath, op.id);
    switch (op.type) {
      case 'set':
        if (!op.data) throw new Error('Data required for set operation');
        batch.set(docRef, op.data);
        break;
      case 'update':
        if (!op.data) throw new Error('Data required for update operation');
        batch.update(docRef, op.data);
        break;
      case 'delete':
        batch.delete(docRef);
        break;
    }
  }
  await batch.commit();
}

export async function runTransaction<T>(
  callback: (transaction: Transaction) => Promise<T>
): Promise<T> {
  return firestoreRunTransaction(db, callback as (transaction: Transaction) => Promise<T>);
}

export function paginatedQueryConstraints(
  options: {
    page?: number;
    pageSize?: number;
    orderByField?: string;
    orderDirection?: 'asc' | 'desc';
    startAfterDoc?: QueryDocumentSnapshot;
  } = {}
): QueryConstraint[] {
  const {
    page = 1,
    pageSize = 20,
    orderByField = 'createdAt',
    orderDirection = 'desc',
    startAfterDoc,
  } = options;

  const constraints: QueryConstraint[] = [
    orderBy(orderByField, orderDirection),
    firestoreLimit(pageSize),
  ];

  if (page > 1 && startAfterDoc) {
    constraints.push(startAfter(startAfterDoc));
  }

  return constraints;
}
