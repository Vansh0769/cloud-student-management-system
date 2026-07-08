const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/students.json");

const readStudents = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeStudents = (students) => {
  fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
};

// GET ALL STUDENTS
const getStudents = (req, res) => {
  try {
    const students = readStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students." });
  }
};

// ADD STUDENT
const addStudent = (req, res) => {
  try {
    const students = readStudents();

    const newStudent = {
      id: Date.now(),
      ...req.body,
    };

    students.push(newStudent);

    writeStudents(students);

    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to add student." });
  }
};

// UPDATE STUDENT
const updateStudent = (req, res) => {
  try {
    const students = readStudents();

    const index = students.findIndex(
      (student) => student.id == req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    students[index] = {
      ...students[index],
      ...req.body,
    };

    writeStudents(students);

    res.json(students[index]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update student.",
    });
  }
};

// DELETE STUDENT
const deleteStudent = (req, res) => {
  try {
    const students = readStudents();

    const updatedStudents = students.filter(
      (student) => student.id != req.params.id
    );

    writeStudents(updatedStudents);

    res.json({
      message: "Student deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete student.",
    });
  }
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};