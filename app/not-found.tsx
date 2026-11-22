import Link from 'next/link';
import { primaryButton } from '@/components/manga/buttons';
import { CharacterPanel, PageTurn } from '@/components/manga/layout';
import { Caption, Panel, SpeedLines } from '@/components/manga/primitives';

export default function NotFound() {
  return (
    <>
      <PageTurn label="MISSING PAGE" />
      <section className="scene relative overflow-hidden bg-ink px-[4vw] pt-[70px] pb-[90px] text-fg-inv">
        <SpeedLines spin className="-inset-[80%] opacity-[.12] invert" />
        <div className="relative flex flex-wrap items-stretch gap-5">
          <CharacterPanel pose="think" bubble="…This page isn’t in the volume." className="min-h-[340px] max-w-[420px] flex-[1_1_300px] bg-paper" />
          <Panel className="@container max-w-[760px] flex-[2_1_420px] border-[5px] border-bone bg-paper p-[clamp(28px,5vw,56px)] text-fg shadow-[14px_14px_0_var(--color-accent)]">
            <Caption className="mb-[18px]">Error 404. The trail goes cold here.</Caption>
            <h1 className="sfx mt-0 mb-6 font-display text-[clamp(28px,10.5cqi,88px)] font-normal leading-none">LOST PAGE</h1>
            <Link href="/" className={`inline-block ${primaryButton}`}>
              BACK TO THE COVER
            </Link>
          </Panel>
        </div>
      </section>
    </>
  );
}
