// @flow

export type FirebaseAuth = {
    isLoaded: boolean,
    isEmpty: boolean,
    uid?: string,
    displayName?: string,
    email?: string,
    photoURL?: string
};

export function getViewerFromAuth(auth: FirebaseAuth) {
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
