import { useState } from "react";
import { deleteStudent } from "../services/studentService";

function Students({ students, loadStudents, onEdit }) {
  const [search, setSearch] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      alert("Student deleted successfully!");
      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Failed to delete student.");
    }
  };

  return (
    <div className="card shadow-sm p-4">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Students</h3>

        <span className="badge bg-primary">
          Total: {filteredStudents.length}
        </span>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search student by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="table-responsive">

        <table className="table table-hover table-bordered align-middle">

          <thead className="table-dark">

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Semester</th>
              <th width="170">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredStudents.length > 0 ? (

              filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{student.semester}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No students found.
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;