const jwt = require("jsonwebtoken")
const User = require('../models/user')

const protected = async (req, res, next) => {
    try {
        
        let token
         const authHeader = req.headers.authorization;
         if (authHeader && authHeader.startsWith("Bearer ")) {
           token = authHeader.split(" ")[1];
         } else {
           token = req.cookies.jwt;
         }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.id);
          if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized access" }); 
    }
}

module.exports = {
    protected
}