export type StageId = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type StageTheme =
  | "terminal"
  | "forest-green"
  | "storm"
  | "abyss"
  | "market"
  | "citadel"
  | "lab";

export type StageOption = {
  id: string;
  text: string;
  isProceed: boolean;
};

export type StageConfig = {
  stage: StageId;
  name: string;
  coordinates: { lat: number; lng: number } | null;
  challengeType: string;
  mechanics: string;
  onSuccessEffect: string;
  aiVisualPrompt: string;
  correctCommand?: string;
  correctAnswerRegex?: string;
  correctInput?: string;
  correctAnswer?: string;
  targetAction?: string;
  actionButtonText?: string;
  codeTemplate?: string;
  options?: StageOption[];
};

export const STAGE_THEME_MAP: Record<StageId, StageTheme> = {
  0: "terminal",
  1: "forest-green",
  2: "storm",
  3: "abyss",
  4: "market",
  5: "citadel",
  6: "lab",
};

export const STAGES: StageConfig[] = [
  {
    stage: 0,
    name: "Terminal Authentication",
    coordinates: null,
    challengeType: "COMPLEX_MATH_COMMAND",
    mechanics:
"",    correctCommand: "npm run start --token=526",
    onSuccessEffect:
      "Map decryption complete. Primitive overland navigation unlocked.",
    aiVisualPrompt:
      "A pure retro hacker terminal interface, command-line design, matrix green font on solid black background, glowing bootup sequences, cyber-security dashboard aesthetic, professional network system login layout.",
  },
  {
    stage: 1,
    name: "The Team Leader Purge",
    coordinates: { lat: 33.545, lng: 36.315 },
    challengeType: "CSS_VALIDATION",
    mechanics:
      "اكتب قاعدة CSS كاملة تستهدف `.paper` وتحوّل اللون إلى الأخضر المستوحى من جامع الفيصل.",
    correctAnswerRegex:
      "^(\\s*\\.paper\\s*\\{\\s*color\\s*:\\s*(green|#00ff00)\\s*;?\\s*\\}\\s*)$",
    onSuccessEffect:
      "Forest-mode enabled. Off-grid 4x4 route synced to the next checkpoint.",
    aiVisualPrompt:
      "A highly detailed dark cyber-primal user interface dashboard. In the center, an ancient, weathered, glowing parchment paper texture overlay. The background is a dim, atmospheric restaurant layout nestled in a mountain canyon with misty green pine trees at night, glowing neon green accent lines, terminal style console text overlay, dark mode aesthetics, style of cyberpunk meets rustic nature.",
  },
  {
    stage: 2,
    name: " AM I A SONG ? ",
    coordinates: { lat: 33.52, lng: 36.3 },
    challengeType: "LYRICS_DECRYPTION",
    mechanics:
"please enter the forth word of the song we shared accidently",    correctInput: "sky",
    onSuccessEffect:
      "Lightning event fired. Reward audio state switched to active playback.",
    aiVisualPrompt:
      "An animated dark night sky filled with hyper-realistic moving clouds, a huge glowing full moon casting eerie shadows, a lonely dark highway stretching into the horizon, a faint holographic wireframe ghost dog standing on the road blinking on and off. Synthwave and low-poly aesthetic mixed with dark starry night, intense cinematic color grading, immersive game UI design.",
  },
  {
    stage: 3,
    name: "Write the damn css line and save me",
    coordinates: { lat: 34.5, lng: 36 },
    challengeType: "CSS_RESCUE",
    mechanics:
      "اكتب سطر CSS كامل يستهدف `.save-sisi` ويحوّل زر الإنقاذ إلى اللون الأخضر لفتح المرحلة التالية.",
    onSuccessEffect:
      "Rescue CSS applied. The green button is live and the sea route unlocks.",
    aiVisualPrompt:
      "A dramatic top-down view of a deep, stormy black ocean abyss. On the left shore, a terrified minimalist female avatar looking at the water in sheer panic (phobia concept). In the deep water, a powerful, solitary male swimming silhouette effortlessly navigating the waves. Cyberpunk control panel overlay with radioactive warning signs, cold blue and pitch black color palette, photorealistic water simulation.",
  },
  {
    stage: 4,
    name: "The Bet",
    coordinates: { lat: 3.139, lng: 101.6869 },
    challengeType: "FIXED_MATH_CONVERSION",
    mechanics:
"This is about your ego and that specific trip you keep inviting everyone to. Fact: it needs partner to actually deploy this journey",    correctAnswer: "1.71",
    onSuccessEffect:
      "ATM relay online. Long-range route warped from Syria to Malaysia.",
    aiVisualPrompt:
      "A glitchy stock market terminal dashboard with green and red glowing digital candles. Live simulated Bitcoin crypto ticker charts crashing in the background. In the foreground, a prominent neon numeric input field surrounded by technical wireframes, mathematical formulas floating in the air, financial dark-web interface, hyper-detailed cyberpunk trading desk style.",
  },
  {
    stage: 5,
    name: "Submit to the Matriarchy",
    coordinates: { lat: 4.2105, lng: 101.9758 },
    challengeType: "EVASIVE_HOVER_TRAP",
    mechanics:
      "الزر البدائي يهرب كلما اقترب المؤشر. الطريق الوحيد هو الاستسلام المنهجي لسلطة القلعة.",
    targetAction: "SUBMIT_TO_MATRIARCHY",
    onSuccessEffect:
      "System Notice: We knew you would submit to the matriarchy!",
    aiVisualPrompt:
      "A colossal, dark gothic citadel gates deep inside a prehistoric, dense wild jungle. The gates are guarded by glowing neon pink abstract matriarchal symbols. The UI overlay has two conflicting futuristic buttons, one glowing emerald green and highly stable, the other unstable and vibrating with glitch effects. Cinematic epic scale, moody dark green and hot pink contrast.",
  },
  {
    stage: 6,
    name: "Inject Immortality Serum",
    coordinates: { lat: 4.5, lng: 101.5 },
    challengeType: "INFINITE_LOOP_ACTIVATION",
    mechanics:
      "اضغط زر حقن المصل لدمج الذكريات الـ 70 وتوليد شهادة الخلود ووعد الرحلة إلى ماليزيا.",
    actionButtonText: "Inject Immortal_Serum.exe",
    codeTemplate:
      "while(true) {\n  travelToMalaysia({ durationDays: 10, fixedBudgetUSD: 1500 });\n}",
    onSuccessEffect:
      "Immortality certificate deployed. Celebration protocol active.",
    aiVisualPrompt:
      "A modern underground laboratory hidden inside an ancient redwood forest cave. In the center, a glowing glass bio-reactor container filled with an iridescent, glowing golden serum fluid bubble. Code streams of binary and infinite loop logic 'while(true)' matrix rain reflecting on the glass. Hyper-realistic, ethereal golden lighting, celebratory epic atmosphere, ultra-detailed 3D render.",
  },
];

export const FINALE_MESSAGE = {
  title: "Immortality Certificate",
  subtitle: "Birthday Release Candidate: Eternal",
  body: "Happy birthday, legend. Thanks to your ego and that complete failure at the Wager Arena, your fixed budget of $1500 has been officially confiscated and migrated into my wallet. This strange little expedition is over: I am now compiled and ready to deploy my 10-day Malaysia adventure. As for you? Your balance is $0, but hey—at least your code is immortal. Have fun at the gym next month!"
,
  footer:
    "Issued by the Ministry of Off-Grid Engineering, cinematic chaos division.",
};
