import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => 
    api.post('/public/auth/login', { email, password }),
};

export const coursesAPI = {
  getAllActiveCourses: () => 
    api.get('/public/courses/all-active-courses'),
  
  registerToCourse: (courseId, email, name, mobileNo) => 
    api.post('/students/student/register-to-course', { 
      courseId, 
      email, 
      name, 
      mobileNo 
    }),
  
  getMyCourses: () => 
    api.get('/students/student/my-courses'),
  
  getMyCoursesWithVideos: () => 
    api.get('/students/student/my-courses-with-videos'),
  
  changePassword: (newPassword, confirmPassword) => 
    api.put('/students/student/change-password', { 
      newPassword, 
      confirmPassword 
    }),
};

export const adminAPI = {
  // Courses
  getAllCourses: (startDate = null, endDate = null) => 
    api.get('/admin/course/all-courses', { 
      params: startDate && endDate ? { start_date: startDate, end_date: endDate } : {} 
    }),
  
  addCourse: (courseName, desc, fees, startDate, endDate, videoExpireDays) => 
    api.post('/admin/course/add', {
      courseName,
      desc,
      fees,
      startDate,
      endDate,
      videoExpireDays
    }),
  
  updateCourse: (courseId, courseName, desc, fees, startDate, endDate, videoExpireDays) => 
    api.put(`/admin/course/update/${courseId}`, {
      courseName,
      desc,
      fees,
      startDate,
      endDate,
      videoExpireDays
    }),
  
  deleteCourse: (courseId) => 
    api.delete(`/admin/course/delete/${courseId}`),
  
  // Videos
  getAllVideos: (courseId = null) => 
    api.get('/admin/video/all-videos', { 
      params: courseId ? { courseId } : {} 
    }),
  
  addVideo: (courseId, title, desc, youtubeURL) => 
    api.post('/admin/video/add', {
      courseId,
      title,
      desc,
      youtubeURL
    }),
  
  updateVideo: (videoId, courseId, title, desc, youtubeURL) => 
    api.put(`/admin/video/update/${videoId}`, {
      courseId,
      title,
      desc,
      youtubeURL
    }),
  
  deleteVideo: (videoId) => 
    api.delete(`/admin/video/delete/${videoId}`),
  
  // Students
  getEnrolledStudents: (courseId = null) => 
    api.get('/admin/enrolled-students', { 
      params: courseId ? { courseId } : {} 
    }),
  
  // Change password (can be used by both admin and student)
  changePassword: (newPassword, confirmPassword) => 
    api.put('/students/student/change-password', { 
      newPassword, 
      confirmPassword 
    }),
};

export default api;

