import express  from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {SignUpController,loginController} from "../controllers/userControllers.js"

const router=express.Router()
router.use(bodyParser.json())
router.post("/signUp",SignUpController)
router.post("/login",loginController)

export default router