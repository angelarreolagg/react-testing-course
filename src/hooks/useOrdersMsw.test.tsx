import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/server";
import { useOrders } from "./useOrders";
import { SessionProvider, useSession } from "../context/AuthContext";

vi.mock("../context/AuthContext", async () => {
  const actual = await vi.importActual("../context/AuthContext");
  return {
    ...actual,
    useSession: vi.fn(),
  };
});

describe("useOrders MSW", () => {
  const mockUser = { id: "1", name: "John Doe" };

  beforeEach(() => {
    (useSession as Mock).mockReturnValue({ user: mockUser });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SessionProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </SessionProvider>
  );

  it("should fetch orders successfully", async () => {
    const { result } = renderHook(() => useOrders(), {
      wrapper,
    });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.orders).toHaveLength(1);
    });
  });

  it("should get an error when fetching orders fails", async () => {
    server.use(
      http.get("http://localhost:3001/orders/", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "Internal Server Error",
        });
      }),
    );

    const { result } = renderHook(() => useOrders(), {
      wrapper,
    });
    await waitFor(() => {
      expect(result.current.error).toBe(
        "Failed to fetch orders. Please try again later.",
      );
    });
  });
});
