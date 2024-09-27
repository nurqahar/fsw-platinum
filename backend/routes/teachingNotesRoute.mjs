/**
 * @swagger
 * components:
 *   schemas:
 *     Teaching Notes:
 *       type: object
 *       required:
 *         - presence
 *         - content
 *         - time
 *         - total_content_time
 *         - date
 *         - school_year
 *         - semester
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Teaching Notes
 *         presence:
 *           type: string
 *           description: The status presence of siswa
 *         content:
 *           type: string
 *           description: The content of your class
 *         notes:
 *           type: string
 *           description: The notes of your siswa
 *         time:
 *           type: string
 *           description: The time of your class
 *         total_content_time:
 *           type: string
 *           description: The jumlah time pelajaran of your class
 *         date:
 *           type: string
 *           description: The date of your class
 *         school_year:
 *           type: string
 *           description: The tahun ajaran of your class
 *         semester:
 *           type: string
 *           description: The semester of your class
 *         grade:
 *           type: string
 *           description: The grade of your student
 *       example:
 *         presence : "HADIR"
 *         content : "Pengenalan PLC"
 *         notes : " "
 *         time : "07:00"
 *         total_content_time : "5 jp"
 *         date : "2024-08-22"
 *         school_year : "2024/2025"
 *         semester : "1"
 *         grade : " "
 *
 */

/**
 * @swagger
 * tags:
 *   name: Teaching Notes
 *   description: The Teaching Notes of your class - 5
 *
 *
 * /api/teaching_notes:
 *   get:
 *     summary: Lists all the Teaching Notes
 *     tags: [Teaching Notes]
 *     responses:
 *       200:
 *         description: The list of the Teaching Notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               users:
 *                 $ref: '#/components/schemas/Teaching Notes'
 *
 *
 * /api/teaching_notes/{id1}/{id2}/{id3}/{id4}:
 *   post:
 *     summary: Create a Teaching Notes
 *     tags: [Teaching Notes]
 *     parameters:
 *      - in: path
 *        name: id1
 *        schema:
 *          type: string
 *        required: true
 *        description: The subject id
 *      - in: path
 *        name: id2
 *        schema:
 *          type: string
 *        required: true
 *        description: The teacher id
 *      - in: path
 *        name: id3
 *        schema:
 *          type: string
 *        required: true
 *        description: The class id
 *      - in: path
 *        name: id4
 *        schema:
 *          type: string
 *        required: true
 *        description: The student id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teaching Notes'
 *     responses:
 *       201:
 *         description: The Teaching Notes added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teaching Notes'
 *       404:
 *         description: The Teaching Notes was not found
 *       500:
 *         description: Some error happened
 *
 * /api/teaching_notes/{id1}/{id2}/{id3}:
 *   put:
 *     summary: Update The Teaching Notes by the id
 *     tags: [Teaching Notes]
 *     parameters:
 *      - in: path
 *        name: id1
 *        schema:
 *          type: string
 *        required: true
 *        description: The Teaching Notes id
 *      - in: path
 *        name: id2
 *        schema:
 *          type: string
 *        required: true
 *        description: The subject id
 *      - in: path
 *        name: id3
 *        schema:
 *          type: string
 *        required: true
 *        description: The teacher id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teaching Notes'
 *     responses:
 *       201:
 *         description: The Teaching Notes added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teaching Notes'
 *       404:
 *         description: The Teaching Notes was not found
 *       500:
 *         description: Some error happened
 *
 * /api/teaching_notes/{id}:
 *   get:
 *     summary: Get the Teaching Notes by id
 *     tags: [Teaching Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Teaching Notes id
 *     responses:
 *       200:
 *         description: The Teaching Notes response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teaching Notes'
 *       404:
 *         description: The Teaching Notes was not found
 *
 *
 *   delete:
 *     summary: Remove The Teaching Notes by id
 *     tags: [Teaching Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Teaching Notes id
 *     responses:
 *       200:
 *         description: The Teaching Notes was deleted
 *       404:
 *         description: The Teaching Notes was not found
 */
import express from "express";
import {
  createData,
  getAllData,
  getDataById,
  updateData,
  deleteData,
} from "../controllers/teachingController.mjs";

const router = express.Router();

router.post("/:id1/:id2/:id3/:id4", createData);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.put("/:id1/:id2/:id3", updateData);
router.delete("/:id", deleteData);

export default router;
