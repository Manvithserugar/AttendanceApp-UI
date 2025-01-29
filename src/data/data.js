export const initialStudents = [
    { id: '1', name: 'Aarav Patel' },
    { id: '2', name: 'Aditi Sharma' },
    { id: '3', name: 'Rohan Singh' },
    { id: '4', name: 'Priya Kumar' },
    { id: '5', name: 'Vikram Yadav' },
    { id: '6', name: 'Neha Gupta' },
    { id: '7', name: 'Aryan Verma' },
    { id: '8', name: 'Anika Kapoor' },
    { id: '9', name: 'Siddharth Jain' },
    { id: '10', name: 'Meera Nair' },
    { id: '11', name: 'Karan Joshi' },
    { id: '12', name: 'Deepika Reddy' },
    { id: '13', name: 'Varun Menon' },
    { id: '14', name: 'Ishita Das' },
    { id: '15', name: 'Rishabh Tiwari' },
    { id: '16', name: 'Sakshi Choudhary' },
    { id: '17', name: 'Amit Kumar' },
    { id: '18', name: 'Divya Iyer' },
    { id: '19', name: 'Suraj Mishra' },
    { id: '20', name: 'Anjali Rao' }
];

let students = [...initialStudents];
let attendance = [];

export const fetchFromMemory = (collectionName) => {
  if (collectionName === 'students') {
    return Promise.resolve(students);
  } else if (collectionName === 'attendance') {
      return Promise.resolve(attendance);
  }
  return Promise.resolve([]);
};

export const updateInMemory = (collectionName, id, data) => {
  if (collectionName === 'students') {
    students = students.map(student => student.id === id ? { ...student, ...data } : student);
    return Promise.resolve();
  } else if (collectionName === 'attendance') {
      attendance = attendance.map(record => record.id === id ? { ...record, ...data } : record);
      return Promise.resolve();
  }
  return Promise.resolve();
};

export const addInMemory = (collectionName, data) => {
    if (collectionName === 'students') {
        const newStudent = { ...data, id: String(students.length + 1) };
        students.push(newStudent);
        return Promise.resolve(newStudent);
    } else if (collectionName === 'attendance') {
        const newRecord = { ...data, id: String(attendance.length + 1) };
        attendance.push(newRecord);
        return Promise.resolve(newRecord);
    }
    return Promise.resolve();
};

export const deleteInMemory = (collectionName, id) => {
    if (collectionName === 'students') {
        students = students.filter(student => student.id !== id);
        return Promise.resolve();
    } else if (collectionName === 'attendance') {
        attendance = attendance.filter(record => record.id !== id);
        return Promise.resolve();
    }
    return Promise.resolve();
};
