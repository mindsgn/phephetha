import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query"
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  type DocumentData,
  type QueryConstraint,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "@/lib/firebase"

export function useFirestoreDocument<T extends DocumentData>(
  collectionName: string,
  documentId: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
) {
  return useQuery<T, Error>({
    queryKey: [collectionName, documentId],
    queryFn: async () => {
      const snapshot = await getDoc(doc(db, collectionName, documentId))
      if (!snapshot.exists()) {
        throw new Error(`Document ${documentId} not found in ${collectionName}`)
      }
      return { id: snapshot.id, ...snapshot.data() } as unknown as T
    },
    enabled: !!documentId,
    ...options,
  })
}

export function useFirestoreCollection<T extends DocumentData>(
  collectionName: string,
  constraints?: QueryConstraint[],
  options?: Omit<UseQueryOptions<T[], Error>, "queryKey" | "queryFn">,
) {
  return useQuery<T[], Error>({
    queryKey: [collectionName, ...(constraints ?? [])],
    queryFn: async () => {
      const q = query(collection(db, collectionName), ...(constraints ?? []))
      const snapshot = await getDocs(q)
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as unknown as T))
    },
    ...options,
  })
}

interface MutationOptions<TData, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: Error) => void
}

export function useAddDocument<T extends DocumentData>(
  collectionName: string,
  options?: MutationOptions<string, Omit<T, "id" | "createdAt" | "updatedAt">>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Omit<T, "id" | "createdAt" | "updatedAt">) => {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] })
      options?.onSuccess?.(data, variables)
    },
    onError: (error) => {
      options?.onError?.(error as Error)
    },
  })
}

export function useUpdateDocument<T extends DocumentData>(
  collectionName: string,
  options?: MutationOptions<void, { id: string; data: Partial<T> }>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<T> }) => {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] })
      queryClient.invalidateQueries({ queryKey: [collectionName, variables.id] })
      options?.onSuccess?.(_data, variables)
    },
    onError: (error) => {
      options?.onError?.(error as Error)
    },
  })
}

export function useDeleteDocument(
  collectionName: string,
  options?: MutationOptions<void, string>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteDoc(doc(db, collectionName, id))
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: [collectionName] })
      options?.onSuccess?.(_data, id)
    },
    onError: (error) => {
      options?.onError?.(error as Error)
    },
  })
}
