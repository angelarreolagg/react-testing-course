import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button />", () => {
  it("Should render the button", () => {
    render(<Button label="click" />);
    const button = screen.getByText("click");
    expect(button).toBeInTheDocument();
  });

  // Arrange, Act, Assert -> AAA Pattern
  it('Should call the "onClick" function', async () =>  {
    const handleClick = vi.fn();
    render(<Button label="click" onClick={handleClick} />);
    const button = screen.getByText("click");
    await act(() => {
        fireEvent.click(button);
    })
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
