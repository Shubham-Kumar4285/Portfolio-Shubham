/**
 * Shared SVG paint servers, rendered once in the root layout.
 * Not `display:none` — some browsers drop patterns defined in hidden SVGs.
 */
export function SvgDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" focusable="false" className="pointer-events-none absolute">
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#111" strokeWidth="1.6" />
        </pattern>
        <pattern id="hatchw" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#EDE6D6" strokeWidth="1.2" opacity=".55" />
        </pattern>
      </defs>
    </svg>
  );
}
