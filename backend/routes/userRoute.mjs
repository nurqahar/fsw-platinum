/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - email
 *         - phoneNumber
 *       optional:
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         firstName:
 *           type: string
 *           description: The first name of your user
 *         lastName:
 *           type: string
 *           description: The first name of your user
 *         email:
 *           type: string
 *           description: The email user
 *         phoneNumber:
 *           type: string
 *           description: The phone number user
 *         password:
 *           type: string
 *           description: thepassword
 *       example:
 *         firstName: Adha
 *         lastName: Qahar
 *         email: qahar@mail.com
 *         phoneNumber: "62888881188"
 *         password: aAfdqwrw3!
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users API
 * /api/users:
 *   get:
 *     security:
 *      - Authorization: []
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 $ref: '#/components/schemas/User'
 *
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 *
 *
 * /api/users/{id}:
 *   get:
 *     security:
 *      - Authorization: []
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 *   put:
 *    security:
 *      - Authorization: []
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     security:
 *      - Authorization: []
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.mjs";
import passport from "passport";

const router = express.Router();
router.get("/", getUsers);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserById
);
router.post("/", createUser);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

export default router;
