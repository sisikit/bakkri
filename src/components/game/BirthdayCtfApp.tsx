"use client";

import { Headphones, RotateCcw, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";

import { Atmosphere } from "@/src/components/game/Atmosphere";
import { StageShell } from "@/src/components/game/StageShell";
import { SystemLog } from "@/src/components/game/SystemLog";
import { Stage0Terminal } from "@/src/components/game/stages/Stage0Terminal";
import { Stage1JeanChallenge } from "@/src/components/game/stages/Stage1JeanChallenge";
import { Stage2SkyDecrypt } from "@/src/components/game/stages/Stage2SkyDecrypt";
import { Stage3Dilemma } from "@/src/components/game/stages/Stage3Dilemma";
import { Stage5HoverTrap } from "@/src/components/game/stages/Stage5HoverTrap";
import { Stage6ImmortalityLab } from "@/src/components/game/stages/Stage6ImmortalityLab";
import { usePersistedBirthdayGame } from "@/src/hooks/usePersistedBirthdayGame";
import { useBirthdayGameStore } from "@/src/store/useBirthdayGameStore";
import { STAGES } from "@/src/utils/stage-data";
import { Stage4PrimalDeity } from "./stages/Stage4BtcMath";

const themeStyles: Record<string, CSSProperties> = {
  terminal: {
    "--accent": "#34d399",
    "--muted": "rgba(167,243,208,0.68)",
    "--paper-color": "#cedfcf",
  } as CSSProperties,
  "forest-green": {
    "--accent": "#4ade80",
    "--muted": "rgba(187,247,208,0.68)",
    "--paper-color": "#76ff92",
  } as CSSProperties,
  storm: {
    "--accent": "#7dd3fc",
    "--muted": "rgba(186,230,253,0.68)",
    "--paper-color": "#d9f0ff",
  } as CSSProperties,
  abyss: {
    "--accent": "#38bdf8",
    "--muted": "rgba(186,230,253,0.68)",
    "--paper-color": "#d4f5ff",
  } as CSSProperties,
  market: {
    "--accent": "#4ade80",
    "--muted": "rgba(187,247,208,0.72)",
    "--paper-color": "#defce7",
  } as CSSProperties,
  citadel: {
    "--accent": "#f472b6",
    "--muted": "rgba(251,207,232,0.7)",
    "--paper-color": "#ffe1ee",
  } as CSSProperties,
  lab: {
    "--accent": "#fbbf24",
    "--muted": "rgba(253,230,138,0.72)",
    "--paper-color": "#fff3c4",
  } as CSSProperties,
};

export function BirthdayCtfApp() {
  usePersistedBirthdayGame();

  const completedStages = useBirthdayGameStore((state) => state.completedStages);
  const currentStage = useBirthdayGameStore((state) => state.currentStage);
  const decoyPosition = useBirthdayGameStore((state) => state.decoyPosition);
  const isAudioRewardActive = useBirthdayGameStore(
    (state) => state.isAudioRewardActive,
  );
  const isCertificateVisible = useBirthdayGameStore(
    (state) => state.isCertificateVisible,
  );
  const isStage2HintVisible = useBirthdayGameStore(
    (state) => state.isStage2HintVisible,
  );
  const logs = useBirthdayGameStore((state) => state.stageLogs);
  const moveDecoy = useBirthdayGameStore((state) => state.moveDecoy);
  const resetGame = useBirthdayGameStore((state) => state.resetGame);
  const submitStage2 = useBirthdayGameStore((state) => state.submitStage2);
  const submitStage3 = useBirthdayGameStore((state) => state.submitStage3);
  const submitStage4 = useBirthdayGameStore((state) => state.submitStage4);
  const submitStage5 = useBirthdayGameStore((state) => state.submitStage5);
  const bypassStage0 = useBirthdayGameStore((state) => state.bypassStage0);
  const bypassStage1 = useBirthdayGameStore((state) => state.bypassStage1);
  const themeVariant = useBirthdayGameStore((state) => state.themeVariant);
  const toggleStage2Hint = useBirthdayGameStore((state) => state.toggleStage2Hint);
  const triggerFinale = useBirthdayGameStore((state) => state.triggerFinale);

  const stage = STAGES[currentStage];

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={themeStyles[themeVariant]}
    >
      <Atmosphere
        theme={themeVariant}
        isAudioRewardActive={isAudioRewardActive}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.8rem] border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.35em] text-[var(--muted)]">
              Personalized Birthday Gift SPA
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              BAKRIs BIRTHDAY MAP
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge icon={<ShieldCheck className="h-4 w-4" />}>
              Sequential flow: Stage {currentStage} / 6
            </StatusBadge>
            <StatusBadge icon={<Headphones className="h-4 w-4" />}>
              {isAudioRewardActive ? "Reward audio active" : "Audio locked"}
            </StatusBadge>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-3 text-xs uppercase tracking-[0.25em] text-white/80 transition hover:bg-white/12"
              onClick={resetGame}
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </header>

        <div className="flex-1 space-y-6">
          <StageShell
            completedStages={completedStages}
            currentStage={currentStage}
            isStage2HintVisible={isStage2HintVisible}
            stage={stage}
          >
            {renderStage({
              currentStage,
              decoyPosition,
              isStage2HintVisible,
              isAudioRewardActive,
              isCertificateVisible,
              moveDecoy,
              bypassStage0,
              bypassStage1,
              submitStage2,
              submitStage3,
              submitStage4,
              submitStage5,
              toggleStage2Hint,
              triggerFinale,
            })}
          </StageShell>

          <SystemLog logs={logs} />
        </div>
      </div>
    </main>
  );
}

