/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: qahar@mail.com
 *         password: aAfdqwrw3!
 *
 *     ResetPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         email: qahar@mail.com
 *
 *
 *     ValidateResetPassword:
 *       type: object
 *       required:
 *         - token
 *         - password
 *         - confirmPassword
 *       properties:
 *         token:
 *           type: string
 *           description: reset password token
 *
 *         password:
 *           type: string
 *           description: The new password
 *
 *         confirmPassword:
 *           type: string
 *           description: The new password
 *
 *       example:
 *         token: JWTTOKEN
 *         password: Passw0rd!!!
 *         confirmPassword: Passw0rd!!!
 *
 *     Token:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token
 *       example:
 *         token: JWTTOKEN
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: The authentication API
 * /api/auth/login:
 *   post:
 *     summary: Login using email and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Token'
 *       500:
 *         description: Server error
 *
 * /api/auth/reset:
 *   post:
 *     summary: Reset password using email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Successfully triggered password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *               example:
 *                 message: "Password reset link sent"
 *       500:
 *         description: Server error
 *
 * /api/auth/validate-reset:
 *   post:
 *     summary: validate Reset password using email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidateResetPassword'
 *     responses:
 *       200:
 *         description: Successfully triggered password reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *               example:
 *                 message: "Password reset link sent"
 *       500:
 *         description: Server error
 */

import express from "express";
import {
  login,
  resetPassword,
  validateResetPassword,
} from "../controllers/authController.mjs";

const router = express.Router();
router.post("/login", login);
router.post("/reset", resetPassword);
router.post("/validate-reset", validateResetPassword);

export default router;
