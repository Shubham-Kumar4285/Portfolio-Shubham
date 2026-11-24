import data from '@/data/portfolio.json';
import type { EditionKey, Portfolio, Project } from './types';

const portfolio = data as Portfolio;

export const getSite = () => portfolio.site;
export const getPersonal = () => portfolio.personal;
export const getOrigin = () => portfolio.origin;
export const getSkills = () => portfolio.skills;
export const getExperience = () => portfolio.experience;
/** 1 when the Experience chapter is shown: Missions and later chapters move down a page. */
export const chapterShift = () => (portfolio.experience.length ? 1 : 0);
export const getProjects = () => portfolio.projects;
export const getSocial = () => portfolio.social;
export const getEditions = () => portfolio.editions;
export const getContact = () => portfolio.contact;

/** Both editions' text for one copy slot. */
export function edition(k: EditionKey): { day: string; night: string } {
  return { day: portfolio.editions.day[k], night: portfolio.editions.night[k] };
}

export function getProject(slug: string): Project | undefined {
  return portfolio.projects.find((p) => p.slug === slug);
}

/** 1-based mission number, e.g. "01". */
export function missionNumber(slug: string): string {
  const i = portfolio.projects.findIndex((p) => p.slug === slug);
  return String(i + 1).padStart(2, '0');
}

export function getAdjacentProjects(slug: string): { prev?: Project; next?: Project } {
  const list = portfolio.projects;
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return {};
  return { prev: list[i - 1], next: list[i + 1] };
}
