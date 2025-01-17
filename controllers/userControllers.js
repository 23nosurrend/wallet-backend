import Users from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"






dotenv.config()

const SignUpController = async (req, res) => {
    try {
        const data = req.body
        const { Email, Username, Password } = req.body;


if (!Email || !Username || !Password) {
            return res.status(400).json({
                status: "Fail",
                data: {
                    message: "Email, Username, and Password are required",
                },
            });
        }
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(data.Password, salt);
        data.Password = hashedPassword

        const existinguser = await Users.findOne({ Email: data.Email })
        if (existinguser) {
           return  res.status(200).json({
                status:"Fail",
                data:{
                    message: "email already in use"
                }
                

            })

        }
        else {
            let userInfo = new Users({
                
                Email: data.Email,
                Username: data.Username,
                Password: data.Password
            });
           await userInfo.save();
           
          return res.status(200).json({
            status:"success",
            data:{
                 message:"User created successfully",
            }
           
           
          })
           

    
        }

    }

    catch (err) {
        console.log("some error:", err)
        return res.status(500).json({
            status:"error",
            message:"Internal server error"
        })
        
    }


}


const loginController=async(req,res)=>{
    try{ 
        const {Email,Password}=req.body
        // Check and see if pasword and email is provided
        if(!Email||!Password){
            return res.status(400).json({
                status:"fail",
                data:{
                     message:" Email and Password are required"
                }
               
            })
        }else{
            const user=await Users.findOne({Email})
            if(!user){
                return res.status(400).json({
                    status:"fail",
                    data:{
                         message:"The user doesn't exist"
                    }
                   
                })
            }else{
                // check if passowrd exist ,this will prevent unexpected behavior when passowrd is not a string
                if(typeof user.Password !== "string"){
                    return res.status(400).json({
                        status:"fail",
                        data:{
                             message:"invalid user credentials"
                        }
                       
                    })
                }else{
                    const userPassword=await bcrypt.compare(Password,user.Password)
                    if(userPassword){
                        const secret=process.env.secretKey 
                        if(!secret){
                            console.log("secret key not provided")
                            process.exit()
                        }
                       
                        const token=jwt.sign({email:Email},secret,{expiresIn:"1h"})
                        return res.status(200).json({
                            status:"success",
                            data:{
                                 message:"Login successfully",
                                 token:token
                            }
                           
                        })
                    }else{
                        return res.status(400).json({
                            status:"fail",
                            data:{
                                 message:"incorrect credentials"
                            }

                           
                        })
                    }

                }
                
            }
        }

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:"error",
            data:{
                message:"Internal Server error"
            }
            
        })

    }
   
}


export  {SignUpController,loginController}


