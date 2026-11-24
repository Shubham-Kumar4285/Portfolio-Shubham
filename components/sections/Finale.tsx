import { CharacterPanel } from '@/components/manga/layout';
import { Caption, Panel, SpeedLines } from '@/components/manga/primitives';
import { Ed } from '@/components/manga/Ed';
import { chapterShift, edition, getContact, getPersonal, getSite, getSocial } from '@/lib/content';
import { ContactForm } from './ContactForm';

const smallButton = 'border-[3px] border-line bg-sheet px-4 py-2.5 font-mono text-sm font-bold no-underline';

export function Finale() {
  const social = getSocial();
  const { email, resume } = getPersonal();
  const { formspreeId } = getContact();

  return (
    <section
      id="ch4"
      data-page={5 + chapterShift()}
      className="scene relative box-border min-h-[90vh] overflow-clip bg-ink px-[4vw] pt-[90px] pb-[120px] text-fg-inv"
    >
      <SpeedLines spin className="-inset-[80%] opacity-[.12] invert" />
      <div className="relative flex flex-wrap items-stretch gap-5">
        <CharacterPanel
          pose="end"
          bubble={edition('b4').day}
          nightBubble={edition('b4').night}
          className="min-h-[360px] max-w-[420px] flex-[1_1_300px] bg-paper"
        />

        <Panel className="@container relative max-w-[760px] flex-[2_1_420px] border-[5px] border-bone bg-paper p-[clamp(28px,5vw,56px)] text-fg shadow-[14px_14px_0_var(--color-accent)]">
          <Caption className="mb-[18px]">“Your move, reader.”</Caption>
          <h2 className="sfx mt-0 mb-3 font-display text-[clamp(28px,10.5cqi,88px)] font-normal leading-none">
            <Ed k="end" />
          </h2>
          <p className="mt-0 mb-[26px] text-xl">
            <Ed k="endsub" />
          </p>

          <ContactForm formId={formspreeId} submitLabel={<Ed k="cta" />} />

          <div className="mt-7 flex flex-wrap items-center gap-3 border-t-[3px] border-line pt-5">
            <span className="mr-1 font-mono text-xs font-bold tracking-[.15em]">OR FIND ME ON</span>
            {email && (
              <a href={`mailto:${email}`} className={smallButton}>
                EMAIL
              </a>
            )}
            {resume && (
              <a href={resume} download className={smallButton}>
                RESUME ↓
              </a>
            )}
            {social.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className={smallButton}>
                {s.name.toUpperCase()}
              </a>
            ))}
          </div>
        </Panel>
      </div>
      <SiteSignoff />
    </section>
  );
}

export function SiteSignoff() {
  const { shortName } = getPersonal();
  const { volume } = getSite();
  return (
    <p className="relative mt-[60px] mb-0 font-mono text-xs">
      {shortName.toUpperCase()} · {volume} · END ■
    </p>
  );
}
