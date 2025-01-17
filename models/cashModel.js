import mongoose from "mongoose"

const cashSchema = new mongoose.Schema({
  userEmail: {
        type: String,
    required: true   // Ensures one budget per user
  },
  amount: {
    type: Number,
    required: true
  },
 
  
});

export default mongoose.model('cash',cashSchema)