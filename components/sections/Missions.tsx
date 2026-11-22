import { MissionCard, MissionFeature } from '@/components/missions/MissionCards';
import { ChapterHeading, CharacterPanel } from '@/components/manga/layout';
import { Panel, Sfx } from '@/components/manga/primitives';
import { edition, getProjects, missionNumber } from '@/lib/content';

export function Missions() {
  const [feature, ...rest] = getProjects();

  return (
    <section id="ch3" data-page="4" className="scene relative overflow-hidden bg-sheet px-[4vw] pt-[70px] pb-[90px]">
      <div aria-hidden="true" className="hlines rush absolute inset-y-0 left-0 -right-[200px] opacity-[.06]" />
      <div className="relative">
        <ChapterHeading label="CHAPTER 03" title="MISSIONS" kanji="任務" />

        <div className="mb-3.5 flex flex-wrap gap-3.5">
          <CharacterPanel
            pose="dash"
            bubble={edition('b3').day}
            nightBubble={edition('b3').night}
            className="min-h-[360px] flex-[3_1_420px] bg-sheet"
          />
          <Panel className="flex flex-[1_1_240px] items-center justify-center border-[5px] border-line bg-ink p-6 text-fg-inv">
            <Sfx className="text-[80px] text-accent [-webkit-text-stroke:2px_#EDE6D6]">ダッ</Sfx>
          </Panel>
        </div>

        {feature && (
          <div className="g8 grid grid-cols-6 gap-3.5">
            <MissionFeature project={feature} number={missionNumber(feature.slug)} />
            <div className="col-span-2 flex min-w-0 flex-col gap-3.5">
              {rest.map((p) => (
                <MissionCard key={p.slug} project={p} number={missionNumber(p.slug)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
