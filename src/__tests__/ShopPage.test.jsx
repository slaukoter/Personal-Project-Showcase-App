import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ShopPage from "../pages/ShopPage";
import { vi } from "vitest";
import { useSoccerProducts } from "../hooks/useSoccerProducts";

vi.mock("../hooks/useSoccerProducts", () => ({
  useSoccerProducts: vi.fn(),
}));

const mockItems = [
  {
    id: 1,
    name: "FIFA World Cup 26 Trionda Soccer Ball",
    description:
      "Combines performance-driven design with FIFA Quality certification.",
    brand: "Adidas",
    price: 44.99,
  },
  {
    id: 2,
    name: "Mercurial Cleats",
    description: "Lightweight cleats designed for explosive forwards.",
    brand: "Nike",
    price: 177.94,
  },
];

test("ShopPage renders soccer items", () => {
  useSoccerProducts.mockReturnValue({
    soccerItems: mockItems,
    loading: false,
    error: null,
  });

  render(
    <MemoryRouter>
      <ShopPage />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/FIFA World Cup 26 Trionda Soccer Ball/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Mercurial Cleats/i)).toBeInTheDocument();
});

test("ShopPage filters items by brand", async () => {
  const user = userEvent.setup();

  useSoccerProducts.mockReturnValue({
    soccerItems: mockItems,
    loading: false,
    error: null,
  });

  render(
    <MemoryRouter>
      <ShopPage />
    </MemoryRouter>
  );

  const select = screen.getByLabelText(/filter by brand/i);
  await user.selectOptions(select, "Adidas");

  expect(
    screen.getByText(/FIFA World Cup 26 Trionda Soccer Ball/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/Mercurial Cleats/i)).not.toBeInTheDocument();
});
