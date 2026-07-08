const express = require("express");
const router = express.Router();

const {
    getStudents,
    addStudent,
    deleteStudent,
    updateStudent
} = require("../controllers/studentController");

router.get("/", getStudents);

router.post("/", addStudent);

router.delete("/:id", deleteStudent);

router.put("/:id", updateStudent);


module.exports = router;