type RenderStageProps = {
  currentStage: number;
  decoyPosition: { x: number; y: number };
  isAudioRewardActive: boolean;
  isCertificateVisible: boolean;
  isStage2HintVisible: boolean;
  moveDecoy: () => void;
  bypassStage0: () => void;
  bypassStage1: () => void;
  submitStage2: (input: string) => boolean;
  submitStage3: (input: string) => boolean;
  submitStage4: (input: string) => boolean;
  submitStage5: () => boolean;
  toggleStage2Hint: () => void;
  triggerFinale: () => void;
};

function renderStage({
  currentStage,
  decoyPosition,
  isAudioRewardActive,
  isCertificateVisible,
  isStage2HintVisible,
  moveDecoy,
  bypassStage0,
  bypassStage1,
  submitStage2,
  submitStage3,
  submitStage4,
  submitStage5,
  toggleStage2Hint,
  triggerFinale,
}: RenderStageProps) {
  switch (currentStage) {
    case 0:
      return <Stage0Terminal onBypass={bypassStage0} />;
    case 1:
      return <Stage1JeanChallenge onSuccess={bypassStage1} />;
    case 2:
      return (
        <Stage2SkyDecrypt
          isHintVisible={isStage2HintVisible}
          isAudioRewardActive={isAudioRewardActive}
          onSubmit={submitStage2}
          onToggleHint={toggleStage2Hint}
        />
      );
    case 3:
      return <Stage3Dilemma onSubmit={submitStage3} />;
    case 4:
      return <Stage4PrimalDeity onSubmit={submitStage4} />;
    case 5:
      return (
        <Stage5HoverTrap
          decoyPosition={decoyPosition}
          onDecoyHover={moveDecoy}
          onProceed={submitStage5}
        />
      );
    case 6:
      return (
        <Stage6ImmortalityLab
          actionButtonText={STAGES[6].actionButtonText ?? "Inject"}
          codeTemplate={STAGES[6].codeTemplate ?? ""}
          isCertificateVisible={isCertificateVisible}
          onInject={triggerFinale}
        />
      );
    default:
      return null;
  }
}

type StatusBadgeProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

function StatusBadge({ children, icon }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-xs uppercase tracking-[0.24em] text-white/78">
      {icon}
      <span>{children}</span>
    </div>
  );
}
