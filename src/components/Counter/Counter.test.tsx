import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Counter from './Counter';

describe('<Contador />', () => {
    it("It should render the initial value", () => {
        render(<Counter />);
        const counter = screen.getByText("Counter: 0");
        expect(counter).toBeInTheDocument();
    });

    it("It should increment the counter", async () => {
        render(<Counter />);
        const incrementButton = screen.getByText("Add")
        await act(() => {
            fireEvent.click(incrementButton);
        })
        const counter = screen.getByText("Counter: 1");
        expect(counter).toBeInTheDocument();
    });

    it("It should decrement the counter", async () => {
        render(<Counter />);
        const decreaseButton = screen.getByText("Sub")
        await act(() => {
            fireEvent.click(decreaseButton);
        })
        const counter = screen.getByText("Counter: -1");
        expect(counter).toBeInTheDocument();
    });
});