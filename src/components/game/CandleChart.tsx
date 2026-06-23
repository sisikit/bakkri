const candles = [
  { height: 42, tone: "bull" },
  { height: 68, tone: "bear" },
  { height: 54, tone: "bull" },
  { height: 88, tone: "bull" },
  { height: 36, tone: "bear" },
  { height: 72, tone: "bull" },
  { height: 44, tone: "bear" },
  { height: 62, tone: "bull" },
  { height: 78, tone: "bear" },
  { height: 56, tone: "bull" },
];

export function CandleChart() {
  return (
    <div className="flex h-44 items-end gap-3 overflow-hidden rounded-[1.6rem] border border-emerald-300/15 bg-[#081109]/70 px-4 py-5">
      {candles.map((candle, index) => {
        const isBull = candle.tone === "bull";

        return (
          <div key={`${candle.height}-${index}`} className="flex flex-1 justify-center">
            <div className="relative flex w-6 items-end justify-center">
              <div
                className={[
                  "absolute left-1/2 w-px -translate-x-1/2 animate-pulse",
                  isBull ? "bg-emerald-300/80" : "bg-rose-300/80",
                ].join(" ")}
                style={{ height: candle.height + 24 }}
              />
              <div
                className={[
                  "relative z-10 w-full rounded-sm border shadow-[0_0_22px_rgba(16,185,129,0.18)]",
                  isBull
                    ? "border-emerald-300/60 bg-emerald-300/35"
                    : "border-rose-300/60 bg-rose-300/35",
                ].join(" ")}
                style={{ height: candle.height }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
