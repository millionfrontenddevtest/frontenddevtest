import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterBar } from "../../components/property/FilterBar";

describe("FilterBar", () => {
  const mockOnFilterChange = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnFilterChange.mockClear();
    mockOnReset.mockClear();
  });

  it("renders all filter inputs", () => {
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    expect(screen.getByLabelText("Property Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Min Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Price")).toBeInTheDocument();
  });

  it("updates name filter on input change", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    const nameInput = screen.getByLabelText("Property Name");
    await user.type(nameInput, "Test Property");

    expect(nameInput).toHaveValue("Test Property");
  });

  it("calls onFilterChange with correct values on submit", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    const nameInput = screen.getByLabelText("Property Name");
    const minPriceInput = screen.getByLabelText("Min Price");
    const submitButton = screen.getByText("Apply Filters");

    await user.type(nameInput, "Test");
    await user.type(minPriceInput, "100000");
    await user.click(submitButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      name: "Test",
      address: undefined,
      minPrice: 100000,
      maxPrice: undefined,
    });
  });

  it("calls onReset when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    const resetButton = screen.getByText("Reset");
    await user.click(resetButton);

    expect(mockOnReset).toHaveBeenCalled();
  });

  it("clears all inputs when reset is clicked", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    const nameInput = screen.getByLabelText(
      "Property Name"
    ) as HTMLInputElement;
    const addressInput = screen.getByLabelText("Address") as HTMLInputElement;
    const resetButton = screen.getByText("Reset");

    await user.type(nameInput, "Test");
    await user.type(addressInput, "Test Address");
    await user.click(resetButton);

    expect(nameInput.value).toBe("");
    expect(addressInput.value).toBe("");
  });

  it("handles price range inputs correctly", async () => {
    const user = userEvent.setup();
    render(
      <FilterBar onFilterChange={mockOnFilterChange} onReset={mockOnReset} />
    );

    const minPriceInput = screen.getByLabelText("Min Price");
    const maxPriceInput = screen.getByLabelText("Max Price");
    const submitButton = screen.getByText("Apply Filters");

    await user.type(minPriceInput, "50000");
    await user.type(maxPriceInput, "500000");
    await user.click(submitButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      name: undefined,
      address: undefined,
      minPrice: 50000,
      maxPrice: 500000,
    });
  });
});
