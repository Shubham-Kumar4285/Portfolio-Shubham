import Link from 'next/link';
import { preload } from 'react-dom';
import { Hero } from '@/components/manga/Hero';
import { Ed } from '@/components/manga/Ed';
import { Bubble, Burst, Ruins, ScreenTone, SpeedLines } from '@/components/manga/primitives';
import { RONIN } from '@/components/sprite/sheets';
import { edition, getPersonal } from '@/lib/content';

const titleSize = 'font-display text-[clamp(44px,13vw,210px)] leading-none -skew-x-[8deg]';

/** Sticky, scroll-choreographed cover. The character sits between two title layers. */
export function Cover() {
  // The character sheet is a CSS background, so tell the browser about it up front.
  preload(RONIN.src, { as: 'image', fetchPriority: 'high' });
  const { shortName, title } = getPersonal();
  const b0 = edition('b0');
  const name = shortName.toUpperCase();

  return (
    <section id="cover" data-page="1" aria-label="Cover" className="cover cover-track relative h-[190vh]">
      <div className="sticky top-[var(--header-h)] box-border h-[calc(100svh-var(--header-h))] px-[4vw] pb-[22px] pt-4">
        <div className="cv-a relative h-full overflow-hidden border-[5px] border-line bg-paper-2">
          {/* background */}
          <SpeedLines spin className="-inset-[70%] opacity-55" />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[55%] h-[80%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper-2 blur-[40px]"
          />
          <ScreenTone className="opacity-60" />
          {/* Night Edition: blood moon. */}
          <div aria-hidden="true" className="moon" />
          <Ruins />
          <CoverSpecks />
          <span
            aria-hidden="true"
            className="brush absolute left-[20%] top-[4%] rotate-[-6deg] font-display text-[clamp(110px,16vw,240px)] leading-none text-accent [animation-delay:.1s]"
          >
            覚
          </span>
          <span
            aria-hidden="true"
            className="brush absolute bottom-0 right-[18%] rotate-[5deg] font-display text-[clamp(110px,16vw,240px)] leading-none text-accent [animation-delay:.35s]"
          >
            醒
          </span>

          {/* title, back layer (solid) */}
          <div aria-hidden="true" className="cv-t pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className={`${titleSize} text-white [-webkit-text-stroke:4px_#111] [text-shadow:8px_8px_0_#111]`}>{name}</span>
          </div>

          {/* character */}
          <div className="cv-h m-hero absolute bottom-0 left-1/2 ml-[calc(min(46vw,560px)/-2)] h-[92%] w-[min(46vw,560px)] origin-bottom">
            <div className="load-rise h-full w-full">
              <Hero pose="cover" label="Pixel-art ronin developer with a katana on his shoulder" />
            </div>
          </div>

          {/* title, front layer (outline only) */}
          <div className="cv-t pointer-events-none absolute inset-0 flex items-center justify-center">
            <h1 className={`${titleSize} m-0 font-normal text-transparent [-webkit-text-stroke:3px_#111]`}>{name}</h1>
          </div>

          {/* lettering */}
          <p className="cap m-hide absolute left-6 top-6 m-0 max-w-[300px]">
            <Ed k="cover" />
          </p>
          <Burst className="pop m-hide left-[24%] top-[30%] rotate-[-8deg] text-[30px]">
            <Ed k="sfx" />
          </Burst>
          <Bubble className="m-cbub right-[22%] top-[18%]" night={b0.night}>
            {b0.day}
          </Bubble>

          <div className="cv-b m-cl absolute bottom-6 left-6 max-w-[360px] border-4 border-line bg-ink px-5 py-[18px] text-fg-inv shadow-[6px_6px_0_var(--color-accent)]">
            <p className="m-0 font-display text-[22px]">{title.toUpperCase()}</p>
            <p className="mt-1.5 mb-0 text-[15px] leading-normal">
              <Ed k="tag" />
            </p>
          </div>
          <div className="cv-b m-cr absolute bottom-6 right-6 flex flex-col items-end gap-2.5">
            <Burst className="relative text-[34px]">BOOM</Burst>
            <Link
              href="#ch3"
              className="border-4 border-line bg-sheet px-5 py-3.5 font-mono font-bold no-underline shadow-[5px_5px_0_var(--color-shadow)]"
            >
              VIEW MISSIONS ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoverSpecks() {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="ruins absolute inset-0 h-full w-full">
      <g fill="#111">
        <circle cx="30" cy="30" r="1.2" />
        <circle cx="34" cy="26" r=".5" />
        <circle cx="72" cy="22" r="1.6" />
        <circle cx="76" cy="28" r=".6" />
        <circle cx="64" cy="70" r="1" />
        <circle cx="22" cy="64" r=".8" />
        <circle cx="82" cy="58" r="1.3" />
        <circle cx="40" cy="84" r="1.1" />
      </g>
    </svg>
  );
}
