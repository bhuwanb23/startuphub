/** Abstract ecosystem art variants generated from nodes & connections. */
export default function StartupArt({ variant, id }: { variant: number; id: string }) {
  const common = "absolute inset-0 h-full w-full";
  if (variant % 5 === 0)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.22" fill="none">
          <circle cx="240" cy="130" r="52" />
          <circle cx="240" cy="130" r="86" />
          <circle cx="240" cy="130" r="120" strokeDasharray="3 7" />
          <path d="M240 78v-38M292 130h56M240 182v40M188 130h-60M278 92l30-30M202 168l-30 30" />
        </g>
        <g fill="#3157E8">
          <circle cx="240" cy="130" r="6" />
          <circle cx="240" cy="40" r="4" opacity="0.7" />
          <circle cx="348" cy="130" r="4" opacity="0.7" />
          <circle cx="240" cy="222" r="4" opacity="0.7" />
          <circle cx="128" cy="130" r="4" opacity="0.7" />
          <circle cx="308" cy="62" r="3.5" opacity="0.5" />
          <circle cx="172" cy="198" r="3.5" opacity="0.5" />
        </g>
      </svg>
    );
  if (variant % 5 === 1)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.22" fill="none">
          <path d="M60 210 150 150l70 30 90-90 70 20" strokeWidth="1.6" />
          <path d="M60 210h340" strokeDasharray="2 6" />
        </g>
        <g fill="#3157E8">
          {[[60, 210], [150, 150], [220, 180], [310, 90], [380, 110]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 3 ? 6 : 4} opacity={i === 3 ? 1 : 0.65} />
          ))}
        </g>
      </svg>
    );
  if (variant % 5 === 2)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <path
          d="M40 130h70l24-44 32 88 26-64 20 20h228"
          fill="none" stroke="#3157E8" strokeOpacity="0.35" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="166" cy="174" r="5" fill="#3157E8" />
        <circle cx="212" cy="130" r="4" fill="#3157E8" opacity="0.6" />
      </svg>
    );
  if (variant % 5 === 3)
    return (
      <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
        <g stroke="#3157E8" strokeOpacity="0.25" fill="none">
          <path d="M240 60v140M240 90l-70 40M240 90l70 40M240 150l-46 34M240 150l46 34" strokeWidth="1.4" />
        </g>
        <g fill="#3157E8">
          <circle cx="240" cy="60" r="6" />
          {[[170, 130], [310, 130], [194, 184], [286, 184], [240, 200]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" opacity="0.6" />
          ))}
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 480 260" className={common} aria-hidden="true">
      <g stroke="#3157E8" strokeOpacity="0.25" fill="none">
        <ellipse cx="240" cy="130" rx="130" ry="52" />
        <ellipse cx="240" cy="130" rx="130" ry="52" transform="rotate(-28 240 130)" strokeDasharray="3 6" />
        <ellipse cx="240" cy="130" rx="130" ry="52" transform="rotate(28 240 130)" strokeDasharray="3 6" />
      </g>
      <circle cx="240" cy="130" r="7" fill="#3157E8" />
      <circle cx="132" cy="96" r="4.5" fill="#3157E8" opacity="0.7" />
      <circle cx="352" cy="168" r="4" fill="#3157E8" opacity="0.55" />
    </svg>
  );
}
