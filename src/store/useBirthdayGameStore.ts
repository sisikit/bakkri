"use client";

import { create } from "zustand";

import { STAGES, STAGE_THEME_MAP, type StageId, type StageTheme } from "@/src/utils/stage-data";
import {
  validateBitcoinAnswer,
  validateCssRule,
  validateSkyAnswer,
  validateTerminalCommand,
} from "@/src/utils/validators";

type GameSnapshot = {
  completedStages: StageId[];
  currentStage: StageId;
  isAudioRewardActive: boolean;
  isCertificateVisible: boolean;
  isStage2HintVisible: boolean;
  stageLogs: string[];
  themeVariant: StageTheme;
};

type Position = {
  x: number;
  y: number;
};

type BirthdayGameStore = GameSnapshot & {
  decoyPosition: Position;
  hydrate: (snapshot: Partial<GameSnapshot>) => void;
  moveDecoy: () => void;
  pushLog: (message: string) => void;
  resetGame: () => void;
  toggleStage2Hint: () => void;
  bypassStage0: () => void;
  bypassStage1: () => void;
  submitStage0: (input: string) => boolean;
  submitStage1: (input: string) => boolean;
  submitStage2: (input: string) => boolean;
  submitStage3: (input: string) => boolean;
  submitStage4: (input: string) => boolean;
  submitStage5: () => boolean;
  triggerFinale: () => void;
};

const defaultLogs = [
  "[sys.boot] Primitive route engine online.",
  "[hint] Exact commands only. Backend ego is enabled.",
];

const initialState: GameSnapshot = {
  completedStages: [],
  currentStage: 0,
  isAudioRewardActive: false,
  isCertificateVisible: false,
  isStage2HintVisible: false,
  stageLogs: defaultLogs,
  themeVariant: "terminal",
};

function nextStage(stage: StageId): StageId {
  return (Math.min(stage + 1, STAGES.length - 1) as StageId);
}

function appendLog(logs: string[], message: string) {
  return [...logs.slice(-5), message];
}

function normalizeStage3RescueRule(input: string) {
  return input
    .replace(
      /(background(?:-color)?)\s*;\s*(green|#22c55e|#00ff00)/i,
      "$1: $2",
    )
    .trim();
}

export const useBirthdayGameStore = create<BirthdayGameStore>((set) => ({
  ...initialState,
  decoyPosition: { x: 10, y: 18 },
  hydrate: (snapshot) =>
    set((state) => ({
      ...state,
      ...snapshot,
      themeVariant:
        snapshot.currentStage !== undefined
          ? STAGE_THEME_MAP[snapshot.currentStage]
          : state.themeVariant,
    })),
  moveDecoy: () =>
    set(() => ({
      decoyPosition: {
        x: Math.floor(Math.random() * 68) + 4,
        y: Math.floor(Math.random() * 62) + 8,
      },
    })),
  pushLog: (message) =>
    set((state) => ({ stageLogs: appendLog(state.stageLogs, message) })),
  toggleStage2Hint: () =>
    set((state) => ({
      isStage2HintVisible: !state.isStage2HintVisible,
      stageLogs: appendLog(
        state.stageLogs,
        state.isStage2HintVisible
          ? "[hint.off] Yelling reference hidden."
          : "[hint.on] Yelling reference image revealed.",
      ),
    })),
  bypassStage0: () => {
    const solvedStage = 0 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[auth.ok] ${STAGES[0].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
  },
  bypassStage1: () => {
    const solvedStage = 1 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[theme.green] ${STAGES[1].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
  },
  resetGame: () =>
    set({
      ...initialState,
      decoyPosition: { x: 10, y: 18 },
    }),
  submitStage0: (input) => {
    if (!validateTerminalCommand(input)) {
      set((state) => ({
        stageLogs: appendLog(
          state.stageLogs,
          `[backend.syntax] Unexpected token near "${input || "EOF"}". Expected executable command.`,
        ),
      }));
      return false;
    }

    const solvedStage = 0 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[auth.ok] ${STAGES[0].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  submitStage1: (input) => {
    if (!validateCssRule(input)) {
      set((state) => ({
        stageLogs: appendLog(
          state.stageLogs,
          "[lint.css] Rule rejected. Expected `.paper { color: green; }` semantics.",
        ),
      }));
      return false;
    }

    const solvedStage = 1 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[theme.green] ${STAGES[1].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  submitStage2: (input) => {
    if (!validateSkyAnswer(input)) {
      set((state) => ({
        stageLogs: appendLog(
          state.stageLogs,
          "[signal.fail] Decryption mismatch. The moon keeps listening.",
        ),
      }));
      return false;
    }

    const solvedStage = 2 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      isAudioRewardActive: true,
      isStage2HintVisible: false,
      stageLogs: appendLog(state.stageLogs, `[storm.play] ${STAGES[2].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  submitStage3: (input) => {
    const normalizedInput = normalizeStage3RescueRule(input);
    const isValidCss =
      /^(\s*\.save-sisi\s*\{\s*(background|background-color)\s*:\s*(green|#22c55e|#00ff00)\s*;?\s*\}\s*)$/i.test(
        normalizedInput,
      );

    if (!isValidCss) {
      set((state) => ({
        stageLogs: appendLog(
          state.stageLogs,
          "[abyss.fail] Rescue CSS rejected. Target `.save-sisi` must turn green.",
        ),
      }));
      return false;
    }

    const solvedStage = 3 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[abyss.exec] ${STAGES[3].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  submitStage4: (input) => {
    if (!validateBitcoinAnswer(input)) {
      set((state) => ({
        stageLogs: appendLog(
          state.stageLogs,
          "[market.fail] Conversion rejected. BTC remains fixed at 875.00 USD.",
        ),
      }));
      return false;
    }

    const solvedStage = 4 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[market.jump] ${STAGES[4].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  submitStage5: () => {
    const solvedStage = 5 as StageId;
    const currentStage = nextStage(solvedStage);
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, solvedStage])] as StageId[],
      currentStage,
      stageLogs: appendLog(state.stageLogs, `[gate.unlock] ${STAGES[5].onSuccessEffect}`),
      themeVariant: STAGE_THEME_MAP[currentStage],
    }));
    return true;
  },
  triggerFinale: () =>
    set((state) => ({
      completedStages: [...new Set([...state.completedStages, 6])] as StageId[],
      isCertificateVisible: true,
      stageLogs: appendLog(state.stageLogs, `[lab.complete] ${STAGES[6].onSuccessEffect}`),
    })),
}));

export function selectPersistenceSnapshot(state: BirthdayGameStore): GameSnapshot {
  return {
    completedStages: state.completedStages,
    currentStage: state.currentStage,
    isAudioRewardActive: state.isAudioRewardActive,
    isCertificateVisible: state.isCertificateVisible,
    isStage2HintVisible: state.isStage2HintVisible,
    stageLogs: state.stageLogs,
    themeVariant: state.themeVariant,
  };
}
