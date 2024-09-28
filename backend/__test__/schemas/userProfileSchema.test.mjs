import {
  userProfileSchema,
  editUserProfileSchema,
} from "../../schema/userProfileSchema.mjs";

describe("Validation Schemas", () => {
  describe("userProfileSchema", () => {
    it("should pass with valid bio", () => {
      const validData = {
        bio: "if we dont end war, war will end us",
      };
      const { error } = userProfileSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it("should fail if bio is null", () => {
      const invalidData = {
        bio: "",
      };
      const { error } = userProfileSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("bio");
    });
  });

  describe("editUserProfileSchema", () => {
    it("should pass with valid bio", () => {
      const validData = {
        bio: "if we dont end war, war will end us",
      };
      const { error } = editUserProfileSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it("should fail if bio is null", () => {
      const invalidData = {
        bio: "",
      };
      const { error } = editUserProfileSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("bio");
    });
  });
});
