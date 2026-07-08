import { useState, useEffect } from "react";
import { addStudent, updateStudent } from "../services/studentService";

function AddStudent({ onStudentAdded, editingStudent }) {
  const emptyForm = {
    name: "",
    email: "",
    course: "",
    semester: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name,
        email: editingStudent.email,
        course: editingStudent.course,
        semester: editingStudent.semester,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, form);
        alert("Student Updated Successfully!");
      } else {
        await addStudent(form);
        alert("Student Added Successfully!");
      }

      setForm(emptyForm);

      onStudentAdded();

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">

      <h3 className="mb-3">
        {editingStudent ? "Edit Student" : "Add Student"}
      </h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Student Name</label>

          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter student name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Course</label>

          <input
            type="text"
            className="form-control"
            name="course"
            placeholder="Enter course"
            value={form.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Semester</label>

          <input
            type="number"
            className="form-control"
            name="semester"
            placeholder="Semester"
            min="1"
            max="8"
            value={form.semester}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success">
          {editingStudent ? "Update Student" : "Save Student"}
        </button>

      </form>

    </div>
  );
}

export default AddStudent;