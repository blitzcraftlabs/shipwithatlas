import { act, fireEvent, render, screen } from "@testing-library/react";

import { CommandStrip } from "@/components/marketing/command-strip";
import { INSTALL_COMMAND, QUICK_START_SCRIPT } from "@/lib/marketing/constants";

function mockClipboard(writeText: jest.Mock | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    value: writeText ? { writeText } : undefined,
    configurable: true,
  });
}

describe("CommandStrip", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("matches the official Atlas README install command", () => {
    expect(INSTALL_COMMAND).toBe("pnpm dlx @blitzcraftlabs/atlas init my-app");
    expect(QUICK_START_SCRIPT).toBe(
      [INSTALL_COMMAND, "cd my-app", "pnpm install", "pnpm dev"].join("\n")
    );
  });

  it("copies the command and announces success, then resets", async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    render(<CommandStrip command={INSTALL_COMMAND} copyLabel="Copy install command" />);

    expect(screen.getByText("@blitzcraftlabs/atlas").closest("code")).toHaveTextContent(
      INSTALL_COMMAND
    );
    const button = screen.getByRole("button", { name: "Copy install command" });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(writeText).toHaveBeenCalledWith(INSTALL_COMMAND);
    expect(screen.getByRole("status")).toHaveTextContent("Copied to clipboard");
    expect(button).toHaveAttribute("data-copy-status", "copied");

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  it("announces a failure when the clipboard is unavailable", async () => {
    mockClipboard(undefined);

    render(<CommandStrip command="pnpm dev" copyLabel="Copy command" />);

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Copy command" }));
    });

    expect(screen.getByRole("status")).toHaveTextContent(/Copy failed/);
  });

  it("shows a visible status word when showLabel is set", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);

    render(
      <CommandStrip command={INSTALL_COMMAND} copyLabel="Copy install command" showLabel />
    );

    const button = screen.getByRole("button", { name: "Copy install command" });
    expect(button).toHaveTextContent("Copy");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(button).toHaveTextContent("Copied");
  });
});
