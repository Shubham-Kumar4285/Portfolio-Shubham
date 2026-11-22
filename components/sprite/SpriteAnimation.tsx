'use client';

import { useEffect, type CSSProperties } from 'react';
import type { SpriteSheet } from './sheets';

type Props<A extends string> = {
  sheet: SpriteSheet<A>;
  anim: A;
  /** Override whether it loops (e.g. preview a one-shot on repeat). */
  loop?: boolean;
  /** Fires when a one-shot animation finishes (e.g. go back to idle). */
  onEnd?: () => void;
  /** Fires each time a looping animation starts over. */
  onLoop?: () => void;
  /** Size it with CSS (a height is enough; the width follows the frame's aspect ratio). */
  className?: string;
  /** Accessible name; without it the sprite is decorative. */
  label?: string;
};

/**
 * Plays one row of a sprite sheet with a pure-CSS `steps()` animation:
 * no canvas, no JS loop, and the browser pauses it off-screen for free.
 * Positions are percentages, so the sprite scales to whatever size CSS gives it.
 */
export function SpriteAnimation<A extends string>({ sheet, anim, loop, onEnd, onLoop, className, label }: Props<A>) {
  const a = { ...sheet.animations[anim], ...(loop !== undefined && { loop }) };

  // Reduced motion stops CSS animations, so a one-shot would never end: finish it now.
  useEffect(() => {
    if (!a.loop && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) onEnd?.();
  }, [a.loop, onEnd]);

  // With background-size = columns×100%, frame k sits at k / (columns − 1) × 100%.
  const step = 100 / (sheet.columns - 1);

  const style = {
    aspectRatio: `${sheet.frameWidth} / ${sheet.frameHeight}`,
    backgroundImage: `url(${sheet.src})`,
    backgroundSize: `${sheet.columns * 100}% ${sheet.rows * 100}%`,
    backgroundPositionY: `${sheet.rows > 1 ? (a.row * 100) / (sheet.rows - 1) : 0}%`,
    '--sprite-end': `${a.frames * step}%`,
    '--fh': `${sheet.frameHeight}px`, // fx.css snaps the height to whole multiples of this
    animationDuration: `${a.frames / a.fps}s`,
    animationTimingFunction: `steps(${a.frames})`,
    animationIterationCount: a.loop ? 'infinite' : 1,
  } as CSSProperties;

  return (
    <div
      // A new key restarts the animation from frame 0 whenever it changes.
      key={String(anim)}
      className={`sprite-sheet ${className ?? ''}`}
      data-anim={anim}
      style={style}
      onAnimationEnd={onEnd}
      onAnimationIteration={onLoop}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    />
  );
}
