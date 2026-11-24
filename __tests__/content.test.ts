import {
  getContact,
  getEditions,
  getExperience,
  getPersonal,
  getAdjacentProjects,
  getProject,
  getProjects,
  getSkills,
  missionNumber,
} from '@/lib/content';

describe('content loader', () => {
  it('has unique, URL-safe project slugs', () => {
    const slugs = getProjects().map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it('gives every project the fields the pages render', () => {
    for (const p of getProjects()) {
      expect(p.title && p.short && p.summary && p.description && p.repo).toBeTruthy();
      expect(p.image).toMatch(/^\//);
      expect(['S', 'A', 'B', 'C']).toContain(p.rank);
    }
  });

  it('finds projects by slug', () => {
    const first = getProjects()[0];
    expect(getProject(first.slug)).toBe(first);
    expect(getProject('does-not-exist')).toBeUndefined();
  });

  it('numbers missions from 01', () => {
    expect(missionNumber(getProjects()[0].slug)).toBe('01');
  });

  it('links adjacent missions', () => {
    const list = getProjects();
    expect(getAdjacentProjects(list[0].slug)).toEqual({ prev: undefined, next: list[1] });
    expect(getAdjacentProjects(list[list.length - 1].slug).next).toBeUndefined();
    expect(getAdjacentProjects('nope')).toEqual({});
  });

  it('has 8 featured skills with levels 0–100', () => {
    const skills = getSkills();
    expect(skills).toHaveLength(8);
    skills.forEach((s) => expect(s.level).toBeGreaterThanOrEqual(0));
    skills.forEach((s) => expect(s.level).toBeLessThanOrEqual(100));
  });

  it('has a Formspree form ID for the contact form', () => {
    expect(getContact().formspreeId).toMatch(/^[a-z0-9]+$/i);
  });

  it('defines every edition copy slot for both Day and Night', () => {
    const { day, night } = getEditions();
    expect(Object.keys(night).sort()).toEqual(Object.keys(day).sort());
    for (const k of Object.keys(day) as (keyof typeof day)[]) {
      expect(day[k]).toBeTruthy();
      expect(night[k]).toBeTruthy();
    }
  });

  it('gives every experience entry the fields the chapter renders', () => {
    for (const job of getExperience()) {
      expect(job.role && job.company && job.period && job.summary).toBeTruthy();
      expect(Array.isArray(job.highlights) && Array.isArray(job.tags)).toBe(true);
    }
  });

  it('points the resume at a PDF in /public, or leaves it empty', () => {
    const { resume } = getPersonal();
    if (resume) expect(resume).toMatch(/^\/.+\.pdf$/i);
  });
});
