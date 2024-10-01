const jwt = require("jsonwebtoken");
const {JWT_SECRET}= require("../config/keys");
const isAuth = (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization && req.headers.authorization.split(" ");
    if(!authorization){
        res.code= 401;
        throw new Error("Authorization header is required");  // 401 Unauthorized Access- Denied
        // return res.status(401).json({ message: "Authorization header is required" }); // 401 Unauthorized Access-Denied
    }
    const token = authorization.length > 0 ? authorization[1] : null;
    if(token ){
        const payload = jwt.verify(token, JWT_SECRET);
        if(payload){
            req.user = {
                _id:payload._id,
                name: payload.name,
                email: payload.email,
                role: payload.role
            }
            next();
        }
        else{
            res.code= 401;
            throw new Error("Unauthorized");
        }
    }
    else{
        res.code= 401;
        throw new Error("Token is required");
    }
    
  } catch (e) {
    next(e);
  }
};


module.exports = isAuth;