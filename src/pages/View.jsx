import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const maxDate = format(new Date(), "yyyy-MM-dd");

function View({ baseURL }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  // useEffect(() => {
  //   const fetchStudents = async () => {
  //     let students = await fetch(
  //       "http://localhost:3001/students/attendance/date",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ date: format(selectedDate, "yyyy-MM-dd") }),
  //       }
  //     );
  //     students = await students.json();
  //     setStudents(students);
  //   };
  //   fetchStudents();
  // }, [selectedDate]);

  useEffect(() => {
    const fetchStudents = async () => {
      let students = await fetch(`${baseURL}/students/attendance/date`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: format(selectedDate, "yyyy-MM-dd") }),
      });
      students = await students.json();
      setStudents(students);
    };
    fetchStudents();
  }, [selectedDate]);

  return (
    <div style={{ padding: "16px" }}>
      <h1>View Attendance</h1>
      <TextField
        type="date"
        value={format(selectedDate, "yyyy-MM-dd")}
        onChange={handleDateChange}
        variant="outlined"
        sx={{ mb: 2, width: "100%" }}
        inputProps={{ max: maxDate }}
      />

      {students.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Student ID</TableCell>
                <TableCell>Total Attendance</TableCell>
                <TableCell>Consecutive Classes</TableCell>
                <TableCell>Streak Of 4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((record) => {
                return (
                  <TableRow key={record.id}>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.total}</TableCell>
                    <TableCell>{record.consecutiveCount}</TableCell>
                    <TableCell>{record.streakOfFour}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h4>No Attendance taken for this date</h4>
      )}
    </div>
  );
}

export default View;
