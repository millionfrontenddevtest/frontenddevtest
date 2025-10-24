import { render, screen } from "@testing-library/react";
import { PropertyList } from "../../components/property/PropertyList";
import type { Property } from "../../types/property.types";

describe("PropertyList", () => {
  const mockProperties: Property[] = [
    {
      id: "1",
      name: "Property 1",
      address: "Address 1",
      price: 100000,
      idOwner: "owner1",
    },
    {
      id: "2",
      name: "Property 2",
      address: "Address 2",
      price: 200000,
      idOwner: "owner2",
    },
  ];

  it("renders loading state", () => {
    render(
      <PropertyList
        properties={[]}
        isLoading={true}
        isError={false}
        error={null}
      />
    );

    expect(screen.getByText("Loading properties...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <PropertyList
        properties={[]}
        isLoading={false}
        isError={true}
        error="Failed to load properties"
      />
    );

    expect(screen.getByText("Unable to Load Properties")).toBeInTheDocument();
    expect(screen.getByText("Failed to load properties")).toBeInTheDocument();
  });

  it("renders empty state when no properties", () => {
    render(
      <PropertyList
        properties={[]}
        isLoading={false}
        isError={false}
        error={null}
      />
    );

    expect(screen.getByText("No Properties Available")).toBeInTheDocument();
  });

  it("renders property list correctly", () => {
    render(
      <PropertyList
        properties={mockProperties}
        isLoading={false}
        isError={false}
        error={null}
      />
    );

    expect(screen.getByText("Property 1")).toBeInTheDocument();
    expect(screen.getByText("Property 2")).toBeInTheDocument();
    expect(screen.getByText("Address 1")).toBeInTheDocument();
    expect(screen.getByText("Address 2")).toBeInTheDocument();
  });

  it("renders correct number of properties", () => {
    render(
      <PropertyList
        properties={mockProperties}
        isLoading={false}
        isError={false}
        error={null}
      />
    );

    const propertyCards = screen.getAllByText(/Property \d/);
    expect(propertyCards).toHaveLength(2);
  });
});
