
import { useState } from "react";
import { URL } from "../constant";

const useTeacherHook=()=>{
const [less,setLess]=useState(false)
    const submitForm = async (initialState) => {
        

        try {

          const response = await fetch(`${URL}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(initialState),
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || "Registration failed"}`);
            return;
          }
    
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Teacher registered successfully!");
            console.log(data.token);
            setLess(true)
             // Reset the form
          }
        } catch (error) {
          console.error("Registration error:", error);
          alert("Something went wrong. Please try again.");
        }
      };



      return {submitForm,less}
}
export default useTeacherHook