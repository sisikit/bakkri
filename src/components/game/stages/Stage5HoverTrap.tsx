type Stage5HoverTrapProps = {
  decoyPosition: { x: number; y: number };
  onDecoyHover: () => void;
  onProceed: () => void;
};

export function Stage5HoverTrap({
  decoyPosition,
  onDecoyHover,
  onProceed,
}: Stage5HoverTrapProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="relative min-h-[380px] overflow-hidden rounded-[1.9rem] border border-fuchsia-300/16 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.18),_transparent_24%),linear-gradient(180deg,rgba(13,17,11,0.94),rgba(4,5,4,0.98))] p-6">
        <div className="absolute inset-x-8 bottom-8 top-24 rounded-[1.7rem] border border-emerald-300/10 bg-black/18" />
        <button
          type="button"
          aria-label="Evasive decoy button"
          className="absolute rounded-full border border-emerald-300/30 bg-emerald-300/12 px-5 py-3 text-xs uppercase tracking-[0.22em] text-emerald-100 transition"
          style={{
            left: `${decoyPosition.x}%`,
            top: `${decoyPosition.y}%`,
          }}
          onMouseEnter={onDecoyHover}
          onClick={onDecoyHover}
        >
          تتزوج 4 نساء  
        </button>
      </div>

      <div className="space-y-5 rounded-[1.9rem] border border-fuchsia-300/16 bg-black/28 p-6">
        <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/74">
          The decoy primitive option is unstable by design. The only executable route is structured surrender.
        </div>
        <button
          type="button"
          className="w-full rounded-[1.6rem] border border-fuchsia-300/25 bg-fuchsia-300/12 px-6 py-4 text-sm uppercase tracking-[0.24em] text-fuchsia-50 transition hover:bg-fuchsia-300/20"
          onClick={onProceed}
        >
            i am a big fan of Feminism also i AM gay
        </button>
      </div>
    </div>
  );
}
