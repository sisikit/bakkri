"use client";

import { useState } from "react";
import { ShieldAlert, Terminal, Swords } from "lucide-react";

type Stage1JeanChallengeProps = {
  onSuccess: () => void;
};

export function Stage1JeanChallenge({ onSuccess }: Stage1JeanChallengeProps) {
  const [inputValue, setInputValue] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [askDilemma, setAskDilemma] = useState(false);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "❌ FATAL_ERROR: Server connection hung at 49%. An anonymous corporate process is blocking the route.",
    "👉 Task: Run the system analyzer to fetch the specifications of this unresponsive background entity."
  ]);

  const handleAnalyzeProcess = () => {
    setShowAnalysis(true);
    setTerminalLogs((prev) => [
      ...prev,
      "$ inspecting PID_0000_AL_NIFAQ...",
      "--------------------------------------------------",
      "• Process Visual Profile: Looks like a 'Cute Boy' on the front-end.",
      "• Documented Brain Specs: IQ = 200 (Note: Certified on papers ONLY).",
      "• Runtime Code Contribution: 0 lines written.",
      "• Favorite System Loop Exception: Caught yelling 'حطني بالصورة' every 5 minutes.",
      "--------------------------------------------------",
      "⚠️ SYSTEM DILEMMA DETECTED: This process is trying to micromanage your overland map.",
      "👉 CRITICAL QUESTION: Will you KISS or KILL this anonymous process? Type your final judgment below:"
    ]);
    setAskDilemma(true);
  };

  const handleProcessJudgment = () => {
    const cleanInput = inputValue.trim().toLowerCase();

    // الخيار الصحيح الصارم لمبرمج الباكند البدائي: قتل العملية وكشف حقيقة "حطني بالصورة"
    const expectedKillCommand = "kill  النقاق  ";

    if (cleanInput === "kiss" || cleanInput === "تقبيل") {
      setTerminalLogs((prev) => [
        ...prev,
        `> ${inputValue}`,
        "GAY"
      ]);
    } 
    else if (cleanInput === "kill" || cleanInput === "قتل") {
      setTerminalLogs((prev) => [
        ...prev,
        `> ${inputValue}`,
        "❌ GAY ..... i mean Im joking :)",
        "💡 Hint: You must kill his nickname after the kill command ",
      ]);
    } 
    else if (cleanInput === expectedKillCommand || cleanInput === "kill النقاق") {
      setIsCleared(true);
      setAskDilemma(false);
      setTerminalLogs((prev) => [
        ...prev,
        `> ${inputValue}`,
        "Sending SIGKILL to fake Team Leader authority...",
        "✔ Process 'النفاق' successfully purged from the server pipeline.",
        "✔ 'حطني بالصورة' loop completely terminated.",
        "🔓 Target Acquired: Moving to Stage 2..."
      ]);

      // نقله للمرحلة الثانية بعد ثانيتين ونصف من نجاح القتل والتطهير
      setTimeout(() => {
        onSuccess();
      }, 2500);
    } 
    else {
      setTerminalLogs((prev) => [
        ...prev,
        `> ${inputValue}`,
        "❌ Command Execution Error: Invalid judgment parameter.",
      ]);
    }
    setInputValue("");
  };

  return (
    <div className="space-y-5 rounded-[1.9rem] border border-red-500/20 bg-black/70 p-5 shadow-[0_0_60px_rgba(239,68,68,0.04)] font-mono text-white">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-red-400/80">
          <ShieldAlert className="h-4 w-4 text-red-500 animate-pulse" />
          <span>Stage 1: The 200-IQ Illusion Purge</span>
        </div>
        <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
          Process: Anonymous
        </span>
      </div>

      <div 
        className="space-y-2 rounded-[1.6rem] border border-zinc-800 bg-[#010101] p-5 text-sm text-zinc-300 max-h-96 overflow-y-auto scrollbar-none transition-colors duration-500"
        style={{ backgroundColor: isCleared ? "#010301" : "#010101", borderColor: isCleared ? "#10b981" : "#27272a" }}
      >
        {terminalLogs.map((line, index) => (
          <div 
            key={index} 
            className={
              line.includes("✔") || line.includes("🔓")
                ? "text-emerald-400 font-bold" 
                : line.startsWith(">")
                ? "text-yellow-400"
                : line.startsWith("❌") || line.startsWith("⚠️")
                ? "text-red-400"
                : line.includes("Cute Boy") || line.includes("حطني بالصورة")
                ? "text-cyan-400 font-semibold"
                : "text-zinc-400"
            }
          >
            {line}
          </div>
        ))}

        {askDilemma && !isCleared && (
          <label className="flex items-center gap-3 pt-3 border-t border-white/5 mt-3 animate-fade-in">
            <span className="text-red-400 font-bold">&gt;</span>
            <input
              aria-label="Terminal decision input"
              className="w-full bg-transparent text-emerald-50 outline-none placeholder:text-zinc-800"
              placeholder="Kiss or     Kill?" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleProcessJudgment();
              }}
            />
          </label>
        )}
      </div>

      {!showAnalysis && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-red-400 transition hover:bg-red-500/20 cursor-pointer"
          onClick={handleAnalyzeProcess}
        >
          <Terminal className="h-3 w-3" /> Run Process Analyzer
        </button>
      )}

      {askDilemma && !isCleared && (
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-400 transition hover:bg-emerald-500/20 cursor-pointer"
          onClick={handleProcessJudgment}
        >
          <Swords className="h-3 w-3" /> Execute Terminal Judgment
        </button>
      )}
    </div>
  );
}
