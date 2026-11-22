import { SpriteActor } from '@/components/sprite/SpriteActor';
import type { RoninAnim } from '@/components/sprite/sheets';

export type Pose = 'cover' | 'think' | 'strike' | 'dash' | 'end';

/** Which sprite animation each panel pose plays. */
const ANIM: Record<Pose, RoninAnim> = { cover: 'idle', think: 'idle', strike: 'slash', dash: 'walk', end: 'idle' };

interface HeroProps {
  pose: Pose;
  /** Give the cover instance a label; repeat instances stay decorative. */
  label?: string;
}

/**
 * The companion: the pixel-art ronin from public/sprites/ronin.webp
 * (see components/sprite). Embers follow the edition: violet by day, red at night.
 */
export function Hero({ pose, label }: HeroProps) {
  return <SpriteActor base={ANIM[pose]} label={label} className="h-full w-full" />;
}
