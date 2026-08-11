import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Greeting from './Greeting';

// We use the fireEvent.change function to simulate the user typing in the input field. We use the act function to wrap the fireEvent.change call, which ensures that all updates to the component state are processed before we make assertions about the rendered output.

describe('<Greeting />', () => {
    it("It should render the username typed by the user", async () => {
        const userName = "Alice";
        render(<Greeting />);

        await act(() => {
            fireEvent.change(screen.getByRole('textbox'), { target: { value: userName } });
        });

        const greeting = screen.getByText(`Hello, ${userName}!`);
        expect(greeting).toBeInTheDocument();
    });
});