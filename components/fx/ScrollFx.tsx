'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Keep in sync with the pinned-page media query in app/styles/fx.css. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)';
/** Elements that animate in. CSS drives them where scroll timelines exist; this script does elsewhere. */
const REVEAL = '.in, .step, .sfx, .pop, .char-in';

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const all = (sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<HTMLElement>(sel));

/**
 * The only client script on the site. It:
 *  - types speech bubbles out and shakes the page when SFX land (all browsers),
 *  - updates the page counter,
 *  - in browsers without scroll-driven animations (html.no-sda), drives the
 *    reveals, cover choreography, parallax, page curls and pinned pages from scroll position.
 * Does nothing visual when the reader prefers reduced motion.
 */
export function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sda = CSS.supports('animation-timeline: view()');
    const pinMq = matchMedia(PIN_QUERY);
    const fallback = !reduce && !sda;
    root.classList.toggle('no-sda', fallback);

    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    // Typewriter: arm bubbles (hide letters), reveal once their panel lands.
    const bubbles = reduce ? [] : all('[data-type]');
    bubbles.forEach((b) => b.classList.add('typer'));
    const type = (b: HTMLElement) => {
      if (!b.classList.contains('typer') || b.dataset.typed) return;
      b.dataset.typed = '1';
      later(() => b.classList.add('typed'), 350);
    };

    // Screen shake: jolt the surrounding section once when an SFX lands.
    const shaken = new WeakSet<Element>();
    const shake = (el: HTMLElement) => {
      if (reduce || shaken.has(el)) return;
      shaken.add(el);
      const target = el.closest('section');
      if (!target) return;
      later(() => {
        target.classList.add('shake');
        later(() => target.classList.remove('shake'), 400);
      }, 450);
    };

    // Inside a pinned page, scroll progress (not visibility) decides when a step appears.
    const pinnedStep = (el: Element) => pinMq.matches && el.closest('.pin-track') && el.closest('.step');

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          if (pinnedStep(el)) continue;
          if (fallback && el.matches(REVEAL)) el.classList.add('fx-on');
          if (el.hasAttribute('data-type')) type(el);
          if (el.hasAttribute('data-shake')) shake(el);
          io.unobserve(el);
        }
      },
      { threshold: 0.35 },
    );
    new Set([...(fallback ? all(REVEAL) : []), ...bubbles, ...all('[data-shake]')]).forEach((el) => io.observe(el));

    const cover = document.querySelector<HTMLElement>('.cover');
    const pars = fallback ? all('.par') : [];
    const turns = fallback ? all('.turn') : [];
    const tracks = all('.pin-track').map((track) => ({
      track,
      n: Number(track.style.getPropertyValue('--n')) || 1,
      steps: all('.step', track).map((step) => ({
        step,
        s: Number(step.dataset.s),
        kids: all(REVEAL, step),
        typers: all('[data-type]', step),
        shakers: all('[data-shake]', step),
      })),
    }));
    const counter = document.querySelector<HTMLElement>('[data-page-counter]');
    const pages = all('[data-page]');
    if (counter && pages.length) counter.hidden = false;
    let lastPage = '';

    const update = () => {
      const vh = innerHeight;

      if (fallback && cover) {
        const r = cover.getBoundingClientRect();
        cover.style.setProperty('--p', String(clamp(-r.top / (r.height - vh))));
      }
      for (const el of pars) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--par-y', `${90 - 180 * clamp((vh - r.top) / (vh + r.height))}px`);
      }
      for (const t of turns) {
        const r = t.getBoundingClientRect();
        t.style.setProperty('--t', String(clamp(((vh - r.top) / (vh + r.height) - 0.12) / 0.43)));
      }
      if (pinMq.matches) {
        for (const { track, n, steps } of tracks) {
          const r = track.getBoundingClientRect();
          const p = clamp(-r.top / (r.height - vh));
          for (const { step, s, kids, typers, shakers } of steps) {
            if (fallback) {
              const on = p > (s + 0.15) / n;
              step.classList.toggle('fx-on', on);
              kids.forEach((k) => k.classList.toggle('fx-on', on));
            }
            if (p >= (s + 0.7) / n) {
              typers.forEach(type);
              shakers.forEach(shake);
            }
          }
        }
      }
      if (counter) {
        let current = pages[0]?.dataset.page ?? '1';
        for (const pg of pages) if (pg.getBoundingClientRect().top <= vh * 0.5) current = pg.dataset.page!;
        const text = `PAGE ${current} / ${pages.length}`;
        if (text !== lastPage) counter.textContent = lastPage = text;
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    update();

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return null;
}
