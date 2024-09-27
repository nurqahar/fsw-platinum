import express from "express";
import userRoute from "./userRoute.mjs";
import classesRoute from "./classesRoute.mjs";
import subjectsRoute from "./subjectsRoute.mjs";
import studentsRoute from "./studentsRoute.mjs";
import teachingNotesRoute from "./teachingNotesRoute.mjs";
import teachersRoute from "./teachersRoute.mjs";
const router = express.Router();

router.use("/users", userRoute);
router.use("/classes", classesRoute);
router.use("/subjects", subjectsRoute);
router.use("/students", studentsRoute);
router.use("/teaching_notes", teachingNotesRoute);
router.use("/teachers", teachersRoute);

export default router;
