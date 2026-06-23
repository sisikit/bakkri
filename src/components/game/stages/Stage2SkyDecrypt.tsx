"use client";
// using native <img> instead of next/image
import { useState } from "react";

import { Waveform } from "@/src/components/game/Waveform";

type Stage2SkyDecryptProps = {
  isHintVisible: boolean;
  isAudioRewardActive: boolean;
  onSubmit: (input: string) => boolean;
  onToggleHint: () => void;
};

export function Stage2SkyDecrypt({
  isHintVisible,
  isAudioRewardActive,
  onSubmit,
  onToggleHint,
}: Stage2SkyDecryptProps) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    const isSolved = onSubmit(value);

    if (!isSolved) {
      return;
    }

    const rewardAudio = new Audio("/song/song.m4a");
    rewardAudio.volume = 0.9;
    window.setTimeout(() => {
      rewardAudio.pause();
      rewardAudio.currentTime = 0;
    }, 30_000);
    void rewardAudio.play().catch(() => {
      // Ignore autoplay failures quietly if the browser blocks playback.
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-5 rounded-[1.9rem] border border-sky-300/15 bg-slate-950/55 p-5">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,15,38,0.95),rgba(4,8,17,0.95))] p-6">
          <div className="absolute right-8 top-6 h-24 w-24 rounded-full bg-white/75 blur-xl" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08))]" />
          <div className="night-stars absolute inset-0 opacity-80" />
          <div className="relative space-y-3 text-sm text-sky-50/88">
            <p className="text-sky-100/72">
              Input the fourth word exactly to stabilize the ghost highway.
            </p>
          </div>
        </div>
        <Waveform />
        <img
          alt="Ghost dog radar visual"
          className="ml-16 h-48 w-48 object-contain"
          height={192}
          src="/ghost.png"
          width={192}
        />

      </div>

      <div className="space-y-5 rounded-[1.9rem] border border-sky-300/15 bg-slate-950/55 p-5">
        <input
          aria-label="Sky decryption input"
          className="w-full rounded-full border border-sky-300/18 bg-sky-100/5 px-5 py-4 text-sm text-sky-50 outline-none placeholder:text-sky-100/35"
          placeholder="Type the exact word"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          type="button"
          className="w-full rounded-full border border-sky-300/25 bg-sky-300/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-sky-50 transition hover:bg-sky-300/18"
          onClick={handleSubmit}
        >
          Trigger Radar
        </button>
        <button
          type="button"
          className="w-full rounded-full border border-rose-300/22 bg-rose-300/10 px-5 py-3 text-xs uppercase tracking-[0.3em] text-rose-50 transition hover:bg-rose-300/18"
          onClick={onToggleHint}
        >
          {isHintVisible ? "Hide Hint" : "Show Hint"}
        </button>

        <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5 text-sm text-white/72">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/45">
            Reward State
          </p>
          <p className="mt-3 leading-7">
            {isAudioRewardActive
              ? "Playback simulation active: Dancing With Your Ghost / storm layer synchronized."
              : "Audio reward still locked behind the correct lyric token."}
          </p>
        </div>
      </div>
    </div>
  );
}
