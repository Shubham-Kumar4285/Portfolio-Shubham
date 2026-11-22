import Link from 'next/link';
import { Ed } from '@/components/manga/Ed';
import { getEditions, getPersonal } from '@/lib/content';
import { ModeToggle } from './ModeToggle';

const NAV = [
  { href: '/#ch1', label: '01 ORIGIN' },
  { href: '/#ch2', label: '02 AWAKENING' },
  { href: '/#ch3', label: '03 MISSIONS' },
];

/**
 * Desktop: logo | chapter links + HIRE ME on one row.
 * Phones: logo + edition toggle + HIRE ME on row one, chapter links spread across row two.
 */
export function SiteHeader() {
  const { shortName } = getPersonal();
  const { day, night } = getEditions();
  // Only the transition titles go to the client component, not the whole data file.
  const titles = { toNight: { word: night.cineWord, sub: night.cineSub }, toDay: { word: day.cineWord, sub: day.cineSub } };

  return (
    <header className="sticky top-0 z-30 box-border flex min-h-[var(--header-h)] flex-wrap items-center gap-x-4 gap-y-1 border-b-4 border-line bg-paper px-[4vw] py-3 font-mono text-[13px] font-bold">
      <Link href="/#cover" className="mr-auto flex items-center gap-2.5 font-normal text-fg no-underline">
        <span aria-hidden="true" className="inline-block -rotate-[4deg] bg-ink px-2.5 py-1 font-display text-[22px] text-fg-inv">
          {shortName[0]}
        </span>
        <span className="tracking-[.15em] max-[700px]:hidden">
          {shortName.toUpperCase()} /{' '}
          <span className="ed-stack">
            <Ed k="vol" />
          </span>
        </span>
      </Link>
      <ModeToggle titles={titles} />
      <nav
        aria-label="Chapters"
        className="site-nav order-last flex w-full justify-between gap-1 min-[701px]:order-none min-[701px]:w-auto"
      >
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="p-3 no-underline">
            {n.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/#ch4"
        className="border-[3px] border-line bg-accent px-[18px] py-3 text-white no-underline shadow-[4px_4px_0_var(--color-shadow)] hover:text-white max-[700px]:px-3 max-[700px]:py-2 max-[700px]:text-[11px]"
      >
        HIRE ME →
      </Link>
    </header>
  );
}
