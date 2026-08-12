import { describe, it, expect, vi, Mock } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { getOrders } from "../services/getOrders";
import { useSession } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";

vi.mock("../services/getOrders", () => ({
  getOrders: vi.fn(),
}));

vi.mock("../context/AuthContext", async () => {
  return {
    useSession: vi.fn(),
  };
});
vi.mock("react-router-dom", async () => {
  return {
    useNavigate: vi.fn(),
  };
});

describe("useOrders", () => {
  const mockNavigate = vi.fn();
  const getOrdersMock = getOrders as Mock;
  const useSessionMock = useSession as Mock;

  it("Should get the orders", async () => {
    const mockOrders = [
      {
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        customer: {
          id: "60d07f61-99bf-4b90-955b-5d3a7c9bb3d4",
          name: "John Doe",
          email: "john.doe@example.com",
        },
        products: [
          {
            id: "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
            name: "Laptop",
            price: 999.99,
            quantity: 1,
          },
          {
            id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
            name: "Mouse",
            price: 29.99,
            quantity: 1,
          },
        ],
        total: 1029.98,
        status: "delivered",
        orderDate: "2023-10-01T10:00:00Z",
        shippingAddress: {
          street: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          country: "USA",
        },
        paymentMethod: "credit_card",
      },
    ];
    getOrdersMock.mockResolvedValue(mockOrders);
    useSessionMock.mockReturnValue({ user: { id: 1 } });

    const { result } = renderHook(() => useOrders());

    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.orders).toEqual(mockOrders);
    });
  });

  it("Should get error if fetching orders fails", async () => {
    getOrdersMock.mockRejectedValue(new Error("Failed to fetch orders"));
    useSessionMock.mockReturnValue({ user: { id: 1 } });

    const { result } = renderHook(() => useOrders());

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
