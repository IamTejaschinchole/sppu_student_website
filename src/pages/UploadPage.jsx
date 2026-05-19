import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, FileUp, ShieldCheck, Upload } from 'lucide-react';
import { firebaseReady } from '../firebase.js';
import { useAuth } from '../AuthContext.jsx';
import { subjectCatalog } from '../lib/constants.js';
import { getStorageErrorMessage } from '../lib/errors.js';
import { formatBytes, getUserName, parseTags, sanitizeFilename } from '../lib/utils.js';
import { Avatar, ErrorMessage } from '../components/ui.jsx';

export default function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    subject: subjectCatalog[0],
    semester: '3',
    description: '',
    tags: '',
    priceType: 'free',
    priceAmount: '',
  });
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError('');
  }

  function handleFileSelection(selectedFile) {
    setError('');

    if (!selectedFile) {
      return;
    }

    const isPdf = selectedFile.type === 'application/pdf' || selectedFile.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      setFile(null);
      setError('Only PDF files can be uploaded.');
      return;
    }

    setFile(selectedFile);
  }

  function handleDrag(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(event.type === 'dragenter' || event.type === 'dragover');
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    handleFileSelection(event.dataTransfer.files?.[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!file) {
      setError('Choose a PDF file before uploading.');
      return;
    }

    if (form.priceType === 'paid' && (!form.priceAmount || Number(form.priceAmount) <= 0)) {
      setError('Enter a valid paid price.');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const services = await firebaseReady;
      const { ref, uploadBytesResumable } = await import('firebase/storage');
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
      const safeName = sanitizeFilename(file.name);
      const storagePath = `notes/${user.uid}/${Date.now()}-${safeName}`;
      const fileRef = ref(services.storage, storagePath);
      const uploadTask = uploadBytesResumable(fileRef, file, {
        contentType: 'application/pdf',
        customMetadata: {
          uploadedBy: user.uid,
          subject: form.subject,
          semester: form.semester,
        },
      });

      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const nextProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(nextProgress);
          },
          reject,
          resolve,
        );
      });

      const price = form.priceType === 'free' ? 'Free' : `Rs. ${Number(form.priceAmount).toFixed(0)}`;

      await addDoc(collection(services.db, 'notes'), {
        title: form.title.trim(),
        subject: form.subject,
        semester: Number(form.semester),
        description: form.description.trim(),
        tags: parseTags(form.tags),
        price,
        priceType: form.priceType,
        priceAmount: form.priceType === 'paid' ? Number(form.priceAmount) : 0,
        storagePath,
        fileName: file.name,
        uploadedBy: user.uid,
        uploaderName: getUserName(user),
        uploaderAvatar: user.photoURL || '',
        createdAt: serverTimestamp(),
        downloads: 0,
        rating: 0,
        ratingCount: 0,
      });

      navigate('/', { replace: true });
    } catch (uploadError) {
      console.error('Unable to upload note', uploadError);
      setError(getStorageErrorMessage(uploadError));
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:py-16">
      <section className="rounded-lg border border-line bg-panel p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to marketplace
        </Link>
        <div className="mt-8 inline-flex rounded-md border border-mint/35 bg-mint/10 px-2.5 py-1 text-xs font-medium text-mint">
          Firebase Storage upload
        </div>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-white">Upload PDF notes</h1>
        <p className="mt-4 text-base leading-7 text-zinc-300">
          Add a PDF, publish note details to Firestore, and make downloads available only to signed-in
          students.
        </p>
        <div className="mt-8 flex items-center gap-3 rounded-lg border border-line bg-zinc-950/55 p-4">
          <Avatar user={user} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{getUserName(user)}</p>
            <p className="truncate text-xs text-zinc-500">{user?.email}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 text-sm text-zinc-300">
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="text-mint" aria-hidden="true" />
            Login is required before uploading.
          </div>
          <div className="flex items-center gap-2">
            <FileText size={17} className="text-ember" aria-hidden="true" />
            PDF files are stored in Firebase Storage.
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-line bg-panel p-6">
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-title">
              Note title
            </label>
            <input
              id="note-title"
              required
              disabled={uploading}
              value={form.title}
              onChange={(event) => updateField('title', event.target.value)}
              className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white placeholder:text-zinc-500 disabled:opacity-60"
              placeholder="Example: DBMS Unit 2 normalization notes"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-subject">
                Subject
              </label>
              <select
                id="note-subject"
                disabled={uploading}
                value={form.subject}
                onChange={(event) => updateField('subject', event.target.value)}
                className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white disabled:opacity-60"
              >
                {subjectCatalog.map((subject) => (
                  <option key={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-semester">
                Semester
              </label>
              <select
                id="note-semester"
                disabled={uploading}
                value={form.semester}
                onChange={(event) => updateField('semester', event.target.value)}
                className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white disabled:opacity-60"
              >
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-description">
              Description
            </label>
            <textarea
              id="note-description"
              required
              disabled={uploading}
              value={form.description}
              onChange={(event) => updateField('description', event.target.value)}
              className="min-h-32 w-full resize-y rounded-lg border border-line bg-zinc-950/55 px-4 py-3 text-sm text-white placeholder:text-zinc-500 disabled:opacity-60"
              placeholder="Mention units covered, exam focus, diagrams, or lab programs."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-[1fr_0.7fr]">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-tags">
                Tags
              </label>
              <input
                id="note-tags"
                disabled={uploading}
                value={form.tags}
                onChange={(event) => updateField('tags', event.target.value)}
                className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white placeholder:text-zinc-500 disabled:opacity-60"
                placeholder="SQL, ER, normalization"
              />
            </div>
            <div>
              <span className="mb-2 block text-sm font-medium text-zinc-300">Price</span>
              <div className="grid h-12 grid-cols-2 rounded-lg border border-line bg-zinc-950/55 p-1">
                {['free', 'paid'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    disabled={uploading}
                    onClick={() => updateField('priceType', type)}
                    className={`rounded-md text-sm font-semibold capitalize transition ${
                      form.priceType === type ? 'bg-mint text-ink' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {form.priceType === 'paid' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300" htmlFor="note-price">
                Paid price in rupees
              </label>
              <input
                id="note-price"
                required
                min="1"
                step="1"
                type="number"
                disabled={uploading}
                value={form.priceAmount}
                onChange={(event) => updateField('priceAmount', event.target.value)}
                className="h-12 w-full rounded-lg border border-line bg-zinc-950/55 px-4 text-sm text-white placeholder:text-zinc-500 disabled:opacity-60"
                placeholder="49"
              />
            </div>
          )}

          <label
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`grid min-h-40 cursor-pointer place-items-center rounded-lg border border-dashed px-4 text-center text-sm transition ${
              dragActive
                ? 'border-mint bg-mint/10 text-teal-100'
                : 'border-line bg-zinc-950/45 text-zinc-400 hover:border-mint/40 hover:bg-mint/10'
            } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
          >
            <input
              type="file"
              accept="application/pdf,.pdf"
              disabled={uploading}
              className="sr-only"
              onChange={(event) => handleFileSelection(event.target.files?.[0])}
            />
            <span>
              <FileUp className="mx-auto mb-3 text-zinc-500" size={30} aria-hidden="true" />
              {file ? (
                <>
                  <span className="block font-semibold text-white">{file.name}</span>
                  <span className="mt-1 block text-xs text-zinc-500">{formatBytes(file.size)}</span>
                </>
              ) : (
                <>
                  <span className="block font-semibold text-white">Drop PDF here or click to browse</span>
                  <span className="mt-1 block text-xs text-zinc-500">Only PDF files are accepted</span>
                </>
              )}
            </span>
          </label>

          {uploading && (
            <div>
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                <span>Uploading PDF</span>
                <span>{progress}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-zinc-950">
                <div className="h-full rounded-full bg-mint transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <button
            type="submit"
            disabled={uploading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-mint px-4 text-sm font-semibold text-ink transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Upload size={18} aria-hidden="true" />
            {uploading ? 'Uploading...' : 'Upload PDF Notes'}
          </button>
        </form>
      </section>
    </main>
  );
}
