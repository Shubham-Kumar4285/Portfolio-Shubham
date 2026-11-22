import Image from 'next/image';
import Link from 'next/link';
import { Panel, cx } from '@/components/manga/primitives';
import type { Project } from '@/lib/types';

/** Project screenshot in full colour, with light halftone dots that fade on hover. */
export function MissionShot({
  project,
  className,
  sizes,
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes: string;
  /** Above-the-fold hero image (case file): load it right away. */
  priority?: boolean;
}) {
  return (
    <div className={cx('group/shot relative overflow-hidden bg-ink', className)}>
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes={sizes}
        preload={priority}
        className="object-cover object-top"
      />
      {/* Light halftone so it reads as print; the dots fade on hover to show the clean shot. */}
      <div
        aria-hidden="true"
        className="tone absolute inset-0 opacity-20 mix-blend-multiply transition-opacity duration-500 group-hover/shot:opacity-0"
      />
    </div>
  );
}

/** The headline (S-rank) mission on the home page. */
export function MissionFeature({ project, number }: { project: Project; number: string }) {
  return (
    <Panel
      as="article"
      slant={[[0, 0], [100, 0], [97, 100], [0, 100]]}
      className="col-span-4 bg-paper"
    >
      <MissionShot project={project} className="h-[260px]" sizes="(max-width: 700px) 100vw, 60vw" />
      <div className="p-[22px]">
        <p className="m-0 font-mono text-xs">
          MISSION {number} · {project.rank}-RANK
        </p>
        <h3 className="mt-1.5 mb-2.5 font-display text-[38px] font-normal">{project.title.toUpperCase()}</h3>
        <p className="mt-0 mb-4 text-[17px] leading-normal">{project.summary}</p>
        <Link
          href={`/missions/${project.slug}`}
          className="inline-block bg-ink px-[18px] py-3 font-mono font-bold text-white no-underline hover:text-accent-soft"
        >
          OPEN CASE FILE →
        </Link>
      </div>
    </Panel>
  );
}

/** Small ranked mission card; the whole card is clickable via a stretched link. */
export function MissionCard({ project, number }: { project: Project; number: string }) {
  return (
    <Panel as="article" className="relative flex-1 border-[5px] border-line bg-sheet p-[18px] hover:[&_h3]:text-accent">
      <span
        aria-hidden="true"
        className="absolute right-3 top-1.5 font-display text-[40px] text-accent [-webkit-text-stroke:2px_#111]"
      >
        {number}
      </span>
      <p className="m-0 font-mono text-xs">{project.rank}-RANK</p>
      <h3 className="mt-1.5 mb-1 font-display text-[22px] font-normal">
        <Link href={`/missions/${project.slug}`} className="no-underline after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>
      <p className="m-0 text-[15px]">{project.short}</p>
    </Panel>
  );
}
