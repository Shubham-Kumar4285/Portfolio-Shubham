'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Embers } from './Embers';
import { SpriteAnimation } from './SpriteAnimation';
import { RONIN, type RoninAnim } from './sheets';

/**
 * The character in a panel: loops `base` (a one-shot like `slash` loops too when it is
 * the base), with edition-coloured embers around him. He strikes once when he scrolls
 * into view and whenever his panel (or, outside a panel, his frame) is hovered.
 */
export function SpriteActor({ base = 'idle', className, label }: { base?: RoninAnim; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<RoninAnim>(base);
  const [strikes, setStrikes] = useState(0); // replays the spark burst

  const strike = useCallback(() => {
    setStrikes((n) => n + 1);
    setAnim((a) => (a === base && RONIN.animations[a].loop ? 'slash' : a));
  }, [base]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.closest('.panel') ?? el.parentElement;
    host?.addEventListener('mouseenter', strike);

    // Animate only while on screen (CSS pauses everything without data-on),
    // and strike once each time he comes into view.
    let seen = false;
    const setOn = (on: boolean) => el.toggleAttribute('data-on', on);
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([e]) => {
              setOn(e.isIntersecting);
              if (e.intersectionRatio >= 0.3 && !seen) strike();
              seen = e.intersectionRatio >= 0.3;
            },
            { threshold: [0, 0.3] },
          );
    if (io) io.observe(el);
    else setOn(true);
    return () => {
      host?.removeEventListener('mouseenter', strike);
      io?.disconnect();
    };
  }, [strike]);

  const looping = anim === base;
  return (
    <div ref={ref} className={`sprite-actor relative flex items-end justify-center ${className ?? ''}`}>
      <Embers burst={anim === 'slash'} burstKey={strikes} />
      <SpriteAnimation
        sheet={RONIN}
        anim={anim}
        loop={looping || undefined}
        onEnd={() => setAnim(base)}
        onLoop={base === 'slash' ? () => setStrikes((n) => n + 1) : undefined}
        className="relative z-[1] h-full"
        label={label}
      />
    </div>
  );
}
