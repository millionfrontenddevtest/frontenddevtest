import { propertyService } from "../../services/propertyService";
import type { Property, PropertyFilter } from "../../types/property.types";

// Mock axios
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      response: {
        use: jest.fn(),
      },
    },
  })),
}));

describe("PropertyService", () => {
  const mockProperties: Property[] = [
    {
      id: "1",
      name: "Property A",
      address: "123 Main St",
      price: 100000,
      idOwner: "owner1",
    },
    {
      id: "2",
      name: "Property B",
      address: "456 Oak Ave",
      price: 200000,
      idOwner: "owner2",
    },
    {
      id: "3",
      name: "House C",
      address: "789 Pine Rd",
      price: 150000,
      idOwner: "owner3",
    },
  ];

  describe("filterProperties", () => {
    beforeEach(() => {
      // Mock getAllProperties to return mockProperties
      jest
        .spyOn(propertyService, "getAllProperties")
        .mockResolvedValue(mockProperties);
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("filters properties by name", async () => {
      const filters: PropertyFilter = { name: "Property" };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Property A");
      expect(result[1].name).toBe("Property B");
    });

    it("filters properties by address", async () => {
      const filters: PropertyFilter = { address: "Main" };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(1);
      expect(result[0].address).toBe("123 Main St");
    });

    it("filters properties by min price", async () => {
      const filters: PropertyFilter = { minPrice: 150000 };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price >= 150000)).toBe(true);
    });

    it("filters properties by max price", async () => {
      const filters: PropertyFilter = { maxPrice: 150000 };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price <= 150000)).toBe(true);
    });

    it("filters properties by price range", async () => {
      const filters: PropertyFilter = { minPrice: 100000, maxPrice: 180000 };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price >= 100000 && p.price <= 180000)).toBe(
        true
      );
    });

    it("filters properties by multiple criteria", async () => {
      const filters: PropertyFilter = {
        name: "Property",
        minPrice: 150000,
      };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Property B");
      expect(result[0].price).toBeGreaterThanOrEqual(150000);
    });

    it("returns all properties when no filters are provided", async () => {
      const filters: PropertyFilter = {};
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(3);
    });

    it("returns empty array when no properties match filters", async () => {
      const filters: PropertyFilter = { name: "NonExistent" };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(0);
    });

    it("filters are case-insensitive", async () => {
      const filters: PropertyFilter = { name: "property" };
      const result = await propertyService.filterProperties(filters);

      expect(result).toHaveLength(2);
    });
  });
});
