/**
 * @swagger
 * components:
 *   schemas:
 *     Students:
 *       type: object
 *       required:
 *         - student
 *         - sex
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Student
 *         student:
 *           type: string
 *           description: The Student name
 *         sex:
 *           type: string
 *           description: The sex of Student
 *       example:
 *         student: khronos
 *         sex: Laki-laki
 */

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: The Students on school - 4
 *
 *
 * /api/students:
 *   get:
 *     summary: Lists all the Student
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 $ref: '#/components/schemas/Students'
 *
 *
 * /api/students/{id}:
 *   post:
 *     summary: Create a new Student and link to Class
 *     tags: [Students]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: class id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Students'
 *     responses:
 *       201:
 *         description: The Student added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Students'
 *       404:
 *         description: The student was not found
 *       500:
 *         description: Some error happened
 *   get:
 *     summary: Get the Student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Student id
 *       - in: query
 *         name: class_id
 *         schema:
 *           type: string
 *         description: The Class id
 *     responses:
 *       200:
 *         description: The Student response by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Students'
 *       404:
 *         description: The class was not found
 *
 *   put:
 *    summary: Update The Student by the id
 *    tags: [Students]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Student id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Students'
 *    responses:
 *      200:
 *        description: The Student was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Students'
 *      404:
 *        description: The Student was not found
 *      500:
 *        description: Some error happened
 *
 *   delete:
 *     summary: Remove The Student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Student id
 *     responses:
 *       200:
 *         description: The Student was deleted
 *       404:
 *         description: The Student was not found
 */
import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../controllers/studentsController.mjs";

const router = express.Router();

router.post("/:id", createData);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
