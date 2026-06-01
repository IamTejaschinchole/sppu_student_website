import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, FileUp, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { sppuBranches } from '../lib/sppu.js';
import { getSppuSemestersForBranchSlug, getSppuSubjectsForRoute } from '../data/sppuSubjects.js';
import { formatBytes } from '../lib/utils.js';

export default function UploadPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    
    // Validation
    if (!form.title || !form.branch || !form.semester || !form.subject) return;
    if (resources.length === 0) {
      alert("Please add at least one resource.");
      return;
    }

    setIsSubmitting(true);
    
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  }

  // Define Resource Types
  const resourceTypes = ['Notes', 'PYQ', 'Practical', 'Assignment', 'Project'];

  if (success) {
    return (
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-[24px] pb-20 pt-20">
        <div className="flex flex-col items-center rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#141414] p-10 text-center max-w-md w-full shadow-lg">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle size={32} />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-white">Catalogue Published!</h1>
          <p className="mt-3 text-zinc-400">
            Your catalogue "{form.title}" containing {resources.length} resources is now live.
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-[6px] bg-[#6366f1] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4f46e5]"
          >
            Go to Homepage
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-10">
      <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white">
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Browse
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Upload Catalogue</h1>
        <p className="mt-2 text-zinc-400">Bundle related study materials, notes, and PYQs together into a single catalogue.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Left Column: Form */}
        <div className="flex flex-col gap-8">
          <section className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-6">1. Catalogue Details</h2>
            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Catalogue Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="h-11 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-4 text-sm text-white placeholder:text-zinc-600 focus:border-[#6366f1] outline-none transition-colors"
                  placeholder="E.g., Complete SEM 3 Notes Bundle"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  className="min-h-24 w-full resize-y rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 p-4 text-sm text-white placeholder:text-zinc-600 focus:border-[#6366f1] outline-none transition-colors"
                  placeholder="Describe what's included in this catalogue..."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Cover Image (Optional)</label>
                <label className="flex h-24 cursor-pointer items-center justify-center rounded-[6px] border border-dashed border-[rgba(255,255,255,0.1)] bg-zinc-950/30 transition hover:border-[#6366f1]/50 hover:bg-zinc-950/50">
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(e) => setCoverImage(e.target.files?.[0])}
                  />
                  {coverImage ? (
                    <span className="text-sm font-medium text-white">{coverImage.name}</span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm text-zinc-500">
                      <ImageIcon size={18} />
                      Upload Cover Image
                    </span>
                  )}
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-6">2. Academic Context</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">University</label>
                <input
                  disabled
                  value={form.university}
                  className="h-11 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-white/[0.02] px-4 text-sm text-zinc-500 cursor-not-allowed outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Branch *</label>
                <select
                  required
                  value={form.branch}
                  onChange={(e) => handleFormChange('branch', e.target.value)}
                  className="h-11 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-4 text-sm text-white focus:border-[#6366f1] outline-none transition-colors"
                >
                  <option value="" disabled>Select Branch</option>
                  {sppuBranches.map(b => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Semester *</label>
                <select
                  required
                  disabled={!form.branch}
                  value={form.semester}
                  onChange={(e) => handleFormChange('semester', e.target.value)}
                  className="h-11 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-4 text-sm text-white focus:border-[#6366f1] outline-none transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>Select Semester</option>
                  {availableSemesters.map(s => (
                    <option key={s.slug} value={s.slug}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-zinc-300">Subject *</label>
                <select
                  required
                  disabled={!form.semester}
                  value={form.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  className="h-11 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-4 text-sm text-white focus:border-[#6366f1] outline-none transition-colors disabled:opacity-50"
                >
                  <option value="" disabled>Select Subject</option>
                  {availableSubjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-6">3. Upload Resources</h2>
            
            <form onSubmit={handleAddResource} className="rounded-[8px] border border-dashed border-[rgba(255,255,255,0.1)] bg-white/[0.01] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-xs font-medium text-zinc-400">Resource Title *</label>
                  <input
                    required
                    value={resourceDraft.title}
                    onChange={(e) => setResourceDraft(prev => ({...prev, title: e.target.value}))}
                    className="h-10 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#6366f1] outline-none transition-colors"
                    placeholder="E.g., Unit 1 handwritten notes"
                  />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-400">Resource Type *</label>
                  <select
                    required
                    value={resourceDraft.type}
                    onChange={(e) => setResourceDraft(prev => ({...prev, type: e.target.value}))}
                    className="h-10 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-3 text-sm text-white focus:border-[#6366f1] outline-none transition-colors"
                  >
                    {resourceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-zinc-400">File *</label>
                  <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-3 text-sm text-zinc-300 transition hover:bg-white/[0.02]">
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
                  <label className="mb-2 block text-xs font-medium text-zinc-400">Description (Optional)</label>
                  <input
                    value={resourceDraft.description}
                    onChange={(e) => setResourceDraft(prev => ({...prev, description: e.target.value}))}
                    className="h-10 w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] bg-zinc-950/55 px-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#6366f1] outline-none transition-colors"
                    placeholder="E.g., Contains detailed explanations with examples"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={!resourceDraft.title || !resourceDraft.file}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] bg-white/[0.05] px-4 text-sm font-medium text-white transition hover:bg-white/[0.1] disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="sticky top-24 rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Catalogue Preview</h3>
            
            <div className="mt-5 rounded-[6px] bg-white/[0.02] p-4 border border-[rgba(255,255,255,0.03)]">
              <h4 className="font-medium text-white line-clamp-2">{form.title || 'Untitled Catalogue'}</h4>
              <p className="mt-2 text-xs text-zinc-500">
                {form.branch ? sppuBranches.find(b => b.slug === form.branch)?.name : 'No branch'} • {form.semester ? availableSemesters.find(s => s.slug === form.semester)?.title : 'No semester'}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-zinc-400 border-t border-[rgba(255,255,255,0.05)] pt-3">
                <span>{resources.length} {resources.length === 1 ? 'Resource' : 'Resources'}</span>
                <span>Ready to publish</span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">Added Resources</h4>
              {resources.length === 0 ? (
                <p className="text-sm text-zinc-600 italic">No resources added yet.</p>
              ) : (
                <ul className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1">
                  {resources.map((res) => (
                    <li key={res.id} className="flex flex-col gap-1 rounded-[6px] border border-[rgba(255,255,255,0.04)] bg-zinc-950/40 p-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-sm font-medium text-zinc-300">{res.title}</p>
                        <button 
                          onClick={() => handleRemoveResource(res.id)}
                          className="rounded-md p-1 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-400 shrink-0"
                          title="Remove resource"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex gap-2 text-[10px] text-zinc-500">
                        <span className="uppercase text-[#818cf8]">{res.type}</span>
                        <span>•</span>
                        <span>{res.file ? formatBytes(res.file.size) : ''}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !form.title || !form.branch || !form.semester || !form.subject || resources.length === 0}
              className="mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-[#6366f1] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4f46e5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Catalogue'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
