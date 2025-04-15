import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import './App.css'; // <-- optional but recommended

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (name, course) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", { name, course });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", backgroundColor: "#90EE90", minHeight: "100vh", padding: "20px" }}>
      <img src="logo.png" alt="Logo" width="150" />
      <h1 style={{ color: "#333" }}>Student Recording System</h1>
      <StudentForm addStudent={addStudent} />
      <StudentList students={students} />
    </div>
  );
  
};

export default App;

