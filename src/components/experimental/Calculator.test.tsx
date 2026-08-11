import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Calculator } from "./Calculator";

// We use the each function of the it object to test multiple use cases.

describe("<Calculator />", () => {
  const useCasesTest = [
    { a: 1, b: 2, operation: "add", expected: 3 },
    { a: 3, b: 2, operation: "multiply", expected: 6 },
    { a: 10, b: 6, operation: "subtract", expected: 4 },
    { a: 15, b: 3, operation: "divide", expected: 5 },
    { a: 1000, b: 0, operation: "divide", expected: "Error" },
  ];

  it.each(useCasesTest)(
    "It should return $expected when $a & $b are $operation",
    ({a, b, operation, expected}) => {
      render(<Calculator a={a} b={b} operation={operation} />);
      const result = screen.getByText(`Result: ${expected}`);
      expect(result).toBeInTheDocument();
    },
  );
});
