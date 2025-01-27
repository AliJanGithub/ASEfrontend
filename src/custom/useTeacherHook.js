
import { URL } from "../constant";

const useTeacherHook=()=>{

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
             // Reset the form
          }
        } catch (error) {
          console.error("Registration error:", error);
          alert("Something went wrong. Please try again.");
        }
      };



      return {submitForm}
}
export default useTeacherHook