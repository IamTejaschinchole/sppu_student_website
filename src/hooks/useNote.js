import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';

export function useNote(noteId) {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!noteId) {
      setError('Missing note id.');
      setLoading(false);
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const noteRef = doc(services.db, 'notes', noteId);

        unsubscribe = onSnapshot(
          noteRef,
          (snapshot) => {
            if (!snapshot.exists()) {
              setNote(null);
              setError('Note not found.');
            } else {
              setNote({ id: snapshot.id, ...snapshot.data() });
              setError('');
            }
            setLoading(false);
          },
          (noteError) => {
            console.error('Unable to load note', noteError);
            setError('Unable to load note details. Check Firestore rules.');
            setLoading(false);
          },
        );
      })
      .catch((initError) => {
        console.error('Firebase init failed', initError);
        setError('Unable to connect to Firebase.');
        setLoading(false);
      });

    return () => unsubscribe();
  }, [noteId]);

  return { note, loading, error };
}
