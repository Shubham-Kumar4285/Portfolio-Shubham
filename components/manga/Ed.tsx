import { edition } from '@/lib/content';
import type { EditionKey } from '@/lib/types';
import { EditionText } from './primitives';

/** Edition copy slot from data/portfolio.json → editions. */
export function Ed({ k }: { k: EditionKey }) {
  return <EditionText {...edition(k)} />;
}
