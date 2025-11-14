import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

test("HomePage shows a link to the shop", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  const link = screen.getByRole("link", { name: /shop now/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute("href", "/shop");
});
