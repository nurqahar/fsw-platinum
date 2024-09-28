import {
  loginSchema,
  resetPasswordSchema,
  validateResetPasswordSchema,
} from "../../schema/authSchema.mjs";

describe("Validation Schemas", () => {
  describe("loginSchema", () => {
    it("should pass with valid email and password", () => {
      const validData = {
        email: "test@mail.com",
        password: "password123",
      };
      const { error } = loginSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it("should fail if email is missing", () => {
      const invalidData = {
        password: "password123",
      };
      const { error } = loginSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("email");
    });

    it("should fail if password is less than 6 characters", () => {
      const invalidData = {
        email: "test@mail.com",
        password: "123",
      };
      const { error } = loginSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("password");
    });
  });

  describe("resetPasswordSchema", () => {
    it("should pass with valid email", () => {
      const validData = {
        email: "test@mail.com",
      };
      const { error } = resetPasswordSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it("should fail if email is missing", () => {
      const invalidData = {};
      const { error } = resetPasswordSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("email");
    });
  });

  describe("validateResetPasswordSchema", () => {
    it("should pass with valid token, password & confirmPassword", () => {
      const validData = {
        token: "Asf45.ldF98.fdkjF984",
        password: "Password1@",
        confirmPassword: "Password1@",
      };
      const { error } = validateResetPasswordSchema.validate(validData);
      expect(error).toBeUndefined();
    });

    it("should fail if token is different pattern", () => {
      const invalidData = {
        token: "Asf45.ldF98",
        password: "Password1@",
        confirmPassword: "Password1@",
      };
      const { error } = validateResetPasswordSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("token");
    });

    it("should fail if password is less than 8 character", () => {
      const invalidData = {
        token: "Asf45.ldF98.fdkjF984",
        password: "Passw1@",
        confirmPassword: "Passw1@",
      };
      const { error } = validateResetPasswordSchema.validate(invalidData);
      expect(error).toBeDefined();
      expect(error.details[0].message).toContain("password");
    });
  });
});
