import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/index";

const typingText = "Block Mind AI is typing...";

describe("handleSubmit", () => {
  beforeEach(() => {
    global.fetch.mockReset();
  });

  it("replaces the typing placeholder with the API response", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ reply: "Test reply" }),
    });

    render(<Home />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hello" } });
    fireEvent.submit(input.closest("form"));

    expect(screen.getByText(typingText)).toBeInTheDocument();

    const replyMessage = await screen.findByText("Test reply");
    expect(replyMessage).toBeInTheDocument();
    expect(screen.queryByText(typingText)).not.toBeInTheDocument();
  });

  it("shows an error message when the API request fails", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Network error" }),
    });

    render(<Home />);

    const input = screen.getByPlaceholderText("Type a message...");
    fireEvent.change(input, { target: { value: "Hi again" } });
    fireEvent.submit(input.closest("form"));

    expect(screen.getByText(typingText)).toBeInTheDocument();

    const errorMessage = await screen.findByText("Error: Could not get response");
    expect(errorMessage).toBeInTheDocument();
    expect(screen.queryByText(typingText)).not.toBeInTheDocument();
  });
});
