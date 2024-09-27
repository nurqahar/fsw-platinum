/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
 *       required:
 *         - bio
 *       optional:
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user profile
 *         bio:
 *           type: string
 *           description: user profile bio
 *         image:
 *           type: string
 *           format: binar
 *           description: profile image file
 *       example:
 *         bio: My biography
 *         image: file url
 */

/**
 * @swagger
 * tags:
 *   name: UserProfiles
 *   description: The user profiles API
 * /api/user_profiles/{id}:
 *   post:
 *    security:
 *      - Authorization: []
 *    summary: add user profile
 *    consumes:
 *      - multipart/form-data
 *    tags: [UserProfiles]
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
 *        multipart/form-data:
 *          schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User profile bio
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *    responses:
 *      201:
 *        description: The user profile added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserProfiles'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *
 *   put:
 *    security:
 *      - Authorization: []
 *    summary: edit user profile
 *    consumes:
 *      - multipart/form-data
 *    tags: [UserProfiles]
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
 *        multipart/form-data:
 *          schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *                 description: User profile bio
 *                 required: false
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *                 required: false
 *    responses:
 *      201:
 *        description: The user profile updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserProfiles'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 *
 *   get:
 *    security:
 *      - Authorization: []
 *    summary: get user profile
 *    tags: [UserProfiles]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    responses:
 *      201:
 *        description: The user profile
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserProfiles'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

import express from "express";
import {
  createUserProfile,
  editUserProfile,
  getUserProfile,
} from "../controllers/userProfileController.mjs";
import upload from "../middleware/multer.mjs";
import passport from "passport";

const router = express.Router();

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createUserProfile
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  editUserProfile
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

export default router;
