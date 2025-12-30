const mysql2 = require("mysql2");
const crypto_js = require("crypto-js");

// Database configuration
const pool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "manager",
    database: "learning_platform"
});

// Admin credentials
const adminEmail = "admin@sunbeam.com";
const adminPassword = "admin123";

// Hash the password
const hashedPassword = crypto_js.SHA256(adminPassword).toString();

// Check if admin already exists
const checkAdminSql = "SELECT * FROM users WHERE email = ? AND role = 'admin'";

pool.query(checkAdminSql, [adminEmail], (err, results) => {
    if (err) {
        console.error("Database error:", err);
        process.exit(1);
    }

    if (results.length > 0) {
        // Admin exists, update password to ensure it's correct
        console.log("Admin user already exists! Updating password...");
        const updateAdminSql = "UPDATE users SET password = ? WHERE email = ? AND role = 'admin'";
        
        pool.query(updateAdminSql, [hashedPassword, adminEmail], (err, result) => {
            if (err) {
                console.error("Error updating admin password:", err);
                process.exit(1);
            }
            
            console.log("Admin password updated successfully!");
            console.log("Email:", adminEmail);
            console.log("Password:", adminPassword);
            console.log("\nYou can now login with these credentials.");
            process.exit(0);
        });
    } else {
        // Insert admin user
        const insertAdminSql = "INSERT INTO users (email, password, role) VALUES (?, ?, 'admin')";

        pool.query(insertAdminSql, [adminEmail, hashedPassword], (err, result) => {
            if (err) {
                console.error("Error creating admin:", err);
                process.exit(1);
            }

            console.log("Admin user created successfully!");
            console.log("Email:", adminEmail);
            console.log("Password:", adminPassword);
            console.log("\nYou can now login with these credentials.");
            process.exit(0);
        });
    }
});

