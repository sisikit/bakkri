import type { StageId } from "@/src/utils/stage-data";

type StageProgressProps = {
  completedStages: StageId[];
  currentStage: StageId;
};

const stageIds: StageId[] = [0, 1, 2, 3, 4, 5, 6];

export function StageProgress({
  completedStages,
  currentStage,
}: StageProgressProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {stageIds.map((stageId) => {
        const isCompleted = completedStages.includes(stageId);
        const isActive = currentStage === stageId;

        return (
          <div
            key={stageId}
            className={[
              "flex h-11 min-w-11 items-center justify-center rounded-full border text-xs font-medium tracking-[0.28em] uppercase transition",
              isCompleted
                ? "border-emerald-300/60 bg-emerald-400/20 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.25)]"
                : "",
              isActive
                ? "border-white/60 bg-white/8 text-white"
                : "border-white/10 bg-black/20 text-white/45",
            ].join(" ")}
          >
            {stageId}
          </div>
        );
      })}
    </div>
  );
}
