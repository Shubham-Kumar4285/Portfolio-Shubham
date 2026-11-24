export type Rank = 'S' | 'A' | 'B' | 'C';

export interface Site {
  url: string;
  volume: string;
}

export interface Personal {
  name: string;
  shortName: string;
  title: string;
  description: string;
  location: string;
  /** Leave empty to hide the EXP line. */
  yearsExp: string;
  /** Leave empty to point the contact button at the first social link. */
  email: string;
  /** Path to a PDF in /public (e.g. "/resume.pdf"). Leave empty to hide the RESUME buttons. */
  resume: string;
}

export interface Origin {
  caption: string;
  intro: string;
  originMoment: string;
  offDuty: string;
}

export interface Skill {
  name: string;
  tag: string;
  /** Proficiency, 0–100. */
  level: number;
}

export interface Project {
  slug: string;
  title: string;
  rank: Rank;
  short: string;
  summary: string;
  description: string;
  /** Story arc: the problem, framed as the enemy. */
  enemy: string;
  /** Story arc: what shipped. */
  victory: string;
  tags: string[];
  image: string;
  repo: string;
  live?: string;
}

export interface Experience {
  role: string;
  company: string;
  /** Free text, e.g. "Jun 2024 – Present". */
  period: string;
  location?: string;
  /** Optional company site. */
  url?: string;
  summary: string;
  /** What you did / shipped, one line each. */
  highlights: string[];
  tags: string[];
}

export interface Social {
  name: string;
  url: string;
}

/** Copy that changes between the Day and Night editions. */
export interface EditionCopy {
  /** Header volume label, after the name. */
  vol: string;
  cover: string;
  /** Speech bubbles: cover, Origin, Awakening, Missions, Finale. */
  b0: string;
  b1: string;
  b2: string;
  b3: string;
  b4: string;
  /** Cover burst SFX. */
  sfx: string;
  /** Cover tagline. */
  tag: string;
  /** Awakening headline panel. */
  ch2: string;
  /** Finale title, subtitle and button. */
  end: string;
  endsub: string;
  cta: string;
  /** Toggle transition title + subtitle, shown when switching INTO this edition. */
  cineWord: string;
  cineSub: string;
}

export type EditionKey = keyof EditionCopy;

export interface Contact {
  /** Formspree form ID (https://formspree.io/f/<id>). */
  formspreeId: string;
}

export interface Portfolio {
  site: Site;
  personal: Personal;
  origin: Origin;
  skills: Skill[];
  /** Newest first. Leave empty to hide the Experience chapter. */
  experience: Experience[];
  projects: Project[];
  social: Social[];
  contact: Contact;
  editions: { day: EditionCopy; night: EditionCopy };
}
