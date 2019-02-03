export interface FirebaseAuth {
  isLoaded: boolean;
  isEmpty: boolean;
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface Viewer {
  id?: string;
  name?: string;
  email?: string;
  imageUrl?: string;
}

export function getViewerFromAuth(auth: FirebaseAuth): Viewer | null {
  if (!auth.isLoaded || auth.isEmpty) {
    return null;
  }
  return {
    id: auth.uid,
    name: auth.displayName,
    email: auth.email,
    imageUrl: auth.photoURL
  };
}
