import Image from "next/image";
import {
  Compass,
  MapPinned,
  ScrollText,
  ShipWheel,
  Trophy,
} from "lucide-react";

import type { StageId } from "@/src/utils/stage-data";

type TreasureMapProps = {
  completedStages: StageId[];
  currentStage: StageId;
};

const stageNodes: Array<{
  id: StageId;
  label: string;
  x: number;
  y: number;
}> = [
  { id: 0, label: "Gate", x: 16, y: 22 },
  { id: 1, label: "Mountain", x: 40, y: 14 },
  { id: 2, label: "Ghost Dog", x: 71, y: 20 },
  { id: 3, label: "Abyss", x: 52, y: 40 },
  { id: 4, label: "Market", x: 25, y: 60 },
  { id: 5, label: "Citadel", x: 71, y: 66 },
  { id: 6, label: "Lab", x: 47, y: 79 },
];

export function TreasureMap({
  completedStages,
  currentStage,
}: TreasureMapProps) {
  const bakriNode = stageNodes[currentStage];

  return (
    <div className="treasure-map relative overflow-hidden rounded-[2rem] border border-[#6c4322] bg-[linear-gradient(180deg,#f7e0b7_0%,#efd2a1_46%,#dfb882_100%)] p-5 text-[#55311d] shadow-[0_24px_90px_rgba(35,19,7,0.42)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,248,220,0.5),_transparent_25%),radial-gradient(circle_at_bottom,_rgba(109,67,34,0.14),_transparent_38%)]" />
      <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(rgba(93,54,27,0.45)_0.8px,transparent_0.8px)] [background-size:14px_14px]" />

      <div className="relative mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#89552e]">
            Route Of Bakri
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-[#5a3319]">
            Parchment Navigation Board
          </h3>
        </div>

        <div className="flex gap-2">
          <CornerIcon icon={<Compass className="h-4 w-4" />} />
          <CornerIcon icon={<ShipWheel className="h-4 w-4" />} />
        </div>
      </div>

      <div className="relative h-[430px] overflow-hidden rounded-[1.7rem] border border-[#88542c] bg-[linear-gradient(180deg,rgba(255,248,227,0.34),rgba(162,102,54,0.12))] p-4 md:h-[500px]">
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M16 22 C24 10, 31 17, 40 14 S63 12, 71 20 S54 32, 52 40 S33 56, 25 60 S63 61, 71 66 S58 79, 47 79"
            fill="none"
            pathLength="1"
            stroke="#5d371d"
            strokeDasharray="0.012 0.02"
            strokeLinecap="round"
            strokeWidth="0.8"
          />
        </svg>

        <MapDecoration />

        {stageNodes.map((node) => {
          const isCompleted = completedStages.includes(node.id);
          const isActive = currentStage === node.id;

          return (
            <div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div
                className={[
                  "flex h-24 w-28 flex-col items-center justify-center rounded-[44%_56%_52%_48%/42%_45%_55%_58%] border border-[#8f5f39] bg-[radial-gradient(circle_at_top,_rgba(255,249,233,0.8),rgba(241,203,152,0.95)_56%,rgba(213,162,103,1)_100%)] px-3 text-center shadow-[0_10px_30px_rgba(80,44,18,0.18)]",
                  isActive ? "ring-2 ring-[#9f2417]/55" : "",
                ].join(" ")}
              >
                <div className="mb-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#754623] bg-[#f7e2ba] text-xs font-semibold">
                  {node.id}
                </div>
                <div className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#5a3319]">
                  {node.label}
                </div>
                <div className="mt-1 text-[0.62rem] text-[#8a572f]">
                  {isCompleted ? "Solved" : isActive ? "Bakri here" : "Locked"}
                </div>
              </div>
            </div>
          );
        })}

        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${bakriNode.x}%`, top: `${bakriNode.y}%` }}
        >
          <div className="bakri-marker relative h-18 w-18 rounded-full border-[3px] border-[#5b2f15] bg-[#fff1d7] p-1 shadow-[0_14px_30px_rgba(55,28,8,0.35)]">
            <Image
              alt="Bakri walking on the treasure map"
              className="h-full w-full rounded-full object-cover"
              height={72}
              src="/bakri.jpg"
              width={72}
            />
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-[#724224] bg-[#f6dfb4] px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#603719] shadow-sm">
              Bakri
            </div>
          </div>
        </div>

        <div className="absolute left-4 top-4 rounded-full border border-[#7b4b25] bg-[#edd3ab] p-3 text-[#5d371d] shadow-sm">
          <Compass className="h-7 w-7" />
        </div>

        <div className="absolute bottom-5 right-4 flex flex-col gap-2">
          <LegendPill icon={<MapPinned className="h-4 w-4" />} text="Current route" />
          <LegendPill icon={<Trophy className="h-4 w-4" />} text="Solved island" />
          <LegendPill icon={<ScrollText className="h-4 w-4" />} text="CTF stage note" />
        </div>
      </div>
    </div>
  );
}

function MapDecoration() {
  const decorations = [
    { x: 10, y: 66, rotate: "-18deg" },
    { x: 31, y: 31, rotate: "8deg" },
    { x: 61, y: 12, rotate: "-8deg" },
    { x: 84, y: 45, rotate: "15deg" },
  ];

  return (
    <>
      {decorations.map((item, index) => (
        <div
          key={`${item.x}-${item.y}-${index}`}
          className="absolute h-8 w-8 rounded-full border border-[#8d5d36]/60 bg-[#f8e8c6]/70"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: `rotate(${item.rotate})`,
          }}
        />
      ))}
    </>
  );
}

type CornerIconProps = {
  icon: React.ReactNode;
};

function CornerIcon({ icon }: CornerIconProps) {
  return (
    <div className="rounded-full border border-[#87532d] bg-[#f2d9af] p-2 text-[#6b3f1f] shadow-sm">
      {icon}
    </div>
  );
}

type LegendPillProps = {
  icon: React.ReactNode;
  text: string;
};

function LegendPill({ icon, text }: LegendPillProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-[#88532b] bg-[#f6dfb5]/95 px-3 py-2 text-[0.65rem] uppercase tracking-[0.2em] text-[#6b3b1b] shadow-sm">
      {icon}
      <span>{text}</span>
    </div>
  );
}
