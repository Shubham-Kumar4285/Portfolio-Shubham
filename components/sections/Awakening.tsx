import { ChapterHeading, CharacterPanel } from '@/components/manga/layout';
import { Panel, Sfx, SpeedLines } from '@/components/manga/primitives';
import { Ed } from '@/components/manga/Ed';
import { edition, getSkills } from '@/lib/content';

/**
 * Rough rendered width of a name in Dela Gothic One, in em
 * (capitals are wide, punctuation and spaces narrow), calibrated against the rendered font, plus 6% headroom.
 */
function nameWidthEm(name: string): number {
  let em = 0;
  for (const ch of name) em += /[A-Z]/.test(ch) ? 0.85 : /[a-z0-9]/.test(ch) ? 0.66 : /\s/.test(ch) ? 0.3 : 0.45;
  return +(em * 1.06).toFixed(2);
}

export function Awakening() {
  const skills = getSkills();

  return (
    <section id="ch2" data-page="3" className="scene relative overflow-hidden bg-ink px-[4vw] pt-[70px] pb-[90px] text-fg-inv">
      <SpeedLines spin className="par -inset-[60%] opacity-[.08] invert" />
      <div className="relative">
        <ChapterHeading label="CHAPTER 02" title="AWAKENING" kanji="覚醒" on="dark" />

        <div className="mb-[30px] flex flex-wrap items-stretch gap-4">
          <CharacterPanel
            pose="strike"
            bubble={edition('b2').day}
            nightBubble={edition('b2').night}
            className="min-h-[360px] max-w-[460px] flex-[1_1_320px] bg-paper"
          />
          <Panel className="relative flex flex-[2_1_360px] flex-col justify-center overflow-hidden border-[5px] border-bone bg-accent p-[30px] text-white">
            <SpeedLines className="-inset-[60%] opacity-15 invert" />
            <p className="relative m-0 font-display text-[clamp(32px,4vw,56px)] leading-[1.05]">
              <Ed k="ch2" />
            </p>
          </Panel>
        </div>

        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4 p-0">
          {skills.map((s, i) => (
            <Panel
              as="li"
              key={s.name}
              className="@container flex min-h-[160px] flex-col justify-between border-4 border-bone bg-paper p-[18px] text-fg shadow-[6px_6px_0_var(--color-accent)]"
            >
              <div className="flex justify-between font-mono text-xs">
                <span>TECHNIQUE {String(i + 1).padStart(2, '0')}</span>
                <span>{s.tag}</span>
              </div>
              {/* 28px like the design, shrinking only when a long name (e.g. "JavaScript") would overflow the card. */}
              <p
                className="m-0 font-display leading-none whitespace-nowrap"
                style={{ fontSize: `min(28px, calc(100cqi / ${nameWidthEm(s.name)}))` }}
              >
                {s.name}
              </p>
              <div
                role="meter"
                aria-label={`${s.name} proficiency`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={s.level}
                className="h-2.5 border-2 border-line bg-sheet"
              >
                <div className="tone h-full" style={{ width: `${s.level}%` }} />
              </div>
            </Panel>
          ))}
        </ul>

        <Sfx className="mt-[30px] block text-right text-[90px] text-accent [-webkit-text-stroke:3px_#EDE6D6]">ズバッ</Sfx>
      </div>
    </section>
  );
}
