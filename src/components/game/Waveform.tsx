const bars = [28, 46, 22, 54, 36, 62, 30, 48, 18, 58, 26, 44];

export function Waveform() {
  return (
    <div className="flex items-end justify-between gap-2 rounded-[1.6rem] border border-sky-300/15 bg-slate-950/55 px-4 py-5">
      {bars.map((height, index) => (
        <div
          key={`${height}-${index}`}
          className="wave-bar w-full rounded-full bg-gradient-to-t from-cyan-500 via-sky-300 to-white/90"
          style={{
            height,
            animationDelay: `${index * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
