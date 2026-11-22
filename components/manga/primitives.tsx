import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

type PanelProps<T extends ElementType> = {
  as?: T;
  /** Scroll-driven flip-in entry (default true). */
  animate?: boolean;
  /**
   * Reading order inside a pinned page (0-based). On desktop the panel appears
   * when the reader reaches this step; elsewhere it behaves like a normal panel.
   */
  step?: number;
  /**
   * Cut the panel to this polygon (x/y percentages, e.g. [[0,0],[100,0],[96,100],[0,100]]).
   * The 5px ink border is drawn along the cut, so angled edges stay bordered.
   * Don't add a CSS border to slanted panels.
   */
  slant?: [number, number][];
} & ComponentPropsWithoutRef<T>;

/** A bordered manga panel. Layout/colour come from className. */
export function Panel<T extends ElementType = 'div'>({
  as,
  animate = true,
  step,
  slant,
  className,
  style,
  children,
  ...rest
}: PanelProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  const stepped = step !== undefined;
  const css: CSSProperties = { ...style };
  if (stepped) Object.assign(css, { '--s': step });
  if (slant) css.clipPath = `polygon(${slant.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;

  return (
    <Tag
      className={cx('panel', stepped ? 'step' : animate && 'in', slant && 'slanted relative', className)}
      data-s={stepped ? step : undefined}
      style={css}
      {...rest}
    >
      {children}
      {slant && (
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="slant-border">
          {/* Stroke is centred on the cut, so half of the 10px stroke (5px) shows inside it. */}
          <polygon
            points={slant.map(([x, y]) => `${x},${y}`).join(' ')}
            fill="none"
            stroke="#111"
            strokeWidth="10"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </Tag>
  );
}

/** Boxed narration caption. */
export function Caption({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cx('cap m-0', className)}>{children}</p>;
}

/** One line of bubble text: whole line for screen readers, single letters for the typewriter. */
function BubbleLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span key={i} className="ch" style={{ '--i': i } as CSSProperties}>
            {c}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Oval speech bubble; position it with className (e.g. `right-3.5 top-3.5`).
 * Plain-text lines type out letter by letter once <ScrollFx/> arms them;
 * screen readers get the whole line at once. Pass `night` for a Night Edition line.
 */
export function Bubble({ className, children, night }: { className?: string; children: string; night?: string }) {
  return (
    <p className={cx('bubble pop', className)} data-type="">
      {night ? (
        <>
          <BubbleLine text={children} className="ed-day" />
          <BubbleLine text={night} className="ed-night" />
        </>
      ) : (
        <BubbleLine text={children} />
      )}
      <svg aria-hidden="true" viewBox="0 0 30 26" className="bubble-tail">
        {/* Open path: the stroke draws only the two curved sides; the fill closes across the join. */}
        <path d="M6 0 C9 9 7 17 0 26 C11 21 20 12 26 0" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    </p>
  );
}

/** Text that differs between the Day and Night editions; CSS shows the active one. */
export function EditionText({ day, night }: { day: string; night: string }) {
  if (day === night) return <>{day}</>;
  return (
    <>
      <span className="ed-day">{day}</span>
      <span className="ed-night">{night}</span>
    </>
  );
}

/** Spiky sound-effect burst. Decorative. */
export function Burst({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span aria-hidden="true" data-shake="" className={cx('burst', className)}>
      {children}
    </span>
  );
}

/** Slamming katakana / SFX lettering. Decorative. */
export function Sfx({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span aria-hidden="true" data-shake="" className={cx('sfx font-display', className)}>
      {children}
    </span>
  );
}

/** Radial speed lines filling the parent (parent must be relative + overflow-hidden). */
export function SpeedLines({ className, spin = false }: { className?: string; spin?: boolean }) {
  return <div aria-hidden="true" className={cx('speed absolute', spin && 'spinlines', className)} />;
}

/** Light screentone overlay. */
export function ScreenTone({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cx('tone-lt absolute inset-0', className)} />;
}

/** Ink "ruins" landscape sketched along the bottom of a panel. */
export function Ruins() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      className="ruins absolute inset-x-0 bottom-0 z-0 h-[45%] w-full"
    >
      <g fill="none" stroke="#111" strokeWidth="2">
        <path d="M0 120 L70 110 L120 140 L190 118 L260 150 L330 128 L400 140" />
        <path d="M0 200 L60 190 L110 230 L180 205 L240 240 L320 215 L400 235" />
        <path d="M70 110 L60 190 M120 140 L110 230 M190 118 L180 205 M260 150 L240 240 M330 128 L320 215" />
        <path d="M60 190 L40 300 M110 230 L130 300 M240 240 L220 300 M320 215 L350 300" />
        <path d="M150 170 L162 186 L150 196 M290 180 L300 196" strokeWidth="1" />
      </g>
      <g stroke="#111" strokeWidth="1" opacity=".5">
        <path d="M10 260 L40 255 M20 270 L50 266 M300 270 L340 262 M310 282 L350 276 M200 280 L230 276" />
      </g>
    </svg>
  );
}

export { cx };
