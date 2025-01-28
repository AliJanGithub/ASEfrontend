import { useState } from "react";
import { URL } from "../constant";

const useStudent = () => {
    const [users,setUsers]=useState([])
  const addStudent = async (initialState, token) => {
    try {
      const response = await fetch(`${URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add the token here
        },
        body: JSON.stringify(initialState),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Registration of student failed"}`);
        return;
      }

      const data = await response.json();
      if (data) {
        alert(`Student ${data.name} registered successfully!`);
        console.log(data);
        // Reset the form
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };




  const getStudents=async(token)=>{
    try {
        const response = await fetch(`${URL}/get`, {
          method: "GET",
          headers: {
           
            "Authorization": `Bearer ${token}`, // Add the token here
          }
        
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          alert(`Error: ${errorData.error || "issue in hitting api"}`);
          return;
        }
  
        const data = await response.json();
        setUsers(data.student)
        if (data) {
          console.log(data);
         
        }
      } catch (error) {
        console.error(" error:", error);
        alert("Something went wrong. Please try again.");
      }
  }
  const attendanceFunc = async (token, status,studentId) => {
    console.log(token, status, studentId)
    try {
      const response = await fetch(`${URL}/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify( {status,studentId} ),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to mark attendance"}`);
        return;
      }

      const data = await response.json();
      alert("Attendance marked successfully!");
      console.log("Attendance response:", data);
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return { addStudent,getStudents,users,attendanceFunc };
};

export default useStudent;
