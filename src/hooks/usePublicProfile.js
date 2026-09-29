import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';

export function usePublicProfile(userId) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      setError('');
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { doc, onSnapshot } = await import('firebase/firestore');
        const profileRef = doc(services.db, 'publicProfiles', userId);

        unsubscribe = onSnapshot(
          profileRef,
          (snapshot) => {
            if (snapshot.exists()) {
              setProfile({ id: snapshot.id, ...snapshot.data() });
            } else {
              setProfile(null);
            }
            setLoading(false);
            setError('');
          },
          (profileError) => {
            console.error('Unable to load public profile', profileError);
            setError('Unable to load public profile. Check Firestore rules.');
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

  return { profile, loading, error };
}
