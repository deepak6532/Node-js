import React, { useEffect, useState } from 'react';
// import courseimage from '../assets/courseimage.jpg'; // Uncomment if you have an image file
import { useParams } from 'react-router-dom';


const image =  "https://img.freepik.com/free-vector/online-courses-elearning-vector-background-online-courses-text-white-desk-with-laptop-computer_572288-1763.jpg?w=2000"

const Course_All = () => {
  const [courses, setCourse] = useState([]);
  const token = localStorage.getItem('Token');
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      if (!token) {
        alert('User not authenticated');
        return;
      }

      try {
        const response = await fetch('http://localhost:8082/course/getcourse', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log(">>>>data", data);

        setCourse(data.result);

      }
       catch (err) {
        console.error('Error fetching courses:', err);
        alert('Failed to fetch courses');
      }
    };

    fetchCourse();
  }, [token, id]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">All Courses</h1>

      {courses.length === 0 ? (
        <p className="text-center">No Course found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border border-gray-300 flex flex-col items-center"
            >
              <img
                src={image} 
                alt={course.name}
                className="w-32 h-32 object-fit rounded-full mb-4"
              />
              <h2 className="text-lg font-bold">Name: {course.name}</h2>
              
              <p className="text-red-800 font-semibold">Added by: {course.emp_id.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Course_All;
