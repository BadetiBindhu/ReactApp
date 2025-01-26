// src/pages/StudentPage.tsx
import React, { useState ,useEffect,useCallback} from 'react';
import {  Button,Container } from '@mui/material';
import {db} from "src/firestore";
import {collection, getDocs, deleteDoc,doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa'; 

function StudentPage(){
  const navigate=useNavigate();
  // State to store student data
interface studentList{
  id:string;
  Name: string;
  Class: number;
  Section: string;
  RollNumber: number;
  Gender: string;
  DateOfBirth: string;
  Address: string;
  PhoneNumber: number;
  Hobbies: string[];
  TermsAccepted: boolean;
  Country: string;
  Email: string;
  Password:string;
};
const [students, setStudents] = useState<studentList[]>([]);
const [isDelete,setIsDelete]=useState<boolean>(false); 

  // Fetch data from Firestore
  const fetchStudents = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "studentlist"));
    const studentsList = querySnapshot.docs.map((docu) => ({
      id: docu.id, // Document ID
      ...docu.data(), // Document fields
    })) as studentList[]; // Cast the result to the Student type

    setStudents(studentsList); // Update state
  },[]);
  
  useEffect(() => {
   fetchStudents();
  });
  
 // Handle delete action
 const handleDelete = async (id: string) => {
  try {
    const itemDoc = doc(db, "studentlist", id); // Reference to the document using id
    await deleteDoc(itemDoc); // Delete the document
    setStudents(prevItems => prevItems.filter(item => item.id !== id)); // Remove item from UI
    console.log(`Student with ID: ${id} deleted`);
    setIsDelete(true);
  } catch (error) {
    console.error("Error deleting student: ", error);
  }
};
useEffect(()=>{
   if(isDelete){
    fetchStudents();
   }
},[fetchStudents,isDelete]);

 console.log("students:",students);
 
  /* Add Student Navigation */

  const handleAddStudent=()=>{
    navigate("/dashboard/studentpage/studentform");
  };

  const handleView=(id:string)=>{
    navigate(`/dashboard/studentpage/viewstudentform/${id}`);
  };
  const handleEdit=(id:string)=>{
    navigate(`/dashboard/studentpage/editstudentform/${id}`);
  };
  return (
    <Container>
      <div style={{width:"100%",margin:"0px",padding:"0px"}}>
      <h1 style={{fontSize:'40px',textAlign:"center"}}>Student Table</h1>
      <Button variant="contained" onClick={handleAddStudent} style={{marginBottom:"5px",backgroundColor:"green"}}>
        + Add Student
      </Button>
      <table style={{borderCollapse:"collapse",borderColor:"#b3b3b3"}}>
        <thead>
          <tr style={{backgroundColor:"#737373",padding:"20px 30px "}}>
            <th style={{padding:'6px'}} >Name</th>
            <th style={{padding:'6px'}}>Class</th>
            <th style={{padding:'6px'}}>Section</th>
            <th style={{padding:'6px'}}>RollNumber</th>
            <th style={{padding:'6px'}}>Gender</th>
            <th style={{padding:'6px'}}>DateOfBirth</th>
            <th style={{padding:'6px'}}>Address</th>
            <th style={{padding:'6px'}}>PhoneNumber</th>
            <th style={{padding:'6px'}}>Hobbies</th>
            <th style={{padding:'6px'}}>Country</th>
            <th style={{padding:'6px'}}>Email</th>
            <th style={{padding:'6px'}}>Password</th>
            <th style={{padding:'6px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td style={{padding:'6px'}}>{student.Name}</td>
                <td style={{padding:'6px'}}>{student.Class}</td>
                <td style={{padding:'6px'}}>{student.Section}</td>
                <td style={{padding:'6px'}}>{student.RollNumber}</td>
                <td style={{padding:'6px'}}>{student.Gender}</td>
                <td style={{padding:'6px'}}>{student.DateOfBirth}</td>
                <td style={{padding:'6px'}}>{student.Address}</td>
                <td style={{padding:'6px'}}>{student.PhoneNumber}</td>
                <td style={{padding:'6px'}}>{student.Hobbies}</td>
                <td style={{padding:'6px'}}>{student.Country}</td>
                <td style={{padding:'6px'}}>{student.Email}</td>
                <td style={{padding:'6px'}}>{student.Password}</td>
                <td style={{padding:'8px'}}>
                  <button type="button"  style={{backgroundColor:"white", borderWidth:"1px",borderStyle:"solid",borderColor:"white" ,padding:"1px"}} onClick={()=>handleDelete(student.id)}> <FaTrash size={16} color="red"/></button>
                  <button type="button"  style={{backgroundColor:"white", borderWidth:"1px",borderStyle:"solid",borderColor:"white",padding:"1px"}} onClick={()=>handleEdit(student.id)}> <FaEdit size={18} color="blue" /></button>
                  <button type="button"  style={{backgroundColor:"white", borderWidth:"1px",borderStyle:"solid",borderColor:"white",padding:"1px"}}  onClick={()=>handleView(student.id)} > <FaEye  size={18} color=" #333300" /></button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
 </Container>
  );
}

export default StudentPage;
