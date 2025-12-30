const jwt = require("jsonwebtoken")
const SECRET = require("./config")

function authenticationUser(req,res,next)
{
    if(req.url==="/student/register-to-course")
    {
       next()
    }
    else{

    
    let token = req.headers.token
    if(!token)
    {
        return res.send("Token is missing .....")
    }
    try{
        const payload = jwt.verify(token,SECRET)

        req.user = {
            email:payload.email,
            role:payload.role
        }

        return next()
    }catch(ex)
    {
        return res.send("Invalid Token ....")
    }
}

}

function authorizeUserRole(req,res,next)
{
    if(req.user.role === "admin")
    {
        return next()
    }
    else
    {
        return res.send("You need permission to access this path ......")
    }
}

module.exports = {authenticationUser,authorizeUserRole}