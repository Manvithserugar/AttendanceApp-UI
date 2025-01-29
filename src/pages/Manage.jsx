import React, { useState, useEffect } from 'react';
import { fetchFromMemory, updateInMemory, addInMemory, deleteInMemory, initialStudents } from '../data/data';
import { TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';

function Manage({ firebaseApp, db }) {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editStudentId, setEditStudentId] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (editStudentId) {
      fetchStudentDetails(editStudentId);
    }
  }, [editStudentId]);

  const fetchStudents = async () => {
      if (firebaseApp) {
          // const querySnapshot = await getDocs(collection(db, "students")); // Uncomment for Firebase
          // const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Uncomment for Firebase
          const studentsData = await fetchFromMemory('students'); // Comment this for Firebase
          setStudents(studentsData);
      } else {
          setStudents(initialStudents);
      }
  };

  const fetchStudentDetails = async (id) => {
      if (firebaseApp) {
          // const docRef = doc(db, "students", id); // Uncomment for Firebase
          // const docSnap = await getDoc(docRef); // Uncomment for Firebase

          // if (docSnap.exists()) { // Uncomment for Firebase
          //   const studentData = docSnap.data(); // Uncomment for Firebase
          //   setName(studentData.name); // Uncomment for Firebase
          //   setStudentId(studentData.id); // Uncomment for Firebase
          // } else { // Uncomment for Firebase
          //   console.log("No such document!"); // Uncomment for Firebase
          // } // Uncomment for Firebase
          const studentsData = await fetchFromMemory('students'); // Comment this for Firebase
          const student = studentsData.find(student => student.id === id); // Comment this for Firebase
          if (student) { // Comment this for Firebase
              setName(student.name); // Comment this for Firebase
              setStudentId(student.id); // Comment this for Firebase
          } else { // Comment this for Firebase
              console.log("No such student in memory!"); // Comment this for Firebase
          } // Comment this for Firebase
      } else {
          const student = initialStudents.find(student => student.id === id);
          if (student) {
              setName(student.name);
              setStudentId(student.id)
          }
      }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isEditing) {
        if (firebaseApp) {
            // const studentRef = doc(db, "students", editStudentId); // Uncomment for Firebase
            // await updateDoc(studentRef, { // Uncomment for Firebase
            //   name: name, // Uncomment for Firebase
            //   id: studentId // Uncomment for Firebase
            // }); // Uncomment for Firebase
            await updateInMemory('students', editStudentId, { name: name, id: studentId }); // Comment this for Firebase
            alert('Student updated successfully!');
        } else {
            setStudents(students.map(student => student.id === editStudentId ? { ...student, name: name, id: studentId } : student));
            alert('Student updated successfully!');
        }
    } else {
        if (firebaseApp) {
            // await addDoc(collection(db, "students"), { // Uncomment for Firebase
            //   name: name, // Uncomment for Firebase
            //   id: studentId // Uncomment for Firebase
            // }); // Uncomment for Firebase
            await addInMemory('students', { name: name, id: studentId }); // Comment this for Firebase
            alert('Student added successfully!');
        } else {
            const newStudent = { name: name, id: studentId };
            setStudents([...students, newStudent]);
            alert('Student added successfully!');
        }
    }

    setName('');
    setStudentId('');
    setIsEditing(false);
    setEditStudentId('');
    fetchStudents();
  };

  const handleEdit = (studentId) => {
    setIsEditing(true);
    setEditStudentId(studentId);
  };

  const handleDelete = async (studentId) => {
      if (firebaseApp) {
          // const studentRef = doc(db, "students", studentId); // Uncomment for Firebase
          // await deleteDoc(studentRef); // Uncomment for Firebase
          await deleteInMemory('students', studentId); // Comment this for Firebase
          alert('Student deleted successfully!');
          fetchStudents();
      } else {
          setStudents(students.filter(student => student.id !== studentId));
          alert('Student deleted successfully!');
          fetchStudents();
      }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h1>Manage Students</h1>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        <TextField
          label="Student ID"
          variant="outlined"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
        />
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">{isEditing ? 'Update Student' : 'Add Student'}</Button>
      </Box>
      <List>
        {students.map(student => (
          <ListItem key={student.id} secondaryAction={
            <Box>
              <Button variant="outlined" color="primary" onClick={() => handleEdit(student.id)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDelete(student.id)}>Delete</Button>
            </Box>
          }>
            <ListItemText primary={`${student.name} - ${student.id}`} />
          </ListItem>
        ))}
      </List>
      <Button onClick={() => handleEdit('studentIdToEdit')} >Edit Student</Button>
    </div>
  );
}

export default Manage;
