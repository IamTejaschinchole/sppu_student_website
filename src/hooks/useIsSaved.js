import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';

export function useIsSaved(userId, noteId) {
  const [isSaved, setIsSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!userId || !noteId) {
      setIsSaved(false);
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const savedRef = doc(services.db, 'users', userId, 'savedNotes', noteId);

        unsubscribe = onSnapshot(
          savedRef,
          (snapshot) => {
            setIsSaved(snapshot.exists());
          },
          (savedError) => {
            console.error('Unable to check saved state', savedError);
          },
        );
      })
      .catch((initError) => {
        console.error('Firebase init failed', initError);
      });

    return () => unsubscribe();
  }, [userId, noteId]);

  async function toggleSaved() {
    if (!userId || !noteId || busy) {
      return;
    }

    setBusy(true);

    try {
      const services = await firebaseReady;
      const { doc, setDoc, deleteDoc, serverTimestamp } = await import('firebase/firestore');
      const savedRef = doc(services.db, 'users', userId, 'savedNotes', noteId);

      if (isSaved) {
        await deleteDoc(savedRef);
      } else {
        await setDoc(savedRef, {
          noteId,
          savedAt: serverTimestamp(),
        });
      }
    } catch (toggleError) {
      console.error('Unable to toggle saved state', toggleError);
    } finally {
      setBusy(false);
    }
  }

  return { isSaved, busy, toggleSaved };
}