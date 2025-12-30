const mysql2 = require("mysql2");

const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "manager",
    database: "learning_platform"
});

// Check admin users
const sql = "SELECT email, role FROM users WHERE role = 'admin' OR role = 'Admin'";

pool.query(sql, [], (err, results) => {
    if (err) {
        console.error("Database error:", err);
        process.exit(1);
    }

    console.log("Admin users in database:");
    console.log("==========================");
    if (results.length === 0) {
        console.log("No admin users found!");
        console.log("\nTo create an admin user, run: node create-admin.js");
    } else {
        results.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}, Role: ${user.role}`);
        });
    }
    process.exit(0);
});

