"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Stage0TerminalProps = {
  onBypass: () => void;
};

export function Stage0Terminal({ onBypass }: Stage0TerminalProps) {
  const [value, setValue] = useState("");
  const [isLoadingLoop, setIsLoadingLoop] = useState(false);
  
  // نستخدم useRef لتتبع حالة التعليق داخل الـ Event Listener الخاص بالكيبورد بدقة
  const isLoadingLoopRef = useRef(false);

  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "$ initializing primitive_route_engine...",
    "$ verifying backend_developer_ego checksum... PASSED",
    "$ Run database migration using the initial count number of our shared attributes after the command"

  ]);

  const terminateAndAdvance = useCallback(() => {
    setTerminalLogs((prev) => [
      ...prev,
      "^C",
      "💀 Process terminated by user via SIGINT.",
      "✔ Unresponsive database constraints bypassed successfully.",
      "✔ Overlanding Map unlocked. Redirecting to Mt. Barzah...",
    ]);

    isLoadingLoopRef.current = false;
    setIsLoadingLoop(false);

    setTimeout(() => {
      onBypass();
    }, 700);
  }, [onBypass]);

  // الاستماع لضغط أزرار الكيبورد الحقيقية (Ctrl + C)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // نتحقق أولاً أن السيرفر معلق وأن المستخدم ضغط Ctrl + C (أو Cmd + C لأجهزة الماك)
      if (isLoadingLoopRef.current && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") {
        e.preventDefault(); // منع المتصفح من فتح نافذة النسخ الافتراضية
        
        terminateAndAdvance();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [terminateAndAdvance]);

  const handleExecute = () => {
    const cleanCmd = value.trim().toLowerCase();

    if (cleanCmd === "php artisan migrate 70" || cleanCmd === "php migrate 70") {
      setTerminalLogs((prev) => [
        ...prev,
        `> ${value}`,
        "Migrating: 2026_06_23_create_shared_memories_table",
        "Loading: [=================>                  ] 49% - Database connection hung...",
        "⚠️ Error: Pipeline is stuck in an infinite pending state."
      ]);
      
      // تفعيل حالة التعليق وإجبار الكيبورد على التدخل
      isLoadingLoopRef.current = true;
      setIsLoadingLoop(true); 
    } else {
      setTerminalLogs((prev) => [
        ...prev,
        `> ${value}`,
        "❌ Error: its just a number after the migrate word 😭😭."
      ]);
    }
    setValue("");
  };

  return (
    <div className="space-y-5 rounded-[1.9rem] border border-emerald-300/20 bg-black/70 p-5 shadow-[0_0_60px_rgba(34,197,94,0.08)] font-mono">
      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-emerald-200/55">
        <span className="h-3 w-3 rounded-full bg-rose-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-300/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
        <span className="ml-3">Secure Shell / Command Line</span>
      </div>

      <div className="space-y-2 rounded-[1.6rem] border border-emerald-300/10 bg-[#010201] p-5 text-sm text-emerald-100/92 max-h-80 overflow-y-auto scrollbar-none">
        {terminalLogs.map((line, index) => (
          <div 
            key={index} 
            className={
              line.startsWith("❌") || line.startsWith("⚠️")
                ? "text-red-400" 
                : line.startsWith("✔") || line.startsWith("💀")
                ? "text-cyan-400 font-bold" 
                : line.startsWith("^C")
                ? "text-yellow-400 font-extrabold"
                : "text-emerald-100/92"
            }
          >
            {line}
          </div>
        ))}

        {/* حقل الإدخال يختفي عندما يعلق السيرفر ليضطر لاستخدام اختصار الكيبورد الحقيقي */}
        {!isLoadingLoop && (
          <label className="flex items-center gap-3 pt-3">
            <span className="text-emerald-300/85">&gt;</span>
            <input
              aria-label="Terminal command"
              className="w-full bg-transparent text-emerald-50 outline-none placeholder:text-emerald-200/10"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleExecute();
                }
              }}
            />
          </label>
        )}
      </div>

      {/* عرض أزرار التحكم أو رسالة التنبيه بناءً على حالة السيرفر المعلق */}
      {!isLoadingLoop ? (
        <button
          type="button"
          className="w-full rounded-full border border-emerald-300/25 bg-emerald-300/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-emerald-50 transition hover:bg-emerald-300/18 cursor-pointer"
          onClick={handleExecute}
        >
          Execute Command
        </button>
      ) : (
        <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl text-center space-y-1 animate-pulse">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest">
            🚨 QOOOONNLY OONNCCEE !
          </p>
          <p className="text-xs text-zinc-400">
            The process is completely frozen. Press{" "}
            <button
              type="button"
              className="inline-flex"
              onClick={terminateAndAdvance}
            >
              <kbd className="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-white text-[10px] font-bold mx-1">
                Ctrl + C
              </kbd>
            </button>{" "}
            on your physical keyboard (or click it here) to force kill.
          </p>
        </div>
      )}
    </div>
  );
}
