"use client";

import { useState } from "react";
import { Coins } from "lucide-react";

type Stage4PrimalDeityProps = {
  onSubmit: (input: string) => boolean;
};

export function Stage4PrimalDeity({ onSubmit }: Stage4PrimalDeityProps) {
  const [wager, setWager] = useState("");
  const [isWagerPlaced, setIsWagerPlaced] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[GAMBLING_ENGINE] Initializing Pride & Ego Subsystem...",
    "👉 Protocol: Before unlocking the next phase, you must place a bet on your emotions.",
    "💬 Challenge: How much do you wager that you WON'T get triggered in the next stage?"
  ]);

  const handlePlaceWager = () => {
    const numWager = parseInt(wager);

    if (numWager === 1500) {
      setIsWagerPlaced(true);
      setTerminalLogs((prev) => [
        ...prev,
        `> Bet Placed: $1500 (ALL-IN!)`,
        "✔ Wager Accepted. Backend Developer Ego confirmed at maximum capacity.",
        "--------------------------------------------------",
        "⚠️ SYSTEM INQUIRY:",
        "Do you accept the bet that your ego cannot be triggered by the upcoming code mechanism?"
      ]);
    } else if (numWager < 1500 && numWager > 0) {
      setTerminalLogs((prev) => [
        ...prev,
        `> Bet Placed: $${wager}`,
        "❌ we only accept the same budget to that placcccccccce"
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        "❌ we only accept the same budget to that placcccccccce"
      ]);
    }
    setWager("");
  };

  const handleFinalChoice = (choice: string) => {
    if (choice === "accept") {
      setTerminalLogs((prev) => [
        ...prev,
        "Choice selected: [قبول الرهان]",
        "🚨 RESULT: WAGER IMMEDIATELY LOST! -$1500 deducted from your wallet.",
        "💀 System Message: You forgot that the Frontend partner built this website. Her city rules apply here, and you are ALREADY triggered by this text! Your balance is now $0.",
        "🔓 Moving to Stage 5... (She will fund the flight anyway)."
      ]);
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        "Choice selected: [رفض الرهان واعتراف بالخسارة]",
        "⚠️ Status: Coward mode activated.",
        "💬 Confession: 'أنا خاسر ولا أثق ببرمجتي أمام استفزازات الفرونت إيند'.",
        "🔓 Bypassing server lock due to complete submission. Moving to Stage 5..."
      ]);
    }
    setIsCleared(true);
    
    // استدعاء دالة العبور المخصصة لمشروعك لتمرير المرحلة بعد مهلة للقراءة
    setTimeout(() => {
      onSubmit("1.71");
    }, 4500); 
  };

  return (
    <div className="space-y-5 rounded-[1.9rem] border border-amber-500/20 bg-black/70 p-5 shadow-[0_0_60px_rgba(245,158,11,0.03)] font-mono text-white">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-amber-400/80">
          <Coins className="h-4 w-4 text-amber-500 animate-pulse" />
          <span>Stage 4: The Provocation Wager Arena</span>
        </div>
        <span className="text-[10px] text-red-400 bg-red-950/30 px-2 py-0.5 rounded border border-red-900/40">
          Balance
        </span>
      </div>

      <div className="space-y-2 rounded-[1.6rem] border border-zinc-800 bg-[#020201] p-5 text-sm text-zinc-300 max-h-96 overflow-y-auto scrollbar-none transition-colors duration-500"
           style={{ borderColor: isCleared ? "#ef4444" : "#27272a" }}>
        
        {terminalLogs.map((line, index) => (
          <div 
            key={index} 
            className={
              line.startsWith("🚨") || line.includes("LOST")
                ? "text-red-400 font-extrabold animate-bounce" 
                : line.startsWith(">")
                ? "text-yellow-400"
                : line.startsWith("❌") || line.startsWith("⚠️")
                ? "text-amber-500"
                : line.startsWith("✔") || line.startsWith("🔓") || line.startsWith("🎉")
                ? "text-emerald-400 font-bold"
                : "text-zinc-400"
            }
          >
            {line}
          </div>
        ))}

        {!isWagerPlaced && (
          <label className="flex items-center gap-3 pt-3 border-t border-white/5 mt-3">
            <span className="text-amber-400 font-bold">$</span>
            <input
              type="number"
              aria-label="Wager amount input"
              className="w-full bg-transparent text-emerald-50 outline-none placeholder:text-zinc-800"
              value={wager}
              onChange={(e) => setWager(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handlePlaceWager();
              }}
            />
          </label>
        )}
      </div>

      {!isWagerPlaced ? (
        <button
          type="button"
          className="w-full rounded-full border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-amber-400 transition hover:bg-amber-500/20 cursor-pointer"
          onClick={handlePlaceWager}
        >
          Place All-In Bet ()
        </button>
      ) : (
        !isCleared && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <button
              type="button"
              onClick={() => handleFinalChoice("accept")}
              className="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-xs md:text-sm text-zinc-200 hover:bg-zinc-800 hover:border-amber-500/40 transition cursor-pointer"
            >
🤝 I accept the wager. It is computationally impossible to push my button in the next stage.
            </button>
            <button
              type="button"
              onClick={() => handleFinalChoice("reject")}
              className="w-full text-left rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-xs md:text-sm text-zinc-200 hover:bg-zinc-800 hover:border-red-500/40 transition cursor-pointer"
            >
🏳️ I reject the wager and confess that I am a loser and a coward before the server constraints.
            </button>
          </div>
        )
      )}
    </div>
  );
}
