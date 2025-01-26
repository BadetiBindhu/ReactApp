/* eslint-disable react/prop-types */

import {SubmitHandler, useForm} from 'react-hook-form';
import { collection, addDoc } from "firebase/firestore";
import {db} from "src/firestore";
import { useNavigate } from 'react-router-dom';

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
function StudentForm(){
  const {register,handleSubmit,formState:{errors},watch,reset}=useForm<FormInputs>();
  const navigate=useNavigate();
 
  // Function to handle form submission
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      // Add form data to Firestore
      await addDoc(collection(db, "studentlist"), data);
      console.log("Document successfully written:", data);
      alert("Successfully added");
      navigate("/dashboard/studentpage");
      // Reset the form after submission
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleCancel=()=>{
    navigate("/dashboard/studentpage");
  }
  return(
    <>
<div style={{maxWidth:"600px",backgroundColor:"#bfbfbf",display:"flex",justifyContent:"center",alignItems:"center",marginLeft:"380px",marginTop:"5px"}}>
 
<form onSubmit={handleSubmit(onSubmit)}>
<h1 style={{fontSize:"25px",textAlign:"center"}}>Add Student Form</h1>
      {/* Name */}
      <div>
        <label htmlFor="Name" >Student Name
        <input
          id="Name"
          type="text"
          {...register("Name",{required:{value:true,message:'Name is requiredx'},
            minLength:{value:3,message:'Minimum 3 Characters required'},
            maxLength:{value:10,message:'Maximum 15 Characters required'}})}
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
          {...register("Class", { required: "Class is required",valueAsNumber: true  })}
        />
        </label>
        <p style={{color:"red",fontSize:"14px"}}>{errors.Class?.message}</p>
      </div>

      {/* Section */}
      <div className="mb-4">
        <label htmlFor="Section" >Section
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
          {...register("RollNumber", { required: "Roll Number is required" ,valueAsNumber: true })}
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
        <label htmlFor="Email" >Email
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
      <div className="mb-4">
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
        Submit
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
export default StudentForm;