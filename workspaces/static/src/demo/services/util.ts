import ky from "ky";

export function apiGet<T>(path: string): Promise<T> {
  return ky.get(path).json();
}

export function apiPost<T>(path: string, data: Partial<T>): Promise<T> {
  return ky.post(path, { json: data }).json();
}

export function apiDelete(path: string) {
  return ky.delete(path);
}

export function apiPut<T>(path: string, data: Partial<T>): Promise<T> {
  return ky.put(path, { json: data }).json();
}

export function apiPatch<T>(path: string, data: Partial<T>): Promise<T> {
  return ky.patch(path, { json: data }).json();
}
