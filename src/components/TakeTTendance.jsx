import React, { useState, useEffect } from "react";
import useStudent from "../custom/useStudent";
import { useNavigate } from "react-router-dom";

export default function TakeAttendance() {
  const { getStudents, users, attendanceFunc } = useStudent();
  const [attendanceStatus, setAttendanceStatus] = useState({}); // Track attendance status for each student
  const [selectedDate, setSelectedDate] = useState(""); // Track the selected date
  const [isDateSet, setIsDateSet] = useState(false); // Ensure the date is set once
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return alert("Please enter a token");
      }
      await getStudents(token);
    };
    fetchStudents();
  }, []);

  const handleAttendance = async (studentId, status) => {
    if (!studentId) {
      return alert("Invalid Student ID");
    }

    if (!selectedDate) {
      return alert("Please select a date before marking attendance.");
    }

    const token = localStorage.getItem("token");
    try {
      // Mark attendance for the student with the selected date
      await attendanceFunc(token, status, studentId, selectedDate);

      // Update the state to mark the student as having their attendance set
      setAttendanceStatus((prev) => ({
        ...prev,
        [studentId]: { status, marked: true }, // Mark the student as 'Present' or 'Absent' and set as marked
      }));
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("Failed to mark attendance. Please try again.");
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSetDate = () => {
    if (!selectedDate) {
      return alert("Please select a valid date.");
    }
    setIsDateSet(true); // Lock the date after setting it
  };

  const handleSubmit = async () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
          Mark Attendance
        </h2>

        {/* Date Selection */}
        {!isDateSet && (
          <div className="mb-6 text-center">
            <label className="block text-gray-700 font-medium mb-2">
              Select Date for Attendance
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSetDate}
              className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
            >
              Set Date
            </button>
          </div>
        )}

        {/* Attendance Table */}
        {isDateSet && (
          <div className="space-y-4">
            {users.length > 0 ? (
              users.map((student) => (
                <div
                  key={student._id}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">
                      Roll No: {student.rollNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      Teacher Id: {student.teacherId}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Present Button */}
                    <button
                      className={`${
                        attendanceStatus[student._id]?.marked
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white px-3 py-2 rounded-lg shadow`}
                      onClick={() => handleAttendance(student._id, "Present")}
                      disabled={attendanceStatus[student._id]?.marked}
                    >
                      Present
                    </button>
                    {/* Absent Button */}
                    <button
                      className={`${
                        attendanceStatus[student._id]?.marked
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      } text-white px-3 py-2 rounded-lg shadow`}
                      onClick={() => handleAttendance(student._id, "Absent")}
                      disabled={attendanceStatus[student._id]?.marked}
                    >
                      Absent
                    </button>
                    {/* Checkbox */}
                    <input
  type="checkbox"
  className="hidden"
  checked={attendanceStatus[student._id]?.marked || false}
  readOnly // Checkbox state cannot be changed manually
/>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 font-medium">
                No students are registered.
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mt-6">
          {/* {
            users.length > 0 ?<button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isDateSet} // Disable until the date is set
          >
           Go To Home
          </button> : null
          } */}
          
        </div>
      </div>
    </div>
  );
}
