import Image from "next/image";
import { Skull } from "lucide-react";
import type { ReactNode } from "react";

import { StageProgress } from "@/src/components/game/StageProgress";
import { TreasureMap } from "@/src/components/game/TreasureMap";
import type { StageConfig, StageId } from "@/src/utils/stage-data";

type StageShellProps = {
  children: ReactNode;
  completedStages: StageId[];
  currentStage: StageId;
  isStage2HintVisible: boolean;
  stage: StageConfig;
};

export function StageShell({
  children,
  completedStages,
  currentStage,
  isStage2HintVisible,
  stage,
}: StageShellProps) {
  const isFinalStage = stage.stage === 6;

  return (
    <div className="relative overflow-hidden rounded-[2.4rem] border border-[#6d4220] bg-[linear-gradient(180deg,rgba(244,220,181,0.95)_0%,rgba(219,181,131,0.96)_100%)] p-4 shadow-[0_28px_120px_rgba(0,0,0,0.48)] lg:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,248,226,0.55),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_18%,transparent_70%,rgba(90,51,25,0.08))]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(rgba(93,54,27,0.4)_0.8px,transparent_0.8px)] [background-size:12px_12px]" />

      <div
        className={`relative grid gap-6 ${
          isFinalStage ? "grid-cols-1" : "xl:grid-cols-[minmax(0,1.15fr)_360px]"
        }`}
      >
        <section className="space-y-6">
          <TreasureMap
            completedStages={completedStages}
            currentStage={currentStage}
          />

          <div className="rounded-[2rem] border border-[#7b4a27] bg-[linear-gradient(180deg,rgba(58,34,18,0.9),rgba(28,16,9,0.94))] p-6 shadow-[0_18px_44px_rgba(70,38,14,0.22)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3">
              {stage.stage === 2 ? (
                <div className="flex flex-wrap items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-[#f0cf97]">
                  <span>Birthday Gift /</span>
                  <span className="creepy-typed font-mono text-[#ff4d4d]">
                    Yelling
                  </span>
                </div>
              ) : (
                <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[#f0cf97]">
                  Birthday Gift / CTF Runtime
                </p>
              )}
              <h1 className="max-w-4xl text-3xl font-semibold leading-tight text-white md:text-4xl">
                {stage.name}
              </h1>
            </div>
          </div>

          <div>{children}</div>
          </div>
        </section>

        {!isFinalStage && (
          <aside className="space-y-5">
          <div className="rounded-[1.8rem] border border-[#7b4a27] bg-[linear-gradient(180deg,rgba(62,37,20,0.92),rgba(29,17,10,0.96))] p-5">
            <p className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-[#efcc95]/65">
              Route Progress
            </p>
            <StageProgress
              completedStages={completedStages}
              currentStage={currentStage}
            />
          </div>

          <div className="rounded-[1.8rem] border border-[#7b4a27] bg-[linear-gradient(180deg,rgba(62,37,20,0.92),rgba(29,17,10,0.96))] p-5">
            <p className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-[#efcc95]/65">
              Mechanics
            </p>
            <p className="text-sm leading-7 text-white/74">{stage.mechanics}</p>
          </div>

          <div className="rounded-[1.8rem] border border-[#7b4a27] bg-[linear-gradient(180deg,rgba(62,37,20,0.92),rgba(29,17,10,0.96))] p-5">
            <div className="mb-4 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.3em] text-[#efcc95]/65">
              <Skull className="h-4 w-4" />
              <span>Visual Prompt</span>
            </div>
            <p className="text-sm leading-7 text-white/62">{stage.aiVisualPrompt}</p>
          </div>

          {stage.stage === 2 && isStage2HintVisible ? (
            <div className="overflow-hidden rounded-[1.8rem] border border-[#7b4a27] bg-[linear-gradient(180deg,rgba(62,37,20,0.92),rgba(29,17,10,0.96))] p-4">
              <p className="mb-4 text-[0.7rem] uppercase tracking-[0.35em] text-[#efcc95]/65">
                yelling at u piece of shit 
              </p>
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20">
                <Image
                  alt="Yelling reference hint"
                  className="h-auto w-full object-cover"
                  height={900}
                  src="/yelling.jpg"
                  width={700}
                />
              </div>
            </div>
          ) : null}
          </aside>
        )}
      </div>
    </div>
  );
}
