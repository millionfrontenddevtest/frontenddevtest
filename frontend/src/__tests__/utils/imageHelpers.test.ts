import {
  formatBase64Image,
  isValidBase64,
  getMimeTypeFromDataUri,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_IMAGE_LARGE,
} from "../../utils/imageHelpers";

describe("imageHelpers", () => {
  describe("formatBase64Image", () => {
    it("should add data URI prefix to raw base64 string", () => {
      const rawBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = formatBase64Image(rawBase64);
      expect(result).toBe(`data:image/jpeg;base64,${rawBase64}`);
    });

    it("should return base64 string as-is if it already has data URI prefix", () => {
      const dataUri =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = formatBase64Image(dataUri);
      expect(result).toBe(dataUri);
    });

    it("should return URL as-is if it's an HTTP URL", () => {
      const httpUrl = "http://example.com/image.jpg";
      const result = formatBase64Image(httpUrl);
      expect(result).toBe(httpUrl);
    });

    it("should return URL as-is if it's an HTTPS URL", () => {
      const httpsUrl = "https://example.com/image.jpg";
      const result = formatBase64Image(httpsUrl);
      expect(result).toBe(httpsUrl);
    });

    it("should return null for empty string", () => {
      const result = formatBase64Image("");
      expect(result).toBeNull();
    });

    it("should return null for undefined", () => {
      const result = formatBase64Image(undefined);
      expect(result).toBeNull();
    });

    it("should use custom MIME type when provided", () => {
      const rawBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = formatBase64Image(rawBase64, "image/png");
      expect(result).toBe(`data:image/png;base64,${rawBase64}`);
    });

    it("should default to image/jpeg MIME type", () => {
      const rawBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = formatBase64Image(rawBase64);
      expect(result).toContain("data:image/jpeg;base64,");
    });
  });

  describe("isValidBase64", () => {
    it("should return true for valid base64 string", () => {
      const validBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      expect(isValidBase64(validBase64)).toBe(true);
    });

    it("should return true for base64 with padding", () => {
      const validBase64 = "SGVsbG8gV29ybGQ=";
      expect(isValidBase64(validBase64)).toBe(true);
    });

    it("should return true for data URI with base64", () => {
      const dataUri =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      expect(isValidBase64(dataUri)).toBe(true);
    });

    it("should return false for invalid characters", () => {
      const invalid = "invalid@#$%base64";
      expect(isValidBase64(invalid)).toBe(false);
    });

    it("should return false for empty string", () => {
      expect(isValidBase64("")).toBe(false);
    });

    it("should return false for URL", () => {
      const url = "https://example.com/image.jpg";
      expect(isValidBase64(url)).toBe(false);
    });
  });

  describe("getMimeTypeFromDataUri", () => {
    it("should extract MIME type from data URI", () => {
      const dataUri =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = getMimeTypeFromDataUri(dataUri);
      expect(result).toBe("image/png");
    });

    it("should extract MIME type for JPEG", () => {
      const dataUri = "data:image/jpeg;base64,/9j/4AAQSkZJRg";
      const result = getMimeTypeFromDataUri(dataUri);
      expect(result).toBe("image/jpeg");
    });

    it("should return null for string without data URI prefix", () => {
      const rawBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ";
      const result = getMimeTypeFromDataUri(rawBase64);
      expect(result).toBeNull();
    });

    it("should return null for URL", () => {
      const url = "https://example.com/image.jpg";
      const result = getMimeTypeFromDataUri(url);
      expect(result).toBeNull();
    });
  });

  describe("Constants", () => {
    it("should have PLACEHOLDER_IMAGE defined", () => {
      expect(PLACEHOLDER_IMAGE).toBeDefined();
      expect(typeof PLACEHOLDER_IMAGE).toBe("string");
      expect(PLACEHOLDER_IMAGE).toContain("placeholder");
    });

    it("should have PLACEHOLDER_IMAGE_LARGE defined", () => {
      expect(PLACEHOLDER_IMAGE_LARGE).toBeDefined();
      expect(typeof PLACEHOLDER_IMAGE_LARGE).toBe("string");
      expect(PLACEHOLDER_IMAGE_LARGE).toContain("placeholder");
    });

    it("PLACEHOLDER_IMAGE_LARGE should be different from PLACEHOLDER_IMAGE", () => {
      expect(PLACEHOLDER_IMAGE_LARGE).not.toBe(PLACEHOLDER_IMAGE);
    });
  });

  describe("Integration scenarios", () => {
    it("should handle real-world base64 image data", () => {
      // Minimal PNG image (1x1 red pixel)
      const minimalPng =
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
      const result = formatBase64Image(minimalPng);
      expect(result).toContain("data:image/jpeg;base64,");
      expect(result).toContain(minimalPng);
    });

    it("should handle database response with base64 field", () => {
      const propertyFromDb = {
        id: "123",
        name: "Casa Moderna",
        image: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
      };

      const imageUrl = formatBase64Image(propertyFromDb.image);
      expect(imageUrl).toContain("data:image/");
      expect(imageUrl).toContain(propertyFromDb.image);
    });

    it("should handle database response with data URI", () => {
      const propertyFromDb = {
        id: "123",
        name: "Casa Moderna",
        image:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJ",
      };

      const imageUrl = formatBase64Image(propertyFromDb.image);
      expect(imageUrl).toBe(propertyFromDb.image);
    });

    it("should provide fallback for null image", () => {
      const propertyFromDb = {
        id: "123",
        name: "Casa Moderna",
        image: null,
      };

      const imageUrl =
        formatBase64Image(propertyFromDb.image ?? undefined) ||
        PLACEHOLDER_IMAGE;
      expect(imageUrl).toBe(PLACEHOLDER_IMAGE);
    });
  });
});
