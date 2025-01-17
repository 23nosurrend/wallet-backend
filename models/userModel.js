import mongoose from "mongoose"

const signUpschema=new mongoose.Schema({
 
 Email:{
    type:String,
    required:"Email is required"
 },
 Username:{
    type:String,
    
    
    
 },
 Password:{
    type:String,
    required:"This is required"
    
 }


})

export default mongoose.model("users",signUpschema)