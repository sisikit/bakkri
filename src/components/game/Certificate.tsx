import { FINALE_MESSAGE } from "@/src/utils/stage-data";

export function Certificate() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-amber-200/25 bg-[radial-gradient(circle_at_top,_rgba(253,230,138,0.25),_rgba(16,12,5,0.94)_46%,_rgba(5,4,2,0.98)_100%)] p-7 shadow-[0_0_70px_rgba(251,191,36,0.18)]">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,transparent,rgba(253,224,71,0.08),transparent)]" />
      <div className="relative space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-amber-100/70">
            {FINALE_MESSAGE.subtitle}
          </p>
          <h3 className="text-3xl font-semibold text-amber-50">
            {FINALE_MESSAGE.title}
          </h3>
        </div>

        <div className="rounded-[1.5rem] border border-amber-100/15 bg-black/25 p-5 text-sm leading-7 text-amber-50/88">
          {FINALE_MESSAGE.body}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.28em] text-amber-100/60">
          <span>&quot;Transaction Approved: Driver Wallet: $0 / Passenger Wallet: $1500&quot;</span>
          <span>Lifecycle: return removed</span>
        </div>

        <p className="text-center text-xs tracking-[0.24em] text-amber-100/55">
          {FINALE_MESSAGE.footer}
        </p>
      </div>
    </section>
  );
}
