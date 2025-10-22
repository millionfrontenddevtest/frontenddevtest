import { render, screen } from "@testing-library/react";
import { PropertyCard } from "../../components/property/PropertyCard";
import type { Property } from "../../types/property.types";

describe("PropertyCard", () => {
  const mockProperty: Property = {
    id: "1",
    name: "Beautiful House",
    address: "123 Main St, City",
    price: 500000,
    idOwner: "owner1",
    image: "https://example.com/image.jpg",
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders property information correctly", () => {
    render(<PropertyCard property={mockProperty} onClick={mockOnClick} />);

    expect(screen.getByText("Beautiful House")).toBeInTheDocument();
    expect(screen.getByText("123 Main St, City")).toBeInTheDocument();
    expect(screen.getByText("$500,000")).toBeInTheDocument();
  });

  it("calls onClick when card is clicked", () => {
    render(<PropertyCard property={mockProperty} onClick={mockOnClick} />);

    const card = screen
      .getByText("Beautiful House")
      .closest("div")?.parentElement;
    card?.click();

    expect(mockOnClick).toHaveBeenCalledWith(mockProperty);
  });

  it("renders placeholder when no image is provided", () => {
    const propertyWithoutImage = { ...mockProperty, image: undefined };
    render(
      <PropertyCard property={propertyWithoutImage} onClick={mockOnClick} />
    );

    const svgElement = screen
      .getByText("Beautiful House")
      .closest("div")
      ?.parentElement?.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders View Details button", () => {
    render(<PropertyCard property={mockProperty} onClick={mockOnClick} />);

    expect(screen.getByText("View Details")).toBeInTheDocument();
  });
});
