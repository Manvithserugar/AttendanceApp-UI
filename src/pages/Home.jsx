import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fetchFromMemory, addInMemory, initialStudents } from '../data/data';
import { TextField, Button, Pagination, Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Home({ firebaseApp, db }) {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const studentsPerPage = 5;

  useEffect(() => {
    const fetchStudents = async () => {
        if (firebaseApp) {
            // const querySnapshot = await getDocs(collection(db, "students")); // Uncomment for Firebase
            // const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Uncomment for Firebase
            const studentsData = await fetchFromMemory('students'); // Comment this for Firebase
            setStudents(studentsData);
        } else {
            const studentsData =  initialStudents;
            setStudents(studentsData);
        }
    };

    const fetchAttendance = async () => {
        if (firebaseApp) {
            const allAttendance = await fetchFromMemory('attendance');
            const attendanceMap = {};
            allAttendance.forEach(record => {
                if (attendanceMap[record.studentId]) {
                    attendanceMap[record.studentId]++;
                } else {
                    attendanceMap[record.studentId] = 1;
                }
            });
            setAttendanceData(attendanceMap);
        }
    };


    fetchStudents();
    fetchAttendance();
  }, [firebaseApp, db]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

    const handleSelectStudent = (event, student) => {
        if (event.target.checked) {
            setSelectedStudents([...selectedStudents, student]);
        } else {
            setSelectedStudents(selectedStudents.filter(s => s.id !== student.id));
        }
    };


  const handleMarkAttendance = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student.');
      return;
    }

    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');

    try {
        for (const student of selectedStudents) {
            // await addDoc(collection(db, 'attendance'), { // Uncomment for Firebase
            //   studentId: student.id, // Uncomment for Firebase
            //   date: formattedDate, // Uncomment for Firebase
            //   present: true, // Uncomment for Firebase
            // }); // Uncomment for Firebase
            await addInMemory('attendance', { studentId: student.id, date: formattedDate, present: true }); // Comment this for Firebase
        }
      alert(`Attendance marked for selected students on ${formattedDate}`);
        if (firebaseApp) {
            const allAttendance = await fetchFromMemory('attendance');
            const attendanceMap = {};
            allAttendance.forEach(record => {
                if (attendanceMap[record.studentId]) {
                    attendanceMap[record.studentId]++;
                } else {
                    attendanceMap[record.studentId] = 1;
                }
            });
            setAttendanceData(attendanceMap);
        }
    } catch (error) {
      console.error("Error marking attendance: ", error);
      alert('Failed to mark attendance.');
    }

    setSelectedStudents([]);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Home Page</h1>
      <TextField
        label="Search students..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ mb: 2, width: '100%' }}
      />
       <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>Student Name</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Total Attendance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentStudents.map(student => (
            <TableRow key={student.id}>
               <TableCell padding="checkbox">
                  <Checkbox
                      edge="end"
                      onChange={(event) => handleSelectStudent(event, student)}
                      checked={selectedStudents.some(s => s.id === student.id)}
                  />
                </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.id}</TableCell>
              <TableCell>{attendanceData[student.id] || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
      <Button variant="contained" color="secondary" onClick={handleMarkAttendance} disabled={selectedStudents.length === 0}>
        Mark Attendance
      </Button>
    </div>
  );
}

export default Home;
