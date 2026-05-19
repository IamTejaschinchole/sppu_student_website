import { firebaseReady } from '../firebase.js';
import { razorpayKeyId } from './constants.js';
import { getPaymentErrorMessage } from './errors.js';
import { getNotePriceAmount, getUserName, isFreeNote } from './utils.js';

export async function submitRating(noteId, user, rating) {
  const db = (await firebaseReady).db;
  const { doc, runTransaction, serverTimestamp } = await import('firebase/firestore');

  const noteRef = doc(db, 'notes', noteId);
  const ratingRef = doc(db, 'notes', noteId, 'ratings', user.uid);

  await runTransaction(db, async (transaction) => {
    const existingRating = await transaction.get(ratingRef);

    if (existingRating.exists()) {
      throw new Error('already-rated');
    }

    const noteSnapshot = await transaction.get(noteRef);

    if (!noteSnapshot.exists()) {
      throw new Error('note-not-found');
    }

    const note = noteSnapshot.data();
    const currentRating = Number(note.rating || 0);
    const currentCount = Number(note.ratingCount || 0);
    const nextCount = currentCount + 1;
    const nextRating = (currentRating * currentCount + rating) / nextCount;

    transaction.set(ratingRef, {
      rating,
      userId: user.uid,
      userName: getUserName(user),
      userAvatar: user.photoURL || '',
      createdAt: serverTimestamp(),
    });
    transaction.update(noteRef, {
      rating: Number(nextRating.toFixed(2)),
      ratingCount: nextCount,
    });
  });
}

export async function deleteNoteSubcollection(noteId, subcollectionName) {
  const db = (await firebaseReady).db;
  const { collection, deleteDoc, getDocs } = await import('firebase/firestore');
  const snapshot = await getDocs(collection(db, 'notes', noteId, subcollectionName));
  await Promise.all(snapshot.docs.map((subDoc) => deleteDoc(subDoc.ref)));
}

export async function downloadNote({ note, user, navigate, location, setBusyId, setError }) {
  setError('');

  if (!user) {
    navigate('/login', { state: { from: location } });
    return;
  }

  if (!note?.storagePath && !note?.fileUrl) {
    setError('This note does not have a PDF URL yet.');
    return;
  }

  setBusyId(note.id);

  try {
    const db = (await firebaseReady).db;
    const storage = (await firebaseReady).storage;
    const {
      addDoc,
      collection,
      doc,
      increment,
      serverTimestamp,
      updateDoc,
    } = await import('firebase/firestore');
    const { getDownloadURL, ref } = await import('firebase/storage');

    if (!isFreeNote(note)) {
      const paymentResponse = await openRazorpayCheckout(note, user);
      const amountPaise = Math.round(getNotePriceAmount(note) * 100);

      await addDoc(collection(db, 'payments'), {
        noteId: note.id,
        noteTitle: note.title || '',
        subject: note.subject || '',
        uploadedBy: note.uploadedBy || '',
        uploaderName: note.uploaderName || '',
        payerId: user.uid,
        payerName: getUserName(user),
        payerEmail: user.email || '',
        amountPaise,
        amountRupees: amountPaise / 100,
        currency: 'INR',
        status: 'success',
        razorpayPaymentId: paymentResponse.razorpay_payment_id || '',
        razorpayOrderId: paymentResponse.razorpay_order_id || '',
        razorpaySignature: paymentResponse.razorpay_signature || '',
        createdAt: serverTimestamp(),
      });
    }

    await updateDoc(doc(db, 'notes', note.id), {
      downloads: increment(1),
    });

    const downloadUrl = note.fileUrl || (await getDownloadURL(ref(storage, note.storagePath)));
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Unable to complete download', error);
    setError(getPaymentErrorMessage(error));
  } finally {
    setBusyId('');
  }
}

function openRazorpayCheckout(note, user) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      reject(new Error('razorpay-not-loaded'));
      return;
    }

    const priceAmount = getNotePriceAmount(note);
    const amountPaise = Math.round(priceAmount * 100);

    if (!amountPaise || amountPaise <= 0) {
      reject(new Error('invalid-payment-amount'));
      return;
    }

    const checkout = new window.Razorpay({
      key: razorpayKeyId,
      amount: amountPaise,
      currency: 'INR',
      name: 'SPPU Notes Marketplace',
      description: note.title || 'Paid notes download',
      prefill: {
        name: getUserName(user),
        email: user.email || '',
      },
      notes: {
        noteId: note.id,
        subject: note.subject || '',
      },
      theme: {
        color: '#2dd4bf',
      },
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error('payment-cancelled'));
        },
      },
    });

    checkout.on('payment.failed', (response) => {
      const reason =
        response?.error?.description ||
        response?.error?.reason ||
        response?.error?.code ||
        'Payment failed.';
      reject(new Error(reason));
    });

    checkout.open();
  });
}
