// The accent parts (scarf, glint, aura) follow the edition; the rest keeps its ink.
const ACCENT = 'var(--color-accent)';
const accentFill = { fill: ACCENT };

export type Pose = 'cover' | 'think' | 'strike' | 'dash' | 'end';

interface HeroProps {
  pose: Pose;
  /** Give the cover instance a label; repeat instances stay decorative. */
  label?: string;
}

/**
 * The original manga companion: a hooded developer with a scarf and a glowing blade.
 * Poses are pure CSS (`.pose-*` in manga.css). Hatch patterns come from <SvgDefs/>.
 */
export function Hero({ pose, label }: HeroProps) {
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return (
    <div className={`hero pose-${pose} flex h-full w-full items-end justify-center`}>
      <svg viewBox="-40 0 380 420" className="block h-full w-full overflow-visible" {...a11y}>
        <g className="c-ink" fill="#111">
          <circle cx="150" cy="240" r="150" />
          <circle cx="30" cy="110" r="22" />
          <circle cx="285" cy="330" r="16" />
          <circle cx="300" cy="140" r="9" />
        </g>
        <ellipse cx="150" cy="410" rx="110" ry="12" fill="url(#hatch)" />
        <g fill="#111">
          <circle cx="40" cy="380" r="9" />
          <circle cx="58" cy="396" r="4" />
          <circle cx="262" cy="372" r="7" />
          <circle cx="280" cy="390" r="3" />
          <path d="M10 405 Q30 395 60 404 Q40 412 10 405 Z" />
        </g>
        <g className="c-trail">
          <path d="M-160 210 H90 M-200 250 H80 M-140 290 H70 M-180 330 H90" stroke="#111" strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className="c-body">
          <path d="M112 300 L92 405 L122 405 L145 320 L168 320 L182 405 L212 405 L192 300 Z" fill="#111" />
          <rect x="86" y="398" width="42" height="12" fill="#111" />
          <rect x="176" y="398" width="42" height="12" fill="#111" />
          <path d="M95 175 Q150 150 205 175 L215 310 Q150 325 88 310 Z" fill="#111" />
          <path d="M150 175 Q160 230 150 300 L215 310 L205 175 Z" fill="url(#hatchw)" />
          <path
            d="M110 200 Q118 230 112 262 M128 196 Q134 220 130 250 M175 205 Q170 240 178 280"
            stroke="#EDE6D6"
            strokeWidth="1.5"
            fill="none"
            opacity=".6"
          />
          <rect x="88" y="285" width="128" height="16" fill="#EDE6D6" stroke="#111" strokeWidth="3" />
          <text x="152" y="298" fontFamily="Space Mono, monospace" fontSize="11" fontWeight="700" textAnchor="middle" fill="#111">
            &lt;/&gt;
          </text>
          <path d="M98 182 L70 260 L88 268 L112 200 Z" fill="#111" />
          <circle cx="78" cy="268" r="11" fill="#EDE6D6" stroke="#111" strokeWidth="3" />
          <g className="c-scarf" style={accentFill} stroke="#111" strokeWidth="3">
            <path d="M110 168 Q150 182 192 168 L196 186 Q150 200 106 186 Z" />
            <path d="M112 180 Q70 190 30 168 Q60 200 22 214 Q80 214 118 192 Z" />
          </g>
          <path d="M118 150 L118 166 L182 166 L182 150 Z" fill="#EDE6D6" stroke="#111" strokeWidth="3" />
          <ellipse cx="150" cy="110" rx="44" ry="50" fill="#EDE6D6" stroke="#111" strokeWidth="4" />
          <path d="M150 62 Q196 70 194 112 Q192 150 160 160 Q176 120 150 62 Z" fill="url(#hatch)" />
          <path
            d="M104 112 L88 92 L100 88 L96 70 L116 82 L112 46 L136 68 L146 30 L160 64 L180 38 L182 74 L204 60 L214 70 L200 84 L212 92 L196 100 L208 112 Q186 78 150 80 Q118 80 104 112 Z"
            fill="#111"
          />
          <rect x="106" y="86" width="88" height="11" fill="#fff" stroke="#111" strokeWidth="3" />
          <path d="M106 90 L76 78 L84 96 L106 96" fill="#fff" stroke="#111" strokeWidth="3" />
          <g className="c-eyes" stroke="#111" strokeWidth="6" strokeLinecap="round">
            <path d="M124 116 L142 112" />
            <path d="M160 112 L178 116" />
          </g>
          <path d="M136 134 L130 142" stroke="#111" strokeWidth="1.5" />
          <path d="M168 128 L176 132 M170 133 L178 137" stroke="#111" strokeWidth="1.5" />
          <path d="M138 141 Q152 146 166 135" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
          <g className="c-arm">
            <path d="M196 178 L250 250 L236 262 L186 196 Z" fill="#111" />
            <circle cx="246" cy="258" r="12" fill="#EDE6D6" stroke="#111" strokeWidth="3" />
            <g transform="rotate(-50 246 254)">
              <rect x="232" y="250" width="30" height="8" fill="#111" />
              <rect x="240" y="262" width="12" height="34" fill="#111" />
              <path d="M241 248 L251 248 L254 80 L246 52 L238 80 Z" fill="#fff" stroke="#111" strokeWidth="4" />
              <path className="c-glint" d="M246 70 L246 240" style={{ stroke: ACCENT }} strokeWidth="3" />
              <g className="c-aura">
                <path d="M232 60 Q246 30 260 60 L262 245 L230 245 Z" style={accentFill} opacity=".35" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
