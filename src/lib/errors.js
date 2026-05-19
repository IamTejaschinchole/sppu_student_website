export function getAuthErrorMessage(error) {
  switch (error?.code) {
    case 'auth/email-already-in-use':
      return 'An account already exists for this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Register to create one.';
    case 'auth/invalid-credential':
      return 'Invalid email or password. Check your details and try again.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a few minutes and try again.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in was closed before completion.';
    case 'auth/popup-blocked':
      return 'Pop-up was blocked. Allow pop-ups for this site and try again.';
    case 'auth/cancelled-popup-request':
      return 'Google sign-in was interrupted. Please try again.';
    case 'auth/redirect-cancelled-by-user':
      return 'Google sign-in was cancelled before completion.';
    case 'auth/redirect-operation-pending':
      return 'Google sign-in is already in progress. Please wait.';
    case 'auth/account-exists-with-different-credential':
      return 'This email is registered with a different sign-in method.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/configuration-not-found':
      return 'Firebase Authentication is not enabled for this project yet.';
    default:
      return error?.message || 'Authentication failed. Please try again.';
  }
}

export function getStorageErrorMessage(error) {
  switch (error?.code) {
    case 'storage/unauthorized':
      return 'Firebase Storage rules blocked this upload.';
    case 'storage/canceled':
      return 'Upload was canceled.';
    case 'storage/quota-exceeded':
      return 'Firebase Storage quota has been exceeded.';
    case 'permission-denied':
      return 'Firestore rules blocked saving note metadata.';
    default:
      return error?.message || 'Upload failed. Please try again.';
  }
}

export function getDeleteErrorMessage(error) {
  switch (error?.code) {
    case 'storage/unauthorized':
      return 'Firebase Storage rules blocked deleting this PDF.';
    case 'storage/object-not-found':
      return 'The PDF was already missing from Storage.';
    case 'permission-denied':
      return 'Firestore rules blocked deleting this note.';
    default:
      return error?.message || 'Delete failed. Please try again.';
  }
}

export function getPaymentErrorMessage(error) {
  if (error?.message === 'payment-cancelled') {
    return 'Payment was cancelled.';
  }

  if (error?.message === 'razorpay-not-loaded') {
    return 'Razorpay checkout could not load. Check your internet connection and try again.';
  }

  if (error?.message === 'invalid-payment-amount') {
    return 'This paid note does not have a valid price.';
  }

  if (error?.code === 'permission-denied') {
    return 'Firestore rules blocked saving the payment or download count.';
  }

  return error?.message || 'Payment failed. Please try again.';
}

export function getRatingErrorMessage(error) {
  if (error?.message === 'already-rated') {
    return 'You have already rated this note.';
  }

  if (error?.message === 'note-not-found') {
    return 'This note no longer exists.';
  }

  if (error?.code === 'permission-denied') {
    return 'Firestore rules blocked this rating.';
  }

  return error?.message || 'Rating failed. Please try again.';
}
