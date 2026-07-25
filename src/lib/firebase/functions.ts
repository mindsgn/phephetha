import { httpsCallable, type HttpsCallableResult } from 'firebase/functions';
import { functions } from './config';

export async function callFunction<TData = unknown, TResult = unknown>(
  name: string,
  data?: TData
): Promise<TResult> {
  const callable = httpsCallable<TData, TResult>(functions, name);
  const result: HttpsCallableResult<TResult> = await callable(data as TData);
  return result.data;
}
