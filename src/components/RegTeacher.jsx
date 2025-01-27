import React from "react";
import useRegister from "../custom/useRegister";
import useTeacherHook from "../custom/useTeacherHook";
import { useNavigate } from "react-router-dom";

export default function RegTeacher() {
 const {submitForm}= useTeacherHook()
 const navigate=useNavigate()
  const { teacher, formHandler } = useRegister({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async() => {
    if (!teacher.name || !teacher.email || !teacher.password) {
      return alert("Please fill in all fields");
    } else {
     await submitForm(teacher)
    navigate("/")
      console.log(teacher);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Register Teacher</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={teacher.name}
              onChange={formHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={teacher.email}
              onChange={formHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={teacher.password}
              onChange={formHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register Teacher
          </button>
        </form>
      </div>
    </div>
  );
}
