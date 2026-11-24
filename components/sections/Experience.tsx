import { ChapterHeading } from '@/components/manga/layout';
import { Panel, ScreenTone, Sfx } from '@/components/manga/primitives';
import { getExperience } from '@/lib/content';
import type { Experience as Job } from '@/lib/types';

/** Work history, one "arc" per role, newest first. Renders nothing when there's no experience. */
export function Experience() {
  const jobs = getExperience();
  if (!jobs.length) return null;

  return (
    <section id="experience" data-page="4" className="scene relative overflow-hidden bg-paper px-[4vw] pt-[70px] pb-[90px]">
      <div className="relative">
        <ChapterHeading label="CHAPTER 03" title="EXPERIENCE" kanji="経験" />

        <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
          {jobs.map((job, i) => (
            <Arc key={`${job.company}-${job.period}`} job={job} number={String(jobs.length - i).padStart(2, '0')} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Arc({ job, number }: { job: Job; number: string }) {
  return (
    <li className="g8 grid grid-cols-8 gap-3">
      <Panel className="relative col-span-2 flex flex-col justify-between gap-4 overflow-hidden border-[5px] border-line bg-ink p-[22px] text-fg-inv">
        <p className="m-0 font-mono text-xs font-bold tracking-[.2em] text-accent-soft">ARC {number}</p>
        <div className="relative">
          <p className="m-0 font-display text-[26px] leading-tight">{job.period}</p>
          {job.location && <p className="mt-1.5 mb-0 font-mono text-sm">{job.location}</p>}
        </div>
        <Sfx className="pointer-events-none absolute -right-2 -bottom-3 text-[72px] text-accent opacity-30">
          {number}
        </Sfx>
      </Panel>

      <Panel
        as="article"
        className="relative col-span-6 border-[5px] border-line bg-sheet p-[22px] shadow-[8px_8px_0_var(--color-accent)]"
      >
        <ScreenTone className="opacity-40" />
        <div className="relative">
          <h3 className="m-0 font-display text-[clamp(24px,3vw,34px)] font-normal leading-tight">{job.role.toUpperCase()}</h3>
          <p className="mt-1 mb-3 font-mono text-sm font-bold text-accent-text">
            @{' '}
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer">
                {job.company}
              </a>
            ) : (
              job.company
            )}
          </p>
          <p className="mt-0 mb-3 text-[17px] leading-normal">{job.summary}</p>
          {job.highlights.length > 0 && (
            <ul className="mt-0 mb-4 flex flex-col gap-1.5 pl-5 text-base leading-normal marker:text-accent">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          {job.tags.length > 0 && (
            <ul aria-label="Tech used" className="m-0 flex list-none flex-wrap gap-2 p-0">
              {job.tags.map((t) => (
                <li
                  key={t}
                  className="border-2 border-line bg-paper px-2.5 py-1 font-mono text-xs font-bold text-fg shadow-[3px_3px_0_var(--color-accent)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>
    </li>
  );
}
