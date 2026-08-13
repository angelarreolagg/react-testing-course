import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderItem } from "./OrderItem";
import { Order } from "../../types/Orders";

const mockOrder: Order = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  customer: {
    name: "Jane Doe",
    email: "jane.doe@example.com",
  },
  products: [
    {
      id: "product-1",
      name: "Laptop",
      price: 999.99,
      quantity: 1,
    },
    {
      id: "product-2",
      name: "Mouse",
      price: 29.99,
      quantity: 2,
    },
  ],
  total: 1059.97,
  status: "pending",
  orderDate: "2024-02-15T18:45:00-05:00",
  paymentMethod: "credit_card",
};

describe("<OrderItem />", () => {
  it("should render the order details", () => {
    render(<OrderItem order={mockOrder} />);

    expect(screen.getByText(/Order #123e4567/i)).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("jane.doe@example.com")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === "Laptop x1"),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) => element?.textContent === "Mouse x2"),
    ).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === "$999.99")).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === "$59.98")).toBeInTheDocument();
    expect(screen.getByText("PENDING")).toBeInTheDocument();
    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("credit card")).toBeInTheDocument();
    expect(screen.getByText("Total Amount")).toBeInTheDocument();
    expect(screen.getByText((_, element) => element?.textContent === "$1059.97")).toBeInTheDocument();
  });
});
