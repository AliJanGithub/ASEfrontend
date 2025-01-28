import React, { useState, useEffect } from "react";
import { URL } from "../constant";
import * as XLSX from "xlsx";

export default function GetStudents() {
  const [students, setStudents] = useState([]);
  const [sortedAsc, setSortedAsc] = useState(true);

  const getStudents = async () => {
    try {
      const response = await fetch(`${URL}/getStudents`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      alert("Failed to load data. Please try again later.");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const sortStudents = () => {
    const sorted = [...students].sort((a, b) => {
      return sortedAsc
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });
    setStudents(sorted);
    setSortedAsc(!sortedAsc);
  };

  const groupByDate = (data) => {
    return data.reduce((acc, record) => {
      const dateKey = new Date(record.date).toLocaleDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(record);
      return acc;
    }, {});
  };

  const downloadExcel = () => {
    const formattedData = students.map((record) => ({
      "Student Name": record.studentId.name,
      "Roll No": record.studentId.rollNumber,
      "Teacher ID": record.teacherId,
      "Date": new Date(record.date).toLocaleString(),
      "Status": record.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "Students_List.xlsx");
  };

  const groupedStudents = groupByDate(students);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Attendance Records
        </h1>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={sortStudents}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700"
          >
            Sort by Date ({sortedAsc ? "Ascending" : "Descending"})
          </button>
          <button
            onClick={downloadExcel}
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
          >
            Download Excel
          </button>
        </div>
        {students.length > 0 ? (
          Object.keys(groupedStudents).map((date) => (
            <div key={date} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {date}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedStudents[date].map((record) => (
                  <div
                    key={record._id}
                    className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
                  >
                    <div className="mb-4">
                      <p className="text-gray-800 font-medium">
                        <span className="text-blue-600">Student Name:</span>{" "}
                        {record.studentId.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Roll No:</span>{" "}
                        {record.studentId.rollNumber}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Teacher ID:</span>{" "}
                        {record.teacherId}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-600">
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(record.date).toLocaleString()}
                      </p>
                      <p
                        className={`font-medium ${
                          record.status === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        <span className="text-gray-800">Status:</span>{" "}
                        {record.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No attendance records found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
