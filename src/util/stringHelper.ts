

export function base64EncodeString(value: string): string {
  return btoa(value);
}

export function base64DecodeString(value: string): string {
  return atob(value);
}
