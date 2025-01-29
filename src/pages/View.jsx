import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchFromMemory } from '../data/data';
import { TextField, Button, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function View({ firebaseApp, db }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [students, setStudents] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  useEffect(() => {
      const fetchStudents = async () => {
          if (firebaseApp) {
              const studentsData = await fetchFromMemory('students');
              setStudents(studentsData);
          } else {
              setStudents(initialStudents);
          }
      };
      fetchStudents();
  }, [firebaseApp]);

  const fetchAttendance = async () => {
      if (firebaseApp) {
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          // const attendanceQuery = query( // Uncomment for Firebase
          //   collection(db, 'attendance'), // Uncomment for Firebase
          //   where('date', '==', formattedDate) // Uncomment for Firebase
          // ); // Uncomment for Firebase
          // const querySnapshot = await getDocs(attendanceQuery); // Uncomment for Firebase
          // const attendanceData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Uncomment for Firebase
          const allAttendance = await fetchFromMemory('attendance'); // Comment this for Firebase
          const attendanceData = allAttendance.filter(record => record.date === formattedDate); // Comment this for Firebase
          setAttendanceRecords(attendanceData);
      } else {
          const allAttendance = await fetchFromMemory('attendance');
          const formattedDate = format(selectedDate, 'yyyy-MM-dd');
          const attendanceData = allAttendance.filter(record => record.date === formattedDate);
          setAttendanceRecords(attendanceData);
      }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>View Attendance</h1>
       <TextField
        type="date"
        value={format(selectedDate, 'yyyy-MM-dd')}
        onChange={handleDateChange}
        variant="outlined"
        sx={{ mb: 2, width: '100%' }}
      />
      <Button variant="contained" color="primary" onClick={fetchAttendance} sx={{ mb: 2 }}>Fetch Attendance</Button>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Student ID</TableCell>
                        <TableCell>Present</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendanceRecords.map(record => {
                        const student = students.find(student => student.id === record.studentId);
                        return (
                            <TableRow key={record.id}>
                                <TableCell>{student ? student.name : 'Unknown'}</TableCell>
                                <TableCell>{record.studentId}</TableCell>
                                <TableCell>{record.present ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
}

export default View;
