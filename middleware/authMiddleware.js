import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from "dotenv"

dotenv.config()
const secretKey='@@Key'

const auth = async (req, res, next) => {
  try {
  
      const authHeader = req.headers["authorization"];
      console.log("Authorization Header:", req.headers["authorization"])
      const token=authHeader.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No auth token provided' });
      }
     

   
      const decoded = jwt.verify(token, process.env.secretKey);
      console.log("this  decoded:", decoded);
    
    
    const user = await User.findOne({ Email: decoded.email });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    
    req.user = user;
    next();
  } catch (error) {
      console.log(error)
     
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export default auth;