import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("should return formatted string for a valid date", () => {
    const date = new Date("2024-06-15T18:45:00");
    const formatted = formatDate(date);

    expect(formatted).toMatch(/15/);
    expect(formatted).toMatch(/Jun/i);
    expect(formatted).toMatch(/2024/);
    expect(formatted).toMatch(/6:45|18:45/);
  });

  it("should handle invalid Date object", () => {
    const invalidDate = new Date("invalid");
    const result = formatDate(invalidDate);

    expect(typeof result).toBe("string");
  });
});
