import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';
import { getTimestampMillis } from '../lib/utils.js';

export function useSavedNotes(userId) {
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setSavedIds([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { collection, onSnapshot, query, orderBy } = await import('firebase/firestore');
        const savedQuery = query(
          collection(services.db, 'users', userId, 'savedNotes'),
          orderBy('savedAt', 'desc'),
        );

        unsubscribe = onSnapshot(
          savedQuery,
          (snapshot) => {
            const ids = snapshot.docs.map((doc) => doc.id);
            setSavedIds(ids);
            setLoading(false);
            setError('');
          },
          (savedError) => {
            console.error('Unable to load saved notes', savedError);
            setError('Unable to load saved notes. Check Firestore rules.');
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
  }, [userId]);

  return { savedIds, loading, error };
}