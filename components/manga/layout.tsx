import { Hero, type Pose } from './Hero';
import { Bubble, Panel, Ruins, cx } from './primitives';

/** Panel with the ink landscape, the companion in a pose, and a speech bubble. */
export function CharacterPanel({
  pose,
  bubble,
  nightBubble,
  className,
  step,
}: {
  pose: Pose;
  bubble: string;
  /** Night Edition line; defaults to the day line. */
  nightBubble?: string;
  className?: string;
  /** Reading order inside a pinned page. */
  step?: number;
}) {
  return (
    <Panel step={step} className={cx('relative overflow-hidden border-[5px] border-line', className)}>
      {/* Walking: the ground scrolls under him. */}
      <Ruins moving={pose === 'dash'} />
      {/* Night Edition: a red slash cuts across the panel. */}
      <div aria-hidden="true" className="slash" />
      <div className="char-in absolute inset-[8%_4%_0]">
        <Hero pose={pose} />
      </div>
      <Bubble className="right-3.5 top-3.5" night={nightBubble}>
        {bubble}
      </Bubble>
    </Panel>
  );
}

/**
 * Strip between chapters. The previous page (the "sheet") curls away as you
 * scroll, revealing the next page number underneath.
 */
export function PageTurn({ label, variant = 'ink' }: { label: string; variant?: 'ink' | 'paper' }) {
  const onInk = variant === 'ink';
  return (
    <div
      aria-hidden="true"
      className={cx(
        'turn relative h-[90px] overflow-hidden',
        onInk ? 'bg-ink text-fg-inv' : 'border-b-4 border-line bg-paper text-fg',
      )}
    >
      <div className="flex h-full items-center px-[4vw] font-mono text-[13px] tracking-[.3em]">— {label} —</div>
      <div className={cx('turn-sheet', onInk ? 'tone-lt bg-paper' : 'bg-ink')} />
      <div className="turn-flap-wrap">
        <div className={cx('turn-flap', !onInk && 'on-ink')} />
      </div>
    </div>
  );
}

interface ChapterHeadingProps {
  label: string;
  title: string;
  kanji: string;
  /** Section background: picks the readable violet for the label. */
  on?: 'light' | 'dark';
  as?: 'h1' | 'h2';
  className?: string;
}

export function ChapterHeading({ label, title, kanji, on = 'light', as: Tag = 'h2', className }: ChapterHeadingProps) {
  return (
    <div className={cx('flex flex-wrap items-baseline gap-[18px]', className ?? 'mb-5')}>
      <span className={cx('font-mono text-sm', on === 'light' ? 'text-accent-text' : 'text-accent-soft')}>{label}</span>
      <Tag className="sfx m-0 font-display text-[clamp(36px,7vw,104px)] font-normal leading-none">{title}</Tag>
      <span aria-hidden="true" className="font-display text-[40px] text-accent">
        {kanji}
      </span>
    </div>
  );
}
