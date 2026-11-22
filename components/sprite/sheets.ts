/**
 * Sprite sheet descriptions. A sheet is a grid of equal frames: one animation per row,
 * read left to right. Feet sit on the same baseline in every frame, so swapping
 * animations never makes the character jump.
 */

export type SpriteAnim = {
  /** Row of the sheet (0-based). */
  row: number;
  /** Frames in this row, read from column 0. */
  frames: number;
  /** Default playback speed. */
  fps: number;
  /** One-shot animations (attacks, jumps) play once; the rest loop. */
  loop: boolean;
};

export type SpriteSheet<A extends string = string> = {
  src: string;
  frameWidth: number;
  frameHeight: number;
  columns: number;
  rows: number;
  animations: Record<A, SpriteAnim>;
};

/**
 * "Ronin": the free sprite supplied for the demo, cleaned up by
 * scripts/slice-sprite.py (background keyed out, frame borders removed,
 * frames repacked into 150×266 cells).
 */
export const RONIN = {
  src: '/sprites/ronin.webp',
  frameWidth: 150,
  frameHeight: 266,
  columns: 6,
  rows: 4,
  animations: {
    idle: { row: 0, frames: 6, fps: 6, loop: true },
    walk: { row: 1, frames: 6, fps: 9, loop: true },
    slash: { row: 2, frames: 6, fps: 12, loop: false },
    jump: { row: 3, frames: 6, fps: 8, loop: false },
  },
} satisfies SpriteSheet<'idle' | 'walk' | 'slash' | 'jump'>;

export type RoninAnim = keyof typeof RONIN.animations;
