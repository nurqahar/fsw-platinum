/**
 * @swagger
 * components:
 *   schemas:
 *     Teachers:
 *       type: object
 *       required:
 *         - teacher
 *         - sex
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the teacher
 *         teacher:
 *           type: string
 *           description: The teacher name
 *         sex:
 *           type: string
 *           description: The sex of teacher
 *       example:
 *         teacher: John
 *         sex: Laki-laki
 */

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: The teachers on school - 2
 *
 *
 * /api/teachers:
 *   get:
 *     summary: Lists all the Teachers
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: The list of the teachers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 $ref: '#/components/schemas/Teachers'
 *   post:
 *     summary: Create a new teacher and link to course
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teachers'
 *     responses:
 *       201:
 *         description: The teacher added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teachers'
 *       404:
 *         description: The course was not found
 *       500:
 *         description: Some error happened
 *
 *
 * /api/teachers/{id}:
 *   get:
 *     summary: Get the teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teachers'
 *       404:
 *         description: The class was not found
 *
 *   put:
 *    summary: Update The teacher by the id
 *    tags: [Teachers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The teacher id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Teachers'
 *    responses:
 *      200:
 *        description: The teacher was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Teachers'
 *      404:
 *        description: The teacher was not found
 *      500:
 *        description: Some error happened
 *
 *   delete:
 *     summary: Remove The teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The teacher id
 *     responses:
 *       200:
 *         description: The teacher was deleted
 *       404:
 *         description: The teacher was not found
 */

import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../controllers/teachersController.mjs";

const router = express.Router();

router.post("/", createData);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
