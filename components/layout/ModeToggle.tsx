'use client';

import { useEffect, useRef } from 'react';

const MODE_KEY = 'mode';
const THEME_COLOR = { night: '#0A0607', day: '#EDE6D6' };

/** Transition timeline (ms), matching the design file. */
const CINE = { flip: 1000, shakeEnd: 1400, end: 1950 };

type Title = { word: string; sub: string };

/** Apply an edition to the document and remember it. */
function applyMode(night: boolean) {
  const root = document.documentElement;
  root.classList.toggle('night', night);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? THEME_COLOR.night : THEME_COLOR.day);
  try {
    localStorage.setItem(MODE_KEY, night ? 'night' : 'day');
  } catch {
    /* storage blocked: the choice just isn't remembered */
  }
}

/**
 * DAY / NIGHT edition switch. The label is pure CSS (both are rendered, the
 * inactive one hidden), so only the click and aria-pressed need JS.
 * With `titles`, switching plays the cinematic transition (.cine in styles/cine.css)
 * and flips the edition mid-way; with reduced motion it switches instantly.
 */
export function ModeToggle({ titles }: { titles?: { toNight: Title; toDay: Title } }) {
  const ref = useRef<HTMLButtonElement>(null);
  const cine = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  // Sync with whatever the head script chose before hydration.
  useEffect(() => {
    const night = document.documentElement.classList.contains('night');
    ref.current?.setAttribute('aria-pressed', String(night));
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', night ? THEME_COLOR.night : THEME_COLOR.day);
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const flip = (night: boolean) => {
    applyMode(night);
    ref.current?.setAttribute('aria-pressed', String(night));
  };

  const toggle = () => {
    const night = !document.documentElement.classList.contains('night');
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const el = cine.current;
    if (!titles || !el || reduce) return flip(night);
    if (busy.current) return;
    busy.current = true;

    const title = night ? titles.toNight : titles.toDay;
    el.querySelector('.word')!.textContent = title.word;
    el.querySelector('.sub')!.textContent = title.sub;
    el.className = 'cine';
    void el.offsetWidth; // restart the animations
    el.className = `cine go ${night ? 'n' : 'd'}`;

    const main = document.querySelector('main');
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    at(CINE.flip, () => {
      flip(night);
      main?.classList.add('cine-shake');
    });
    at(CINE.shakeEnd, () => main?.classList.remove('cine-shake'));
    at(CINE.end, () => {
      el.className = 'cine';
      busy.current = false;
    });
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="modebtn min-[701px]:mr-auto max-[700px]:min-h-[38px] max-[700px]:px-2.5 max-[700px]:text-[11px]"
        aria-pressed="true"
        onClick={toggle}
      >
        {/* Stacked so the button keeps one width in both editions. */}
        <span className="ed-stack justify-items-center">
          <span className="ed-night">☀ DAY EDITION</span>
          <span className="ed-day">☾ NIGHT EDITION</span>
        </span>
      </button>
      {titles && (
        <div ref={cine} className="cine" aria-hidden="true">
          <div className="bar top" />
          <div className="bar bot" />
          <div className="orb" />
          <div className="flash" />
          <div className="cut" />
          <div className="word" />
          <div className="sub" />
        </div>
      )}
    </>
  );
}
