import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
  type UploadMetadata,
  type FullMetadata,
  type ListResult,
  type StorageReference,
} from 'firebase/storage';
import { storage } from './config';

export async function uploadFile(
  path: string,
  file: File | Blob | ArrayBuffer,
  metadata?: UploadMetadata
): Promise<{ url: string; ref: StorageReference }> {
  const storageRef = ref(storage, path);
  const uploadTask = await uploadBytesResumable(storageRef, file, metadata);
  const url = await getDownloadURL(uploadTask.ref);
  return { url, ref: uploadTask.ref };
}

export async function uploadMultipleFiles(
  items: Array<{ path: string; file: File | Blob | ArrayBuffer; metadata?: UploadMetadata }>
): Promise<Array<{ url: string; ref: StorageReference; path: string }>> {
  const results = await Promise.allSettled(
    items.map(async (item) => {
      const { url, ref: storageRef } = await uploadFile(
        item.path,
        item.file,
        item.metadata
      );
      return { url, ref: storageRef, path: item.path };
    })
  );

  return results
    .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof uploadFile>> & { path: string }> =>
      r.status === 'fulfilled'
    )
    .map((r) => r.value);
}

export async function getDownloadURLFromPath(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return getDownloadURL(storageRef);
}

export async function deleteFile(path: string): Promise<void> {
  const storageRef = ref(storage, path);
  return deleteObject(storageRef);
}

export async function listFiles(path: string): Promise<{
  prefixes: string[];
  items: string[];
  fullResult: ListResult;
}> {
  const storageRef = ref(storage, path);
  const result = await listAll(storageRef);
  return {
    prefixes: result.prefixes.map((p) => p.fullPath),
    items: result.items.map((i) => i.fullPath),
    fullResult: result,
  };
}

export async function getFileMetadata(path: string): Promise<FullMetadata> {
  const storageRef = ref(storage, path);
  return getMetadata(storageRef);
}

export function generateUploadPath(
  folder: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const extension = fileName.split('.').pop() ?? 'bin';
  const sanitized = fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `${folder}/${timestamp}-${randomString}-${sanitized}.${extension}`;
}
