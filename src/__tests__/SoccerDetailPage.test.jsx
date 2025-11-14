import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import SoccerDetailPage from "../pages/SoccerDetailPage";
import { vi } from "vitest";
import { useSoccerProducts } from "../hooks/useSoccerProducts";

vi.mock("../hooks/useSoccerProducts", () => ({
  useSoccerProducts: vi.fn(),
}));

test("SoccerDetailPage shows the correct item based on the URL id", () => {
  useSoccerProducts.mockReturnValue({
    soccerItems: [
      {
        id: 1,
        name: "FIFA World Cup 26 Trionda Soccer Ball",
        description:
          "Combines performance-driven design with FIFA Quality certification.",
        brand: "Adidas",
        price: 44.99,
      },
    ],
    loading: false,
    error: null,
  });

  render(
    <MemoryRouter initialEntries={["/shop/1"]}>
      <Routes>
        <Route path="/shop/:id" element={<SoccerDetailPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(
    screen.getByText(/FIFA World Cup 26 Trionda Soccer Ball/i)
  ).toBeInTheDocument();
});
