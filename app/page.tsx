import { PageTurn } from '@/components/manga/layout';
import { Awakening } from '@/components/sections/Awakening';
import { Cover } from '@/components/sections/Cover';
import { Experience } from '@/components/sections/Experience';
import { Finale } from '@/components/sections/Finale';
import { Missions } from '@/components/sections/Missions';
import { Origin } from '@/components/sections/Origin';
import { chapterShift } from '@/lib/content';

export default function Home() {
  const shift = chapterShift();
  return (
    <>
      <Cover />
      <PageTurn label="PAGE 02" />
      <Origin />
      <PageTurn label="PAGE 03" />
      <Awakening />
      <PageTurn label="PAGE 04" variant="paper" />
      {shift > 0 && (
        <>
          <Experience />
          <PageTurn label="PAGE 05" />
        </>
      )}
      <Missions />
      <PageTurn label="LAST PAGE" />
      <Finale />
      {/* Filled in and shown by <ScrollFx/>. */}
      <p
        data-page-counter
        hidden
        aria-hidden="true"
        className="pointer-events-none fixed right-4 bottom-4 z-20 m-0 border-[3px] border-line bg-paper px-3 py-1.5 font-mono text-xs font-bold text-fg shadow-[3px_3px_0_var(--color-accent)]"
      >
        PAGE 1 / {5 + shift}
      </p>
    </>
  );
}
