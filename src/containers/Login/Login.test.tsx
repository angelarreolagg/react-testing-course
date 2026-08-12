import { describe, it, expect, vi, Mock } from "vitest";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { getAuth } from "../../services/getAuth";
import { SessionProvider } from "../../context/AuthContext";
import { Login } from "./Login";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../services/getAuth", () => ({
  getAuth: vi.fn(),
}));

const mockNavigate = vi.fn();
const mockGetAuth = getAuth as Mock;

describe("<Login />", () => {
  const handleLogin = () => {
    return render(
      <SessionProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </SessionProvider>,
    );
  };

  it("should render the error message", async () => {
    mockGetAuth.mockRejectedValue(new Error("Invalid username or password"));
    handleLogin();
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });

    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "wronguser" } });
      fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
      fireEvent.click(buttonLogin);
    });

    const errorMessage = screen.getByText("Invalid username or password");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should redirect to the orders page on successful login", async () => {
    mockGetAuth.mockResolvedValue({ success: true });
    handleLogin();
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const buttonLogin = screen.getByRole("button", { name: "Login" });

    await act(() => {
      fireEvent.change(usernameInput, { target: { value: "validuser" } });
      fireEvent.change(passwordInput, { target: { value: "validpassword" } });
      fireEvent.click(buttonLogin);
    });

    await waitFor(() => {
      expect(mockGetAuth).toHaveBeenCalledWith("validuser", "validpassword");
      expect(mockNavigate).toHaveBeenCalledWith("/orders");
    });
  });
});
