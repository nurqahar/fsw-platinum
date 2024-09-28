import { userSchema } from "../../schema/userSchema.mjs";

describe("Validation Schemas", () => {
  describe("userSchema", () => {
    it("should pass with valid form", () => {
      const validData = {
        firstName: "adha",
        lastName: "qahar",
        phoneNumber: "0812345678",
        email: "test@mail.com",
        password: "Password1@",
      };
      const { error } = userSchema.validate(validData);
      expect(error).toBeUndefined();
    });
    it("should fail if firstName less than 3 character", () => {
      const invalidData = {
        firstName: "ad",
        lastName: "qahar",
        phoneNumber: "0812345678",
        email: "test@mail.com",
        password: "Password1@",
      };
      const { error } = userSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("firstName");
    });
  });
});
