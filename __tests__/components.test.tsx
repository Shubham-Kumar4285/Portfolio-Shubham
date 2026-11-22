import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/manga/Hero';
import { Bubble, EditionText, Panel } from '@/components/manga/primitives';
import { ModeToggle } from '@/components/layout/ModeToggle';
import { fireEvent } from '@testing-library/react';
import { MissionCard } from '@/components/missions/MissionCards';
import { Finale } from '@/components/sections/Finale';
import { Awakening } from '@/components/sections/Awakening';
import { getProjects, getSkills, getSocial } from '@/lib/content';
import { ContactForm } from '@/components/sections/ContactForm';

describe('Hero', () => {
  it.each(['cover', 'think', 'strike', 'dash', 'end'] as const)('applies the %s pose class', (pose) => {
    const { container } = render(<Hero pose={pose} />);
    expect(container.firstChild).toHaveClass(`pose-${pose}`);
  });

  it('is decorative unless labelled', () => {
    const { container, rerender } = render(<Hero pose="cover" />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Hero pose="cover" label="The hero" />);
    expect(screen.getByRole('img', { name: 'The hero' })).toBeInTheDocument();
  });
});

describe('MissionCard', () => {
  it('links to the case file page', () => {
    const p = getProjects()[1];
    render(<MissionCard project={p} number="02" />);
    expect(screen.getByRole('link', { name: p.title })).toHaveAttribute('href', `/missions/${p.slug}`);
  });
});

describe('Awakening', () => {
  it('renders a meter per skill', () => {
    render(<Awakening />);
    const meters = screen.getAllByRole('meter');
    expect(meters).toHaveLength(getSkills().length);
    expect(meters[0]).toHaveAttribute('aria-valuenow', String(getSkills()[0].level));
  });
});

describe('Finale', () => {
  it('renders the contact form and social links', () => {
    render(<Finale />);
    // Both editions' labels are in the DOM; CSS shows one.
    const submit = screen.getByRole('button', { name: /START A MISSION/ });
    expect(submit).toHaveAttribute('type', 'submit');
    expect(submit).toHaveTextContent('SEND THE CONTRACT');
    expect(screen.getByLabelText('EMAIL')).toHaveAttribute('type', 'email');
    for (const s of getSocial()) {
      const link = screen.getByRole('link', { name: s.name.toUpperCase() });
      expect(link).toHaveAttribute('href', s.url);
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

describe('ContactForm', () => {
  const fill = () => {
    fireEvent.change(screen.getByLabelText('NAME'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByLabelText('EMAIL'), { target: { value: 'ada@example.com' } });
    fireEvent.change(screen.getByLabelText('MESSAGE'), { target: { value: 'Hello' } });
    fireEvent.submit(screen.getByRole('button').closest('form')!);
  };
  afterEach(() => jest.restoreAllMocks());

  it('posts to Formspree and confirms', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, status: 200 });
    global.fetch = fetchMock as unknown as typeof fetch;
    render(<ContactForm formId="abc123" submitLabel="SEND" />);
    fill();
    expect(await screen.findByText(/Message received/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('https://formspree.io/f/abc123', expect.objectContaining({ method: 'POST' }));
    expect(screen.getByLabelText('NAME')).toHaveValue('');
  });

  it('reports a failed submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 422 }) as unknown as typeof fetch;
    render(<ContactForm formId="abc123" submitLabel="SEND" />);
    fill();
    expect(await screen.findByText(/didn’t go through/i)).toBeInTheDocument();
    expect(screen.getByLabelText('NAME')).toHaveValue('Ada');
  });
});

describe('Bubble', () => {
  it('gives screen readers the whole line and splits letters for the typewriter', () => {
    const { container } = render(<Bubble>Hi there</Bubble>);
    expect(screen.getByText('Hi there')).toHaveClass('sr-only');
    expect(container.querySelectorAll('.ch')).toHaveLength('Hi there'.length);
    expect(container.firstChild).toHaveAttribute('data-type');
  });
});

describe('Panel steps', () => {
  it('marks pinned-page steps with their reading order', () => {
    const { container } = render(<Panel step={2}>x</Panel>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('step');
    expect(el).not.toHaveClass('in');
    expect(el.dataset.s).toBe('2');
    expect(el.style.getPropertyValue('--s')).toBe('2');
  });
});

describe('Case file story arc', () => {
  it('every project has an enemy and a victory', () => {
    for (const p of getProjects()) {
      expect(p.enemy.length).toBeGreaterThan(10);
      expect(p.victory.length).toBeGreaterThan(10);
    }
  });
});

describe('Night Edition', () => {
  it('EditionText renders both editions, tagged for CSS', () => {
    const { container } = render(<EditionText day="CRACK" night="SLASH" />);
    expect(container.querySelector('.ed-day')).toHaveTextContent('CRACK');
    expect(container.querySelector('.ed-night')).toHaveTextContent('SLASH');
  });

  it('EditionText collapses identical copy', () => {
    const { container } = render(<EditionText day="SAME" night="SAME" />);
    expect(container.querySelector('.ed-day')).toBeNull();
    expect(container).toHaveTextContent('SAME');
  });

  it('Bubble renders a night line alongside the day line', () => {
    const { container } = render(<Bubble night="Who’s next?">Your move.</Bubble>);
    expect(container.querySelector('.ed-day .sr-only')).toHaveTextContent('Your move.');
    expect(container.querySelector('.ed-night .sr-only')).toHaveTextContent('Who’s next?');
  });

  it('ModeToggle flips html.night, aria-pressed and the saved choice', () => {
    document.documentElement.classList.add('night');
    render(<ModeToggle />);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(btn);
    expect(document.documentElement).not.toHaveClass('night');
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    expect(localStorage.getItem('mode')).toBe('day');
    fireEvent.click(btn);
    expect(document.documentElement).toHaveClass('night');
    expect(localStorage.getItem('mode')).toBe('night');
  });

  it('ModeToggle plays the transition and flips the edition mid-way', () => {
    jest.useFakeTimers();
    document.documentElement.classList.add('night');
    const titles = { toNight: { word: '夜 SLASH', sub: 'NIGHT' }, toDay: { word: '夜明け DAWN', sub: 'DAY' } };
    const { container } = render(
      <main>
        <ModeToggle titles={titles} />
      </main>,
    );
    fireEvent.click(screen.getByRole('button'));
    const cine = container.querySelector('.cine')!;
    expect(cine).toHaveClass('go', 'd');
    expect(cine).toHaveTextContent('夜明け DAWN');
    expect(document.documentElement).toHaveClass('night'); // not yet
    jest.advanceTimersByTime(1000);
    expect(document.documentElement).not.toHaveClass('night');
    expect(container.querySelector('main')).toHaveClass('cine-shake');
    jest.advanceTimersByTime(1000);
    expect(cine).not.toHaveClass('go');
    expect(container.querySelector('main')).not.toHaveClass('cine-shake');
    jest.useRealTimers();
  });
});
