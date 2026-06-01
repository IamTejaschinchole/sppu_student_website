import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';

export default function CataloguePlaceholderPage() {
  const { catalogueId } = useParams();
  const navigate = useNavigate();

  // Simple title mapping just for the placeholder
  const titleMap = {
    'complete-notes-pack': 'Complete Notes Pack',
    'pyq-collection': 'PYQ Collection (2019-2023)',
    'assignment-collection': 'Assignment Solutions',
    'lab-resources': 'Complete Lab Manual',
  };

  const title = titleMap[catalogueId] || 'Catalogue Details';

  return (
    <main className="mx-auto w-full max-w-[1200px] px-[24px] pb-16 pt-10">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back
      </button>

      <section className="rounded-[8px] border border-[rgba(255,255,255,0.06)] bg-[#141414] p-6 sm:p-8">
        <div className="grid h-12 w-12 place-items-center rounded-[8px] border border-[#6366f1]/25 bg-[#6366f1]/10 text-[#818cf8]">
          <Layers size={23} aria-hidden="true" />
        </div>
        <p className="mt-6 text-[13px] font-medium uppercase tracking-wider text-zinc-400">Catalogue Selected</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          This is a placeholder page for the catalogue detail view. In the future, this page will list all individual resources (PDFs, links) included in this catalogue.
        </p>
      </section>
    </main>
  );
}
