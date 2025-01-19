import mongoose from "mongoose"

const budgetSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true,
    unique: true,
  },
  userEmail: {
        type: String,
    required: true   
  },
  amount: {
    type: Number,
    required: true
  },
 
  
});

export default mongoose.model('budgets',budgetSchema)