1.Create Database

CREATE DATABASE learning_platform;
USE learning_platform;

--------------------------------------
2.Create User 
CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'student') NOT NULL
);
--------------------------------------
3.Create courses

CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);
----------------------------------------
4.Create students

CREATE TABLE students (
    reg_no INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    course_id INT,
    mobile_no BIGINT,
    profile_pic BLOB,
    FOREIGN KEY (email) REFERENCES users(email),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
-------------------------------
5.Create videos 
CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(150),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at DATE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);
----------------------------------------
INSERT INTO users VALUES
('admin@gmail.com', 'admin123', 'admin'),
('navin@gmail.com', 'navin123', 'student'),
('rahul@gmail.com', 'rahul123', 'student'),
('priya@gmail.com', 'priya123', 'student'),
('anita@gmail.com', 'anita123', 'student');


INSERT INTO courses 
(course_name, description, fees, start_date, end_date, video_expire_days)
VALUES
('Java Full Stack', 'Java + Spring + MySQL', 15000, '2025-01-01', '2025-06-01', 180),
('Python ML', 'Python with Machine Learning', 18000, '2025-02-01', '2025-07-01', 200),
('Data Structures', 'DSA using Java', 12000, '2025-01-15', '2025-05-15', 150),
('Web Development', 'HTML CSS JS React', 10000, '2025-03-01', '2025-08-01', 210),
('AI Basics', 'Intro to Artificial Intelligence', 20000, '2025-04-01', '2025-09-01', 240);


INSERT INTO students 
(name, email, course_id, mobile_no, profile_pic)
VALUES
('Navin Karavade', 'navin@gmail.com', 1, 9356771234, NULL),
('Rahul Patil', 'rahul@gmail.com', 2, 9876543210, NULL),
('Priya Sharma', 'priya@gmail.com', 3, 9123456780, NULL),
('Anita Deshmukh', 'anita@gmail.com', 4, 9988776655, NULL),
('Karan Joshi', 'admin@gmail.com', 5, 9090909090, NULL);


INSERT INTO videos
(course_id, title, description, youtube_url, added_at)
VALUES
(1, 'Introduction to Java', 'Basics of Java Programming',
 'https://youtube.com/java-intro', CURDATE()),

(2, 'Python for ML', 'Python basics for ML',
 'https://youtube.com/python-ml', CURDATE()),

(3, 'Arrays in DSA', 'Array concepts in Java',
 'https://youtube.com/dsa-arrays', CURDATE()),

(4, 'HTML Basics', 'Intro to HTML',
 'https://youtube.com/html-basics', CURDATE()),

(5, 'What is AI?', 'AI fundamentals',
 'https://youtube.com/ai-basics', CURDATE());


