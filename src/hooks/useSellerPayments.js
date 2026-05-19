import { useEffect, useState } from 'react';
import { firebaseReady } from '../firebase.js';
import { getTimestampMillis } from '../lib/utils.js';

export function useSellerPayments(sellerId) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sellerId) {
      setPayments([]);
      setLoading(false);
      setError('');
      return undefined;
    }

    let unsubscribe = () => {};

    firebaseReady
      .then(async (services) => {
        const { collection, onSnapshot, query, where } = await import('firebase/firestore');
        const paymentsQuery = query(collection(services.db, 'payments'), where('uploadedBy', '==', sellerId));

        unsubscribe = onSnapshot(
          paymentsQuery,
          (snapshot) => {
            const sellerPayments = snapshot.docs
              .map((paymentDoc) => ({ id: paymentDoc.id, ...paymentDoc.data() }))
              .sort((a, b) => getTimestampMillis(b.createdAt) - getTimestampMillis(a.createdAt));

            setPayments(sellerPayments);
            setLoading(false);
            setError('');
          },
          (paymentsError) => {
            console.error('Unable to load payments', paymentsError);
            setError('Unable to load payment records. Check Firestore rules.');
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
  }, [sellerId]);

  return { payments, loading, error };
}
