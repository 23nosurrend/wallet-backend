import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";
import user from './routes/userRoute.js'

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // THis will help us to access data from form

 app.use("/admin",user)




const connectToMongoDb = () => {
    mongoose.connect(process.env.MONGOPASS)
        .then(() => {
            console.log("database connected succesfully");
        }).catch((err) => {
            console.log("failed to connect to the database", err)
        })
}
const port = 5500;
app.listen(port, () => {
    console.log('server is running on port' + port)
    connectToMongoDb();
});








app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true })); // THis will help us to access data from form






