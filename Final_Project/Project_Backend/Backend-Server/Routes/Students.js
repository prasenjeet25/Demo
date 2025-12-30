const express = require("express")
const router = express.Router()
const pool = require("../Database/db")
const createResponse = require("../Utils/Response")
const crypto_js = require("crypto-js")

router.post("/student/register-to-course", (req, res) => {
    const { courseId, email, name, mobileNo } = req.body

    // basic validation
    if (!courseId || !email || !name || !mobileNo) {
        return res.send(createResponse(true, "All fields are required"))
    }

    // 1️⃣ Check if user exists
    const checkUserSql = "SELECT * FROM users WHERE email = ?"

    pool.query(checkUserSql, [email], (err, users) => {

        if (err) {
            return res.send(createResponse(true, "Database error"))
        }

        // function to insert student (reuse)
        const insertStudent = () => {
            const insertStudentSql =
                "INSERT INTO students (name, email, course_id, mobile_no) VALUES (?, ?, ?, ?)"

            pool.query(
                insertStudentSql,
                [name, email, courseId, mobileNo],
                (err, result) => {
                    if (err) {
                        return res.send(createResponse(true, "Student registration failed"))
                    }
                    res.send(createResponse(false, "Student registered successfully"))
                }
            )
        }

        // 2️⃣ If user exists → UPDATE role
        if (users.length > 0) {
            const updateUserSql = "UPDATE users SET role = 'student' WHERE email = ?"

            pool.query(updateUserSql, [email], (err) => {
                if (err) {
                    return res.send(createResponse(true, "User update failed"))
                }
                insertStudent()
            })
        }

        // 3️⃣ If user does NOT exist → INSERT user
        else {
            const password = crypto_js.SHA256("Sunbeam").toString()
            const insertUserSql =
                "INSERT INTO users (email, password, role) VALUES (?, ?, 'student')"

            pool.query(insertUserSql, [email, password], (err) => {
                if (err) {
                    return res.send(createResponse(true, "User creation failed"))
                }
                insertStudent()
            })
        }
    })
})

//change password
router.put("/student/change-password",(req,res) => {
 const email = req.user.email
 const {newPassword,confirmPassword} = req.body

 if(newPassword !== confirmPassword)
 {
    res.send("Password not matched ....")
    return
 }

 hashedPassword = crypto_js.SHA256(newPassword).toString()

 let sql = "Update users SET password = ? where email = ? "

 pool.query(sql,[hashedPassword,email],(error,data) => {
  res.send(createResponse(error,data))
 })
})

// get all registrated course of student
router.get("/student/my-courses",(req,res) => {
    const email = req.user.email
    
    let sql = "Select c.* from students s Inner Join courses c on s.course_id = c.course_id where s.email = ?"
    
    pool.query(sql,[email],(error,data) => {
        res.send(createResponse(error,data))
    })
})

// get all with videos
router.get("/student/my-courses-with-videos",(req,res) => {
    const email = req.user.email

    let sql = "Select c.*,v.video_id,v.title,v.description,v.youtube_url,v.added_at from students s Inner Join courses c on s.course_id = c.course_id LEFT join videos v on c.course_id = v.course_id where s.email = ?"

    pool.query(sql,[email],(error,data) => {
        res.send(createResponse(error,data))
    })
})

module.exports = router