import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Star, Download, Search, FileText, Database, BookOpen, Layers } from 'lucide-react';
import { getSppuBranch, getSppuSemester } from '../lib/sppu.js';
import { getSppuSubjectsForRoute, slugifyAcademicName } from '../data/sppuSubjects.js';

const mockResources = [
  { id: '1', title: 'DSA Unit 1 Notes', type: 'Notes', size: '2.4 MB', date: 'Oct 12, 2023', icon: BookOpen },
  { id: '2', title: 'DSA Unit 2 Notes', type: 'Notes', size: '3.1 MB', date: 'Oct 15, 2023', icon: BookOpen },
  { id: '3', title: 'DBMS Notes', type: 'Notes', size: '5.2 MB', date: 'Nov 02, 2023', icon: Database },
  { id: '4', title: 'CN Notes', type: 'Notes', size: '4.8 MB', date: 'Nov 10, 2023', icon: BookOpen },
  { id: '5', title: 'PYQ Collection', type: 'PYQ', size: '12.5 MB', date: 'Dec 01, 2023', icon: Layers },
  { id: '6', title: 'Practical Manual', type: 'Practical', size: '8.4 MB', date: 'Dec 05, 2023', icon: FileText },
];

const mockCatalogueDetails = {
  'complete-notes-pack': { title: 'Complete Notes Pack', creator: 'Tejas Chinchole', rating: '4.9', downloads: '1.2k', description: 'Comprehensive notes covering all units with diagrams and important formulas.' },
  'pyq-collection': { title: 'PYQ Collection (2019-2023)', creator: 'Rahul Sharma', rating: '4.8', downloads: '850', description: 'Previous year question papers with detailed step-by-step solutions.' },
  'assignment-collection': { title: 'Assignment Solutions', creator: 'Aman Patel', rating: '4.7', downloads: '640', description: 'Complete solutions for all college assignments and lab exercises.' },
  'lab-resources': { title: 'Complete Lab Manual', creator: 'Priya Singh', rating: '4.8', downloads: '920', description: 'Practical lab manual with code, outputs, and viva questions.' },
};

export default function CatalogueDetailPage() {
  const { branchSlug, semesterSlug, subjectSlug, catalogueId } = useParams();
  const branch = getSppuBranch(branchSlug);
  const semester = getSppuSemester(semesterSlug);
  const [search, setSearch] = useState('');

  if (!branch || !semester) {
    return <Navigate to="/sppu" replace />;
  }

  const subject = getSppuSubjectsForRoute(branch.slug, semester.slug).find(
    (subjectName) => slugifyAcademicName(subjectName) === subjectSlug
  );

  if (!subject) {
    return <Navigate to={`/sppu/${branch.slug}/${semester.slug}`} replace />;
  }

  const catalogue = mockCatalogueDetails[catalogueId] || mockCatalogueDetails['complete-notes-pack'];

  const filteredResources = mockResources.filter(res => 
    res.title.toLowerCase().includes(search.toLowerCase()) || 
    res.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-20 pt-10">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-white">Home</Link>
        <span className="text-zinc-700">/</span>
        <Link to="/sppu" className="transition hover:text-white">SPPU</Link>
        <span className="text-zinc-700">/</span>
        <Link to={`/sppu/${branch.slug}`} className="transition hover:text-white">{branch.name}</Link>
        <span className="text-zinc-700">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}`} className="transition hover:text-white">{semester.title}</Link>
        <span className="text-zinc-700">/</span>
        <Link to={`/sppu/${branch.slug}/${semester.slug}/${subjectSlug}`} className="transition hover:text-white">{subject}</Link>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300">Catalogue</span>
      </nav>

      <section className="mt-9 border-b border-[rgba(255,255,255,0.06)] pb-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
             <Link 
              to={`/sppu/${branch.slug}/${semester.slug}/${subjectSlug}`}
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back to {subject}
            </Link>
            
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
              {catalogue.title}
            </h1>
            
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400">
              <span className="font-medium text-zinc-300">By {catalogue.creator}</span>
              <span className="inline-flex items-center gap-1.5">
                <Star className="text-ember" size={15} fill="currentColor" aria-hidden="true" />
                {catalogue.rating}
              </span>
              <span>{catalogue.downloads} Downloads</span>
              <span>{mockResources.length} Resources</span>
            </div>
            
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              {catalogue.description}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Resources</h2>
            <p className="mt-1 text-sm text-zinc-500">Download files included in this catalogue.</p>
          </div>
          
          <div className="relative w-full sm:max-w-xs">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]"
              size={18}
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-[6px] border border-[rgba(255,255,255,0.06)] py-2 pl-[38px] pr-4 text-sm text-white placeholder:text-[#888888] outline-none transition-colors focus:border-[#6366f1]"
              style={{ background: '#141414' }}
              placeholder="Search resources..."
              type="search"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((res) => {
              const Icon = res.icon;
              return (
                <div 
                  key={res.id} 
                  className="group flex flex-col gap-4 rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-4 transition-colors hover:border-[#6366f1]/50 hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] bg-white/[0.03] text-zinc-400 transition-colors group-hover:bg-[#6366f1]/10 group-hover:text-[#818cf8]">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-base font-medium text-white">{res.title}</h3>
                      <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
                        <span className="rounded-[4px] border border-[rgba(255,255,255,0.06)] bg-white/[0.02] px-1.5 py-0.5">
                          {res.type}
                        </span>
                        <span>{res.size}</span>
                        <span>{res.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-[6px] bg-[#6366f1] px-4 text-sm font-medium text-white transition-colors hover:bg-[#4f46e5] sm:w-auto">
                    <Download size={16} aria-hidden="true" />
                    Download
                  </button>
                </div>
              );
            })
          ) : (
            <div className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-8 text-center text-zinc-400">
              No resources found matching "{search}".
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
