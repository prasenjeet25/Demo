DROP DATABASE learning_platform;

CREATE DATABASE IF NOT EXISTS learning_platform;
USE learning_platform;


CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    fees INT,
    start_date DATE,
    end_date DATE,
    video_expire_days INT
);


CREATE TABLE users (
    email VARCHAR(100) PRIMARY KEY,
    password VARCHAR(255),
    role ENUM('admin','student')
);

CREATE TABLE students (
    reg_no INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    course_id INT,
    mobile_no VARCHAR(15),
    profile_pic VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE videos (
    video_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id INT,
    title VARCHAR(150),
    description VARCHAR(255),
    youtube_url VARCHAR(255),
    added_at DATE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);


INSERT INTO courses VALUES
(1,'Java Full Stack','Java + Spring + MySQL',15000,'2025-01-01','2025-06-01',180),
(2,'Python ML','Python with Machine Learning',18000,'2025-02-01','2025-07-01',200),
(3,'Data Structures','DSA using Java',12000,'2025-01-15','2025-05-15',150),
(4,'DBA','Database mgt .',40000,'2026-01-01','2026-02-01',60),
(5,'AI Basics','Intro to Artificial Intelligence',20000,'2025-04-01','2025-09-01',240),
(6,'Mern','Web development using MERN.',40000,'2026-01-01','2026-02-01',60),
(7,'Python web Programming','Frontend + Backend + python',4000,'2025-01-02','2025-01-02',70),
(8,'Cyber Security','Networking Concepts',4000,'2026-02-02','2026-02-02',60),
(10,'Android App Development','Java + Kotlin',4000,'2026-01-04','2025-02-04',50),
(11,'Data Science','ANN + Machine learning+ python',4000,'2026-01-03','2026-02-03',50),
(12,'Java programming','Java + Spring + MySQL',4000,'2026-01-05','2026-02-05',50);


INSERT INTO users VALUES
('a12@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student'),
('admin@sunbeam.com','240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9','admin'),
('anita@gmail.com','anita123','student'),
('navin@gmail.com','navin123','student'),
('om@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student'),
('priya@gmail.com','priya123','student'),
('rahul@gmail.com','rahul123','student'),
('rushi123@gmail.com','6c8135241e0d3d87f97a4bb257d7e076689ad8a61390ced0231d0108b370fd2c','student'),
('s@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student'),
('student1@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student'),
('vision@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student'),
('vision123@gmail.com','eee8a35cddba58267c1476890c506698c9548e2e63586a9f98c9ec8252e826f6','student');

INSERT INTO students VALUES
(1,'Navin Karavade','navin@gmail.com',1,'9356771234',NULL),
(2,'Rahul Patil','rahul@gmail.com',2,'9876543210',NULL),
(3,'Priya Sharma','priya@gmail.com',3,'9123456780',NULL),
(4,'Anita Deshmukh','anita@gmail.com',4,'9988776655',NULL),
(6,'Rushikesh','rushi123@gmail.com',4,'7822973489',NULL),
(8,'Shriyash','s@gmail.com',NULL,NULL,NULL),
(9,'Navnath','vision@gmail.com',NULL,NULL,NULL),
(10,'Atharv Niprul','a12@gmail.com',NULL,NULL,NULL),
(11,'Rushikesh','rushi123@gmail.com',4,'7822973489',NULL),
(12,'Amit','student1@gmail.com',1,'9876543210',NULL),
(13,'om','om@gmail.com',4,'9656859658',NULL),
(14,'om','om@gmail.com',6,'9656859658',NULL),
(15,'Navin Karavade','navin@gmail.com',10,'9356771234',NULL),
(16,'Navnath','vision123@gmail.com',11,'1234567890',NULL),
(17,'Rushi','rushi123@gmail.com',6,'7822973489',NULL),
(18,'Om Ganajanan Anantpure','om@gmail.com',11,'8177902737',NULL),
(19,'Omkar','om@gmail.com',8,'8177902737',NULL),
(20,'Nilesh','vision@gmail.com',11,'4455667788',NULL),
(21,'Nilesh','vision@gmail.com',8,'4455667788',NULL),
(22,'Om','om@gmail.com',6,'1122334455',NULL),
(23,'Omkar','om@gmail.com',6,'1122336699',NULL),
(24,'om','om@gmail.com',8,'1122336699',NULL),
(25,'om','om@gmail.com',6,'1122336699',NULL),
(26,'om','om@gmail.com',8,'1122336699',NULL),
(27,'Navnath','vision123@gmail.com',12,'1234567890',NULL),
(28,'Vision','vision@gmail.com',10,'1234567890',NULL);


INSERT INTO videos VALUES
(1,1,'Introduction to Java','Basics of Java Programming','https://youtube.com/java-intro','2025-12-23'),
(2,4,'changed Video title','changed video desc','http://youtube.com/updated','2025-12-23'),
(3,3,'Arrays in DSA','Array concepts in Java','https://youtube.com/dsa-arrays','2025-12-23'),
(4,4,'HTML Basics','Intro to HTML','https://youtube.com/html-basics','2025-12-23'),
(5,5,'What is AI?','AI fundamentals','https://youtube.com/ai-basics','2025-12-23'),
(6,4,'Video title','video desc','http://youtube.com','2025-12-23'),
(7,2,'Python for ML Introduction','Overview of Machine Learning with Python','https://youtube.com/python-ml-intro','2025-12-29'),
(8,2,'NumPy Basics','Numerical computing with NumPy','https://youtube.com/numpy-basics','2025-12-29'),
(9,6,'MERN Stack Overview','Introduction to MERN stack','https://youtube.com/mern-overview','2025-12-29'),
(10,6,'React Basics','Introduction to React JS','https://youtube.com/react-basics','2025-12-29'),
(11,7,'Python Web Development Intro','Web development using Python','https://youtube.com/python-web-intro','2025-12-29'),
(12,7,'Flask Basics','Introduction to Flask framework','https://youtube.com/flask-basics','2025-12-29'),
(13,8,'Cyber Security Fundamentals','Basic concepts of cyber security','https://youtube.com/cyber-security-basics','2025-12-29'),
(14,8,'Networking Basics','Understanding networking concepts','https://youtube.com/networking-basics','2025-12-29'),
(15,10,'Android Development Intro','Introduction to Android apps','https://youtube.com/android-intro','2025-12-29'),
(16,10,'Kotlin Basics','Getting started with Kotlin','https://youtube.com/kotlin-basics','2025-12-29'),
(17,11,'Data Science Overview','Introduction to Data Science','https://youtube.com/data-science-intro','2025-12-29'),
(18,11,'Machine Learning Basics','Fundamentals of machine learning','https://youtube.com/ml-basics','2025-12-29'),
(19,12,'Java Programming Introduction','Core Java concepts','https://youtube.com/java-programming-intro','2025-12-29'),
(20,12,'OOP in Java','Object Oriented Programming concepts','https://youtube.com/java-oop','2025-12-29');




