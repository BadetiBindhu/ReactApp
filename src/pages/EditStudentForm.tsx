/* eslint-disable react/prop-types */

import {db} from "src/firestore";
import { doc,  getDoc,  updateDoc} from 'firebase/firestore'; 
import {useNavigate,useParams } from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import { useEffect,useCallback } from "react";

interface FormInputs {
  Name: string;
  Class: number;
  Section: string;
  RollNumber: number;
  Gender: string;
  DateOfBirth: string;
  Address: string;
  PhoneNumber: number;
  Hobbies: string[];
  Country: string;
  Email: string;
  Password:string;
}
function EditStudentForm(){
  const {register,handleSubmit,formState:{errors},watch,reset}=useForm<FormInputs>();
  const navigate=useNavigate();
  const fetchStudentData =useCallback(async (id: string) => {
    try {
      if (!id) {
        console.error('Document ID is undefined');
        alert('Failed to update: Missing document ID');
        return;
      }
      const studentDocRef = doc(db, "studentlist", id);
      const studentDoc = await getDoc(studentDocRef);

      if (studentDoc.exists()) {
        console.log("Student Data:", studentDoc.data());
        // Reset the form fields with the fetched data
        reset(studentDoc.data() as FormInputs);
      } else {
        console.log("No student found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  },[reset]);
  const {id}=useParams<{ id: string }>();
  useEffect(() => {
    const studentId = id!; // Replace with the actual student ID you want to reset the form with
    if (!studentId) {
      console.error('Student ID is undefined');
      return;
    }
    console.log(studentId);
    fetchStudentData(studentId);
  }, [fetchStudentData,id]);
 
  
const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
        if (!id) {
            console.error('Document ID is undefined');
            alert('Failed to update: Missing document ID');
            return;
          }
      const docRef = doc(db, 'studentlist', id); // Get the document reference
      await updateDoc(docRef, {
        Name:data.Name,
        Class:data.Class,
        Section:data.Section,
        RollNumber:data.RollNumber,
        Gender:data.Gender,
        DateOfBirth:data.DateOfBirth,
        Address:data.Address,
        PhoneNumber:data.PhoneNumber,
        Hobbies:data.Hobbies,
        Country:data.Country,
        Email:data.Email,
        Password:data.Password
      });

      console.log('Document successfully updated!');
      alert('Record updated successfully!');
      navigate("/dashboard/studentpage");
    } catch (error) {
      console.error('Error updating document: ', error);
      alert('Failed to update record!');
    }
  };
  const handleCancel=()=>{
    navigate("/dashboard/studentpage");
  }
  return(
    <>
<div style={{maxWidth:"600px",backgroundColor:"#bbff99",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"380px",marginTop:"5px"}}>
 
<form onSubmit={handleSubmit(onSubmit)}>
<h1 style={{fontSize:"25px",textAlign:"center"}}>View Student Form</h1>
      {/* Name */}
      <div>
        <label htmlFor="Name">Student Name
        <input
          id="Name"
          type="text"
          {...register("Name",{required:{value:true,message:'Name is requiredx'},
            minLength:{value:3,message:'Minimum 3 Characters required'},
            maxLength:{value:10,message:'Maximum 10 Characters required'}})}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Name?.message}</p>
      </div>

      {/* Class */}
      <div>
        <label htmlFor="Class">Class
        <input
          id="Class"
          type="number"
          {...register("Class", { required: "Class is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Class?.message}</p>
      </div>

      {/* Section */}
      <div>
        <label htmlFor="Section">Section
        <input
          id="Section"
          type="text"
          {...register("Section", { required: "Section is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Section?.message}</p>
      </div>

      {/* RollNumber */}
      <div>
        <label htmlFor="RollNumber">Roll Number
        <input
          id="RollNumber"
          type="number"
          {...register("RollNumber", { required: "Roll Number is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.RollNumber?.message}</p>
      </div>

      {/* Gender (Radio) */}
      <div>
        <label htmlFor="Gender">Gender
        <div>
          <label htmlFor="Gender">
            <input
            id="Gender"
              type="radio"
              value="Male"
              {...register("Gender", { required: "Gender is required" })}
            />
            Male
          </label>
          <label htmlFor="Gender">
            <input
            id="Gender"
              type="radio"
              value="Female"
              {...register("Gender", { required: "Gender is required" })}
            />
            Female
          </label>
        </div>
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Gender?.message}</p>
      </div>

      {/* Date of Birth */}
      <div>
        <label htmlFor="DateOfBirth">Date of Birth
        <input
          id="DateOfBirth"
          type="date"
          {...register("DateOfBirth", { required: "Date of Birth is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.DateOfBirth?.message}</p>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="Address">Address
        <textarea
          id="Address"
          {...register("Address", { required: "Address is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Address?.message}</p>
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="PhoneNumber">Phone Number
        <input
          id="PhoneNumber"
          type="tel"
          {...register("PhoneNumber", { required: "Phone Number is required" })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.PhoneNumber?.message}</p>
      </div>

      {/* Hobbies (Checkbox) */}
      <div>
        <label htmlFor="Hobbies">Hobbies
        <div>
          <label htmlFor="Hobbies">
            <input
            id="Hobbies"
              type="checkbox"
              value="Reading"
              {...register("Hobbies")}
            />
            Reading
          </label>
          <label htmlFor="Hobbies">
            <input
            id="Hobbies"
              type="checkbox"
              value="Sports"
              {...register("Hobbies")}
            />
            Sports
          </label>
          <label htmlFor="Hobbies">
            <input
            id="Hobbies"
              type="checkbox"
              value="Music"
              {...register("Hobbies")}
            />
            Music
          </label>
        </div>
        </label>
      </div>

     
      {/* Country (Dropdown) */}
      <div>
        <label htmlFor="Country">Country
        <select
          id="Country"
          {...register("Country", { required: "Country is required" })}
        >
          <option value="">Select a country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Country?.message}</p>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="Email">Email
        <input
          id="Email"
          type="email"
          
          {...register("Email",{
            required:{value:true,message:'email is required'},
            pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,message:'Incorrect email format'}
        })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Email?.message}</p>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="Password">Password
        <input
          id="Password"
          type="password"
          {...register("Password", { required:{value:true,message: "Password is required"},
            pattern:{value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ ,message:"Incorrect email format"}}
          )}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Password?.message}</p>
      </div>

      {/* Submit Button */}
      <div style={{display:"flex",justifyContent:"space-evenly"}}>
      <button
        type="submit"
        style={{backgroundColor:"#669900",color:"white",padding:"10px 20px",fontSize:"16px",fontWeight:"bold"}}
        
      >
        Update
      </button>
        <button
        type="button"
        onClick={handleCancel}
        style={{backgroundColor:"black",color:"white",padding:"10px 20px",fontSize:"16px",fontWeight:"bold"}}
      >
        Cancel
      </button>
      </div>
    </form>
    </div>
    </>
  ) 
}
export default EditStudentForm;