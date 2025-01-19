
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    walletType: {
        type: String,
        enum: ['cash', 'momo'],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['debit', 'credit'],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    balanceAfterTransaction: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('Transaction', transactionSchema);