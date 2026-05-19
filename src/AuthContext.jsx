import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext(null);

function getDisplayName(user) {
  return user.displayName || user.email?.split('@')[0] || 'SPPU Student';
}

async function ensureUserDocument(user) {
  if (!user) {
    return;
  }

  const userRef = doc(db, 'users', user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: getDisplayName(user),
      email: user.email || '',
      photoURL: user.photoURL || '',
      providerIds: user.providerData.map((provider) => provider.providerId),
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });
  } else {
    await setDoc(
      userRef,
      {
        name: getDisplayName(user),
        email: user.email || '',
        photoURL: user.photoURL || '',
        providerIds: user.providerData.map((provider) => provider.providerId),
        lastLoginAt: serverTimestamp(),
      },
      { merge: true },
    );
  }
}

async function saveUserDocumentSafely(user) {
  try {
    await ensureUserDocument(user);
  } catch (error) {
    console.error('Unable to save user profile to Firestore', error);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        saveUserDocumentSafely(firebaseUser);
      }
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      loginWithEmail: async (email, password, rememberMe = true) => {
        try {
          await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
          const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
          await saveUserDocumentSafely(credential.user);
          return credential.user;
        } catch (error) {
          console.error('Email sign-in error:', error?.code, error?.message, error);
          throw error;
        }
      },
      registerWithEmail: async (name, email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);

        if (name.trim()) {
          await updateProfile(credential.user, { displayName: name.trim() });
        }

        const currentUser = auth.currentUser || credential.user;
        setUser({ ...currentUser });
        await saveUserDocumentSafely(currentUser);
        return currentUser;
      },
      loginWithGoogle: async () => {
        try {
          const googleProvider = new GoogleAuthProvider();
          googleProvider.setCustomParameters({ prompt: 'select_account' });
          googleProvider.addScope('profile');
          googleProvider.addScope('email');

          const credential = await signInWithPopup(auth, googleProvider);
          await saveUserDocumentSafely(credential.user);
          return credential.user;
        } catch (error) {
          console.error('Google sign-in error:', error?.code, error?.message, error);
          throw error;
        }
      },
      resetPassword: async (email) => {
        try {
          await sendPasswordResetEmail(auth, email.trim());
        } catch (error) {
          console.error('Password reset error:', error?.code, error?.message, error);
          throw error;
        }
      },
      updateDisplayName: async (name) => {
        const nextName = name.trim();

        if (!auth.currentUser || !nextName) {
          return auth.currentUser;
        }

        await updateProfile(auth.currentUser, { displayName: nextName });
        await setDoc(
          doc(db, 'users', auth.currentUser.uid),
          {
            name: nextName,
            email: auth.currentUser.email || '',
            photoURL: auth.currentUser.photoURL || '',
            lastLoginAt: serverTimestamp(),
          },
          { merge: true },
        );
        setUser({ ...auth.currentUser });
        return auth.currentUser;
      },
      logout: () => signOut(auth),
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
