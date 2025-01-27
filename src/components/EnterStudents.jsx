import React from "react";
import useRegister from "../custom/useRegister";
import useStudent from "../custom/useStudent";
import { useNavigate, useNavigation } from "react-router-dom";
export default function EnterStudents() {
  const { teacher, formHandler } = useRegister({
    name: "",
    rollNumber: "",
   
  });

  const navigate=useNavigate()
   const {addStudent}=useStudent()
  
    const handleSubmit =async (e) => {
  e.preventDefault();
      if (!teacher.name || !teacher.rollNumber ) {
        alert("Please fill in all fields!");
      } else {
        const token=localStorage.getItem('token');
        await addStudent(teacher,token)
        console.log("Student Details:", teacher);
     navigate("/attendance")
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            Enter Student Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter student's name"
                onChange={formHandler}
                value={teacher.name}
              />
            </div>
  
            {/* Roll Number Field */}
            <div>
              <label
                htmlFor="rollNumber"
                className="block text-gray-700 font-medium"
              >
                Roll Number
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter roll number"
                onChange={formHandler}
                value={teacher.rollNumber}
              />
            </div>
  
            {/* Teacher ID Field */}
            {/* <div>
              <label
                htmlFor="teacherId"
                className="block text-gray-700 font-medium"
              >
                Teacher ID
              </label>
              <input
                type="text"
                id="teacherId"
                name="teacherId"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter teacher ID"
                onChange={handleInputChange}
              />
            </div> */}
  
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  