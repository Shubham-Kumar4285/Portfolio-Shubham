import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { primaryButton, secondaryButton } from '@/components/manga/buttons';
import { ChapterHeading, CharacterPanel, PageTurn } from '@/components/manga/layout';
import { Burst, Caption, Panel, ScreenTone, Sfx, SpeedLines } from '@/components/manga/primitives';
import { MissionShot } from '@/components/missions/MissionCards';
import { SiteSignoff } from '@/components/sections/Finale';
import { getAdjacentProjects, getProject, getProjects, missionNumber } from '@/lib/content';
import type { Project } from '@/lib/types';

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/missions/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, images: [{ url: project.image }] },
  };
}

export default async function CaseFilePage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const number = missionNumber(slug);
  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <PageTurn label={`CASE FILE ${number}`} />

      <article className="scene relative bg-paper px-[4vw] pt-[70px] pb-[90px]">
        <ChapterHeading
          as="h1"
          label={`MISSION ${number} · ${project.rank}-RANK`}
          title={project.title.toUpperCase()}
          kanji="任務"
          className="mb-7"
        />

        <div className="g8 grid grid-cols-8 gap-3">
          <Panel slant={[[0, 0], [100, 0], [98, 100], [0, 100]]} className="col-span-5">
            <MissionShot project={project} className="h-full min-h-[380px]" sizes="(max-width: 700px) 100vw, 62vw" />
          </Panel>

          <CharacterPanel pose="strike" bubble="Case closed." className="col-span-3 min-h-[380px] bg-sheet" />

          {/* The story arc: enemy → techniques → victory. */}
          <Panel className="relative col-span-3 overflow-hidden border-[5px] border-line bg-accent p-[22px] text-white">
            <ActLabel n={1} kanji="敵">THE ENEMY</ActLabel>
            <p className="relative mt-3 mb-0 text-lg leading-normal">{project.enemy}</p>
            <Sfx className="absolute -right-1 -bottom-3 text-[64px] text-fg/25">ゴゴゴ</Sfx>
          </Panel>

          <Panel className="relative col-span-2 overflow-hidden border-[5px] border-line bg-ink p-[22px] text-fg-inv">
            <SpeedLines className="-inset-[60%] opacity-10 invert" />
            <ActLabel n={2} kanji="技">TECHNIQUES</ActLabel>
            <ul className="relative mt-4 mb-0 flex list-none flex-wrap gap-2 p-0">
              {project.tags.map((t) => (
                <li key={t} className="border-2 border-bone bg-paper px-2.5 py-1 font-mono text-xs font-bold text-fg shadow-[3px_3px_0_var(--color-accent)]">
                  {t}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel className="relative col-span-3 overflow-hidden border-[5px] border-line bg-sheet p-[22px]">
            <ScreenTone />
            <ActLabel n={3} kanji="勝利">VICTORY</ActLabel>
            <p className="relative mt-3 mb-0 text-lg leading-normal">{project.victory}</p>
            <Burst className="pop -top-1 right-2 rotate-[8deg] text-[22px]">WIN!</Burst>
          </Panel>

          <Panel className="col-span-8 border-[5px] border-line bg-sheet p-7">
            <Caption className="mb-[18px]">{project.short}</Caption>
            <p className="mt-0 mb-7 max-w-[760px] text-xl leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-3.5">
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={primaryButton}>
                VIEW SOURCE
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
                  LIVE DEMO
                </a>
              )}
            </div>
          </Panel>
        </div>
      </article>

      <nav aria-label="Other missions" className="bg-ink px-[4vw] pt-[60px] pb-[60px] text-fg-inv">
        <div className="grid gap-4 sm:grid-cols-2">
          {prev ? <AdjacentLink project={prev} dir="prev" /> : <BackLink />}
          {next ? <AdjacentLink project={next} dir="next" /> : <BackLink />}
        </div>
        <SiteSignoff />
      </nav>
    </>
  );
}

function ActLabel({ n, kanji, children }: { n: number; kanji: string; children: string }) {
  return (
    <h2 className="relative m-0 flex items-baseline gap-2.5 font-display text-[26px] font-normal">
      <span className="font-mono text-xs font-bold">ACT {n}</span>
      {children}
      <span aria-hidden="true" className="text-lg opacity-60">
        {kanji}
      </span>
    </h2>
  );
}

const adjacentClass =
  'panel block border-4 border-bone bg-paper p-5 text-fg no-underline shadow-[6px_6px_0_var(--color-accent)]';

function AdjacentLink({ project, dir }: { project: Project; dir: 'prev' | 'next' }) {
  return (
    <Link href={`/missions/${project.slug}`} className={`${adjacentClass} ${dir === 'next' ? 'sm:text-right' : ''}`}>
      <span className="block font-mono text-xs">
        {dir === 'prev' ? '← PREVIOUS' : 'NEXT →'} · MISSION {missionNumber(project.slug)}
      </span>
      <span className="mt-1 block font-display text-[28px] leading-tight">{project.title.toUpperCase()}</span>
    </Link>
  );
}

function BackLink() {
  return (
    <Link href="/#ch3" className={adjacentClass}>
      <span className="block font-mono text-xs">↩ ALL MISSIONS</span>
      <span className="mt-1 block font-display text-[28px] leading-tight">BACK TO CHAPTER 03</span>
    </Link>
  );
}
