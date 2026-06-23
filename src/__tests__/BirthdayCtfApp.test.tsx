import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { BirthdayCtfApp } from "@/src/components/game/BirthdayCtfApp";
import { useBirthdayGameStore } from "@/src/store/useBirthdayGameStore";

describe("BirthdayCtfApp", () => {
  beforeEach(() => {
    window.localStorage.clear();
    useBirthdayGameStore.getState().resetGame();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("advances from stage 0 after the Ctrl+C kill flow", async () => {
    const user = userEvent.setup();

    render(<BirthdayCtfApp />);

    await user.type(screen.getByLabelText("Terminal command"), "php artisan migrate 70");
    await user.click(screen.getByRole("button", { name: "Execute Command" }));

    await user.click(screen.getByRole("button", { name: "Ctrl + C" }));

    expect(
      await screen.findByRole(
        "heading",
        {
          name: "The Team Leader Purge",
        },
        { timeout: 2500 },
      ),
    ).toBeInTheDocument();
  });

  it("moves the decoy button on hover in stage 5", async () => {
    const user = userEvent.setup();
    const randomSpy = vi
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.3)
      .mockReturnValueOnce(0.9);

    useBirthdayGameStore.getState().hydrate({
      completedStages: [0, 1, 2, 3, 4],
      currentStage: 5,
      isAudioRewardActive: true,
      isCertificateVisible: false,
      isStage2HintVisible: false,
      stageLogs: ["[test] stage 5 ready"],
      themeVariant: "citadel",
    });

    render(<BirthdayCtfApp />);

    const decoyButton = screen.getByRole("button", {
      name: "Evasive decoy button",
    });

    expect(decoyButton).toHaveStyle({ left: "10%", top: "18%" });

    await user.hover(decoyButton);

    expect(decoyButton).toHaveStyle({ left: "24%", top: "63%" });
    randomSpy.mockRestore();
  });
});
