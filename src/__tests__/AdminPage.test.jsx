import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminPage from "../pages/AdminPage";
import { vi } from "vitest";
import { useSoccerProducts } from "../hooks/useSoccerProducts";

vi.mock("../hooks/useSoccerProducts", () => ({
  useSoccerProducts: vi.fn(),
}));

test("AdminPage calls addSoccerItem when form is submitted", async () => {
  const user = userEvent.setup();
  const addSoccerItem = vi.fn().mockResolvedValueOnce({});

  useSoccerProducts.mockReturnValue({
    soccerItems: [],
    loading: false,
    error: null,
    addSoccerItem,
    updateSoccerItem: vi.fn(),
    deleteSoccerItem: vi.fn(),
  });

  render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/name:/i), "Training Cones");
  await user.type(
    screen.getByLabelText(/description:/i),
    "Set of 20 durable cones for drills."
  );
  await user.type(screen.getByLabelText(/brand:/i), "KwikGoal");
  await user.type(screen.getByLabelText(/price:/i), "29.99");

  await user.click(screen.getByRole("button", { name: /add item/i }));

  await waitFor(() => {
    expect(addSoccerItem).toHaveBeenCalledTimes(1);
  });

  expect(addSoccerItem).toHaveBeenCalledWith({
    name: "Training Cones",
    description: "Set of 20 durable cones for drills.",
    brand: "KwikGoal",
    price: 29.99,
  });
});
