
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req,res,next) => {
    try{
      const token = req.headers.authorization.split(" ")[1];
      if(!token){
        return res.status(400).json({
            success: "false",
            message: "please provide the token",
        })
      }
      try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
      } catch(error){
        console.log(error);
        return res.status(403).json({
            success: "false",
            message: "token is invalid",
        })
      }
      next();
    } catch(error){
        console.log(error);
        return res.status(403).json({
            success: "false",
            message: "user is not verified token invalid",
        })

    }
}

exports.admin = (req,res,next) => {
    try{
      if(req.user.role== !"admin"){
        return res.status(401).json({
            success: "true",
            message: "protected route admin role can create the product"
        })
      }
    } catch(error){
        console.log(error);
        return res.status(403).json({
            success: "false",
            message: "user is not authorized to create the product"
        })
    }
}