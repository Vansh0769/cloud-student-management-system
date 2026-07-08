import { useEffect, useState } from "react";
import AddStudent from "./AddStudent";
import Students from "./Students";
import { getStudents } from "../services/studentService";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const loadStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const totalCourses = new Set(students.map((s) => s.course)).size;

  const highestSemester =
    students.length > 0
      ? Math.max(...students.map((s) => Number(s.semester)))
      : 0;

  return (
    <div className="container py-4">

      <h2 className="fw-bold text-primary">
        Cloud Student Management System
      </h2>

      <p className="text-muted">
        Microsoft Azure Developer (AZ-204) Minor Project
      </p>

      {/* Dashboard Cards */}
      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Total Students</h6>
              <h2>{students.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Total Courses</h6>
              <h2>{totalCourses}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body text-center">
              <h6>Highest Semester</h6>
              <h2>{highestSemester}</h2>
            </div>
          </div>
        </div>

      </div>

      <AddStudent
        editingStudent={editingStudent}
        onStudentAdded={() => {
          loadStudents();
          setEditingStudent(null);
        }}
      />

      <Students
        students={students}
        loadStudents={loadStudents}
        onEdit={setEditingStudent}
      />

    </div>
  );
}

export default Dashboard;