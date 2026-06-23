type SystemLogProps = {
  logs: string[];
};

export function SystemLog({ logs }: SystemLogProps) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.32em] text-white/45">
        <span>System Log</span>
        <span>{logs.length.toString().padStart(2, "0")} entries</span>
      </div>
      <div className="space-y-2 font-mono text-xs leading-6 text-emerald-100/90">
        {logs.map((log, index) => (
          <div
            key={`${log}-${index}`}
            className="rounded-xl border border-white/6 bg-white/4 px-3 py-2"
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
