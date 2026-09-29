import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileUp, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { sppuBranches } from '../lib/sppu.js';
import { getSppuSemestersForBranchSlug, getSppuSubjectsForRoute } from '../data/sppuSubjects.js';
import { formatBytes } from '../lib/utils.js';
import { firebaseReady } from '../firebase.js';
import { useAuth } from '../AuthContext.jsx';

export default function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    description: '',
    university: 'Savitribai Phule Pune University (SPPU)',
    branch: '',
    semester: '',
    subject: '',
  });

  const [coverImage, setCoverImage] = useState(null);
  
  const [resources, setResources] = useState([]);
  const [resourceDraft, setResourceDraft] = useState({
    title: '',
    type: 'Notes',
    description: '',
    file: null,
  });

  // Cascading dropdowns
  const availableSemesters = useMemo(() => {
    if (!form.branch) return [];
    return getSppuSemestersForBranchSlug(form.branch);
  }, [form.branch]);

  const availableSubjects = useMemo(() => {
    if (!form.branch || !form.semester) return [];
    return getSppuSubjectsForRoute(form.branch, form.semester);
  }, [form.branch, form.semester]);

  function handleFormChange(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'branch') {
        next.semester = '';
        next.subject = '';
      }
      if (field === 'semester') {
        next.subject = '';
      }
      return next;
    });
  }

  function handleAddResource(e) {
    e.preventDefault();
    if (!resourceDraft.title || !resourceDraft.file) return;

    setResources((prev) => [
      ...prev,
      {
        ...resourceDraft,
        id: Date.now().toString(),
      },
    ]);
    
    setResourceDraft({
      title: '',
      type: 'Notes',
      description: '',
      file: null,
    });
  }

  function handleRemoveResource(id) {
    setResources((prev) => prev.filter(r => r.id !== id));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!form.title || !form.branch || !form.semester || !form.subject) return;
    if (resources.length === 0) {
      alert("Please add at least one resource.");
      return;
    }
    if (!user) {
      setError('You must be logged in to upload.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setUploadProgress(0);

    try {
      const services = await firebaseReady;
      const { storage, db } = services;
      const { ref, uploadBytesResumable, getDownloadURL } = await import('firebase/storage');
      const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');

      // Upload cover image if provided
      if (coverImage) {
        const coverPath = `covers/${user.uid}/${Date.now()}_${coverImage.name}`;
        const coverRef = ref(storage, coverPath);
        await uploadBytesResumable(coverRef, coverImage);
      }

      // Upload each resource file and create note documents
      const semesterNumber = parseInt(form.semester.replace('sem-', '').replace('sem', ''), 10) || 1;
      const uploaderName = user.displayName || user.email?.split('@')[0] || 'SPPU Student';

      for (let i = 0; i < resources.length; i++) {
        const resource = resources[i];
        const sanitizedFileName = resource.file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `notes/${user.uid}/${Date.now()}_${i}_${sanitizedFileName}`;
        const fileRef = ref(storage, storagePath);

        const uploadTask = uploadBytesResumable(fileRef, resource.file);
        
        await new Promise((resolve, reject) => {
          uploadTask.on('state-changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setUploadProgress(progress);
          }, reject, resolve);
        });

        const fileUrl = await getDownloadURL(fileRef);

        const noteData = {
          title: resource.title,
          description: resource.description || form.description,
          subject: form.subject,
          semester: semesterNumber,
          tags: [form.branch, form.subject, resource.type],
          price: 'Free',
          priceType: 'free',
          priceAmount: 0,
          storagePath,
          fileName: resource.file.name,
          fileUrl,
          uploadedBy: user.uid,
          uploaderName,
          uploaderAvatar: user.photoURL || '',
          downloads: 0,
          rating: 0,
          ratingCount: 0,
          createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, 'notes'), noteData);
      }

      setUploadProgress(100);
      setTimeout(() => {
        setSuccess(true);
        setIsSubmitting(false);
      }, 500);
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      setError('Upload failed. Please check your connection and try again.');
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }

  // Define Resource Types
  const resourceTypes = ['Notes', 'PYQ', 'Practical', 'Assignment', 'Project'];

  if (success) {
    return (
      <main className="stitch-page mx-auto flex w-full max-w-[1200px] flex-col items-center px-[24px] pb-20 pt-20">
        <div className="flex flex-col items-center rounded-xl glass-strong p-10 text-center max-w-md w-full shadow-glass-lg">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle size={32} />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-text-primary">Catalogue Published!</h1>
          <p className="mt-3 text-text-secondary">
            Your catalogue "{form.title}" containing {resources.length} resources is now live.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-primary px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="stitch-page mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-12">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition hover:text-text-primary">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Browse
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Upload Catalogue</h1>
        <p className="mt-2 text-text-secondary">Bundle related study materials, notes, and PYQs together into a single catalogue.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Form */}
        <div className="flex flex-col gap-8">
          <section className="rounded-xl border border-glass bg-bg-surface/60 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6">1. Catalogue Details</h2>
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Catalogue Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="h-12 w-full rounded-xl border border-glass bg-bg-deep/40 px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none transition-colors"
                  placeholder="E.g., Complete SEM 3 Notes Bundle"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="min-h-24 w-full resize-y rounded-xl border border-glass bg-bg-deep/40 p-4 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none transition-colors"
                  placeholder="Describe what's included in this catalogue..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Cover Image (Optional)</label>
                <label className="flex h-24 cursor-pointer items-center justify-center rounded-xl border border-dashed border-glass bg-bg-deep/30 transition hover:border-brand-primary/50 hover:bg-bg-deep/40">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setCoverImage(e.target.files?.[0])}
                  />
                  {coverImage ? (
                    <span className="text-sm font-medium text-text-primary">{coverImage.name}</span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                      <ImageIcon size={18} />
                      Upload Cover Image
                    </span>
                  )}
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-glass bg-bg-surface/60 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6">2. Academic Context</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-text-secondary">University</label>
                <input
                  disabled
                  value={form.university}
                  className="h-12 w-full rounded-xl border border-glass bg-bg-deep/20 px-4 text-sm text-text-muted cursor-not-allowed outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Branch *</label>
                <select
                  required
                  value={form.branch}
                  onChange={(e) => handleFormChange('branch', e.target.value)}
                  className="h-12 w-full rounded-xl border border-glass bg-bg-deep/40 px-4 text-sm text-text-primary focus:border-brand-primary outline-none transition-colors"
                >
                  <option value="" disabled>Select Branch</option>
                  {sppuBranches.map(b => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-secondary">Semester *</label>
                <select
                  required
                  disabled={!form.branch}
                  value={form.semester}
                  onChange={(e) => handleFormChange('semester', e.target.value)}
                  className="h-12 w-full rounded-xl border border-glass bg-bg-deep/40 px-4 text-sm text-text-primary focus:border-brand-primary outline-none transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>Select Semester</option>
                  {availableSemesters.map(s => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-text-secondary">Subject *</label>
                <select
                  required
                  disabled={!form.semester}
                  value={form.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  className="h-12 w-full rounded-xl border border-glass bg-bg-deep/40 px-4 text-sm text-text-primary focus:border-brand-primary outline-none transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>Select Subject</option>
                  {availableSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-glass bg-bg-surface/60 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-text-primary mb-6">3. Upload Resources</h2>
            
            <form onSubmit={handleAddResource} className="rounded-xl border border-dashed border-glass bg-bg-deep/20 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-text-muted">Resource Title *</label>
                  <input
                    required
                    value={resourceDraft.title}
                    onChange={(e) => setResourceDraft(prev => ({...prev, title: e.target.value}))}
                    className="h-11 w-full rounded-xl border border-glass bg-bg-deep/40 px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none transition-colors"
                    placeholder="E.g., Unit 1 handwritten notes"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-medium text-text-muted">Resource Type *</label>
                  <select
                    required
                    value={resourceDraft.type}
                    onChange={(e) => setResourceDraft(prev => ({...prev, type: e.target.value}))}
                    className="h-11 w-full rounded-xl border border-glass bg-bg-deep/40 px-3 text-sm text-text-primary focus:border-brand-primary outline-none transition-colors"
                  >
                    {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-text-muted">File *</label>
                  <label className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-glass bg-bg-deep/40 px-3 text-sm text-text-secondary transition hover:bg-bg-deep/50">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.zip,.rar"
                      className="sr-only"
                      onChange={(e) => setResourceDraft(prev => ({...prev, file: e.target.files?.[0]}))}
                    />
                    <FileUp size={16} />
                    <span className="truncate">{resourceDraft.file ? resourceDraft.file.name : 'Select File'}</span>
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-text-muted">Description (Optional)</label>
                  <input
                    value={resourceDraft.description}
                    onChange={(e) => setResourceDraft(prev => ({...prev, description: e.target.value}))}
                    className="h-11 w-full rounded-xl border border-glass bg-bg-deep/40 px-3 text-sm text-text-primary placeholder:text-text-muted focus:border-brand-primary outline-none transition-colors"
                    placeholder="E.g., Contains detailed explanations with examples"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={!resourceDraft.title || !resourceDraft.file}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-bg-surface/40 px-4 text-sm font-medium text-text-primary transition hover:bg-bg-surface/60 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                    Add Resource
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Preview & Publish */}
        <div className="flex flex-col gap-6">
          <div className="sticky top-24 rounded-xl border border-glass bg-bg-surface/60 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary">Catalogue Preview</h3>
            
            <div className="mt-5 rounded-xl bg-bg-deep/20 p-4 border border-glass">
              <h4 className="font-medium text-text-primary line-clamp-2">{form.title || 'Untitled Catalogue'}</h4>
              <p className="mt-2 text-xs text-text-muted">
                {form.branch ? sppuBranches.find(b => b.slug === form.branch)?.name : 'No branch'} • {form.semester ? availableSemesters.find(s => s.slug === form.semester)?.title : 'No semester'}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-text-muted border-t border-glass pt-3">
                <span>{resources.length} {resources.length === 1 ? 'Resource' : 'Resources'}</span>
                <span>Ready to publish</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Added Resources</h4>
              {resources.length === 0 ? (
                <p className="text-sm text-text-secondary italic">No resources added yet.</p>
              ) : (
                <ul className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {resources.map((res) => (
                    <li key={res.id} className="flex flex-col gap-1 rounded-xl border border-glass bg-bg-deep/40 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-medium text-text-secondary">{res.title}</p>
                        <button 
                          onClick={() => handleRemoveResource(res.id)}
                          className="rounded-lg p-1 text-text-muted transition hover:bg-red-500/10 hover:text-red-400 shrink-0"
                          title="Remove resource"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex gap-2 text-[10px] text-text-muted">
                        <span className="uppercase text-brand-primary">{res.type}</span>
                        <span>•</span>
                        <span>{res.file ? formatBytes(res.file.size) : ''}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {isSubmitting && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-bg-deep/40">
                    <div
                      className="h-full bg-brand-primary transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !form.title || !form.branch || !form.semester || !form.subject || resources.length === 0}
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-primary/90 hover:shadow-brand-glow disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Catalogue'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
