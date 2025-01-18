import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors"
import dotenv from "dotenv";
import user from './routes/userRoute.js'
import budget from "./routes/budgetRoute.js"
import bank from "./routes/bankRoute.js"
import cash from "./routes/cashRoute.js"
import momo from "./routes/momoRoute.js"


dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })); // THis will help us to access data from form

app.use("/admin", user)
app.use("/budget", budget)
app.use("/bank", bank)
app.use("/cash", cash)
app.use("/momo",momo)




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






