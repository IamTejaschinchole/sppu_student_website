import { firebaseReady } from '../firebase.js';

export async function updatePublicProfile(userId, profileData) {
  const services = await firebaseReady;
  const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
  const profileRef = doc(services.db, 'publicProfiles', userId);

  await setDoc(profileRef, {
    ...profileData,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function ensurePublicProfile(user) {
  if (!user) {
    return;
  }

  const services = await firebaseReady;
  const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
  const profileRef = doc(services.db, 'publicProfiles', user.uid);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    await setDoc(profileRef, {
      displayName: user.displayName || user.email?.split('@')[0] || 'Student',
      photoURL: user.photoURL || '',
      bio: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
}
