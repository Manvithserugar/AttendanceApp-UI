import React, { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Pagination,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Manage({baseURL}) {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState("");
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const formRef = useRef();

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (name === "" && email === "" && phone === "") {
      setIsEditing(false);
      setEditStudentId("");
    }
  }, [name, email, phone]);

  useEffect(() => {
    if (editStudentId) {
      fetchStudentDetails(editStudentId);
    }
  }, [editStudentId]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const fetchStudentDetails = (id) => {
    let student = students.find((student) => student.id === id);
    setStudentId(student.id);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
  };

  const clearFields = () => {
    setStudentId("");
    setEditStudentId("");
    setName("");
    setEmail("");
    setPhone("");
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    setEditStudentId(id);
    fetchStudentDetails(id);
    formRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await handleUpdate(editStudentId);
    } else {
      await handleAdd();
    }
  };

  // const fetchStudents = async () => {
  //   const studentsData = await fetch(
  //     "http://localhost:3001/students/attendance/date",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const students = await studentsData.json();
  //   setStudents(students);
  // };

  // const handleDelete = async (studentId) => {
  //   await fetch(`http://localhost:3001/students/${studentId}`, {
  //     method: "DELETE",
  //   });
  //   fetchStudents();
  // };

  // const handleUpdate = async (studentId) => {
  //   await fetch(`http://localhost:3001/students/${studentId}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, phone }),
  //   });
  //   clearFields();
  //   fetchStudents();
  //   setIsEditing(false);
  //   setEditStudentId("");
  // };

  // const handleAdd = async () => {
  //   await fetch("http://localhost:3001/students", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name, email, phone }),
  //   });
  //   clearFields();
  //   fetchStudents();
  // };

  const fetchStudents = async () => {
    const studentsData = await fetch(`${baseURL}/students/attendance/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const students = await studentsData.json();
    setStudents(students);
  };

  const handleDelete = async (studentId) => {
    await fetch(`${baseURL}/students/${studentId}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  const handleUpdate = async (studentId) => {
    await fetch(`${baseURL}/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });
    clearFields();
    fetchStudents();
    setIsEditing(false);
    setEditStudentId("");
  };

  const handleAdd = async () => {
    await fetch(`${baseURL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone }),
    });
    clearFields();
    fetchStudents();
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Manage Students</h1>
      <Box
        ref={formRef}
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
      >
        {isEditing && <h3>Student Id: {studentId}</h3>}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              type="button"
              variant="contained"
              size="medium"
              color="primary"
              onClick={clearFields}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
              sx={{ width: "20%", marginRight: 0 }}
            >
              {isEditing ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </Box>

        <TextField
          label="Search students..."
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          sx={{ mb: 2, width: "100%" }}
        />
      </Box>
      <List>
        {currentStudents.map((student) => (
          <ListItem
            key={student.id}
            sx={{ display: "flex", justifyContent: "center", padding: 0 }}
          >
            <Card
              sx={{
                marginBottom: 2,
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                boxShadow: 2,
                width: "80%",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: 2 }}
                >
                  Student Id: {student.id}
                </Typography>
                <Typography variant="h5">{student.name}</Typography>
              </CardContent>
              <CardActions sx={{ marginRight: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  size="medium"
                  onClick={() => handleEdit(student.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  size="medium"
                  onClick={() => handleDelete(student.id)}
                  color="error"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
}

export default Manage;
