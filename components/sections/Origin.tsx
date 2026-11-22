import type { CSSProperties } from 'react';
import { ChapterHeading, CharacterPanel } from '@/components/manga/layout';
import { Caption, Panel, ScreenTone, Sfx, SpeedLines } from '@/components/manga/primitives';
import { edition, getOrigin, getPersonal } from '@/lib/content';

const cardTitle = 'm-0 font-display text-[26px]';
const cardBody = 'mt-2 mb-0 text-base leading-normal';

export function Origin() {
  const origin = getOrigin();
  const { title, yearsExp, location } = getPersonal();

  return (
    <section
      id="ch1"
      data-page="2"
      className="pin-track scene relative bg-paper px-[4vw] pt-[70px] pb-[90px]"
      style={{ '--n': 6 } as CSSProperties}
    >
      <div className="pin-stage">
        <ChapterHeading label="CHAPTER 01" title="ORIGIN" kanji="始まり" className="mb-7" />

        {/* Reading order: wide shot → narration → SFX → detail panels. */}
        <div className="g8 grid grid-cols-8 gap-3">
          <CharacterPanel
            step={0}
            pose="think"
            bubble={edition('b1').day}
            nightBubble={edition('b1').night}
            className="col-span-2 row-span-2 min-h-[380px] bg-sheet"
          />

          <Panel
            step={1}
            slant={[
              [0, 0],
              [100, 0],
              [96, 100],
              [0, 100],
            ]}
            className="col-span-4 bg-sheet p-8"
          >
            <Caption className="mb-[18px]">{origin.caption}</Caption>
            <p className="m-0 max-w-[620px] text-xl leading-relaxed">{origin.intro}</p>
          </Panel>

          <Panel
            step={2}
            slant={[
              [6, 0],
              [100, 0],
              [100, 100],
              [0, 100],
            ]}
            className="col-span-2 flex min-h-[220px] items-center justify-center overflow-hidden bg-ink text-fg-inv"
          >
            <SpeedLines className="-inset-[60%] opacity-25 invert" />
            <Sfx className="relative text-[64px] text-accent [-webkit-text-stroke:2px_#EDE6D6]">カチッ</Sfx>
          </Panel>

          <Panel step={3} className="col-span-2 border-[5px] border-line bg-accent p-[22px] text-white">
            <h3 className={cardTitle}>THE BUG</h3>
            <p className={cardBody}>{origin.originMoment}</p>
          </Panel>

          <Panel step={4} className="relative col-span-2 border-[5px] border-line bg-sheet p-[22px]">
            <ScreenTone />
            <h3 className={`relative ${cardTitle}`}>OFF-DUTY</h3>
            <p className={`relative ${cardBody}`}>{origin.offDuty}</p>
          </Panel>

          <Panel step={5} className="col-span-2 border-[5px] border-line bg-ink p-[22px] text-fg-inv">
            <h3 className={cardTitle}>STATUS</h3>
            <dl className="mt-2 mb-0 font-mono text-sm leading-[1.7]">
              <Stat k="CLASS" v={title.replace(/ Developer$/i, '')} />
              {yearsExp && <Stat k="EXP" v={`${yearsExp} yrs`} />}
              <Stat k="BASE" v={location} />
            </dl>
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="inline">{k}: </dt>
      <dd className="m-0 inline">{v}</dd>
    </div>
  );
}
