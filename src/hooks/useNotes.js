import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { collection, onSnapshot, orderBy, query } = await import('firebase/firestore');
        const notesQuery = query(collection(services.db, 'notes'), orderBy('createdAt', 'desc'));

        unsubscribe = onSnapshot(
          notesQuery,
          (snapshot) => {
            setNotes(snapshot.docs.map((noteDoc) => ({ id: noteDoc.id, ...noteDoc.data() })));
            setLoading(false);
            setError('');
          },
          (notesError) => {
            console.error('Unable to load notes', notesError);
            setError('Unable to load notes from Firestore. Check Firestore rules and indexes.');
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
  }, []);

  return { notes, loading, error };
}
