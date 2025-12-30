const express = require("express")
const router = express.Router()
const pool = require("../Database/db") 

const createResponse = require("../Utils/Response")
const crypto_js = require("crypto-js")
const jwt = require("jsonwebtoken")
const SECRET = require("../Utils/config")

// to register student

router.post("/auth/login", (req, res) => {
    const { email, password } = req.body

    const hashedPassword = crypto_js.SHA256(password).toString()

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?"

    pool.query(sql, [email, hashedPassword], (error, data) => {

        if (error) {
            return res.send(createResponse(true, "Database error"))
        }

        if (data.length === 0) {
            return res.send(createResponse(true, "Invalid email or password"))
        }

        const payload = {
            email: data[0].email,
            role: data[0].role
        }

        const token = jwt.sign(payload, SECRET, { expiresIn: "1h" })

        res.send(createResponse(false, {
            email: data[0].email,
            token: token
        }))
    })
})

// get all active courses
router.get("/courses/all-active-courses",(req,res) => { 
    //logic may be wrong from database
    let sql = "Select * from courses where start_date > CURDATE()"

    pool.query(sql,(error,data) => {
        res.send(createResponse(error,data))
    })
})

module.exports = router