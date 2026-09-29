import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';

export function useContributorNotes(contributorId) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!contributorId) {
      setNotes([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { collection, onSnapshot, query, where, orderBy } = await import('firebase/firestore');
        const contributorNotesQuery = query(
          collection(services.db, 'notes'),
          where('uploadedBy', '==', contributorId),
          orderBy('createdAt', 'desc'),
        );

        unsubscribe = onSnapshot(
          contributorNotesQuery,
          (snapshot) => {
            setNotes(snapshot.docs.map((noteDoc) => ({ id: noteDoc.id, ...noteDoc.data() })));
            setLoading(false);
            setError('');
          },
          (notesError) => {
            console.error('Unable to load contributor notes', notesError);
            setError('Unable to load contributor notes. Check Firestore rules.');
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
  }, [contributorId]);

  return { notes, loading, error };
}
