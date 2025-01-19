import Cash from '../models/cashModel.js';
import Momo from '../models/momoModel.js';
import Budget from '../models/userBudgetModel.js';
import Transaction from '../models/transactionModel.js';

const createTransaction = async (req, res) => {
    try {
        const { walletType, amount } = req.body;
        const userEmail = req.user.Email;

       
        if (!walletType || !['cash', 'momo'].includes(walletType.toLowerCase())) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "Please provide a valid wallet type (cash or momo)"
                }
            });
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "Please provide a valid positive amount"
                }
            });
        }

        
        const budget = await Budget.findOne({ userEmail });
        const wallet = walletType.toLowerCase() === 'cash' 
            ? await Cash.findOne({ userEmail })
            : await Momo.findOne({ userEmail });

        if (!wallet || !budget) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: `${!wallet ? 'Wallet' : 'Budget'} not found`
                }
            });
        }

        
        if (wallet.amount < amount) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: `Insufficient funds in ${walletType} wallet`
                }
            });
        }

        if (budget.amount < amount) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "Insufficient budget"
                }
            });
        }

       
        const session = await Cash.startSession();
        session.startTransaction();

        try {
          
            const WalletModel = walletType.toLowerCase() === 'cash' ? Cash : Momo;
            const updatedWallet = await WalletModel.findOneAndUpdate(
                { userEmail },
                { $inc: { amount: -amount } },
                { new: true, session }
            );

         
            const updatedBudget = await Budget.findOneAndUpdate(
                { userEmail },
                { $inc: { amount: -amount } },
                { new: true, session }
            );

            
            const transaction = await Transaction.create([{
                userEmail,
                walletType: walletType.toLowerCase(),
                amount,
                type: 'debit',
                timestamp: new Date(),
                balanceAfterTransaction: updatedWallet.amount
            }], { session });

            await session.commitTransaction();

            return res.status(200).json({
                status: "success",
                data: {
                    message: "Transaction completed successfully",
                    transaction: transaction[0],
                    updatedWalletBalance: updatedWallet.amount,
                    updatedBudgetBalance: updatedBudget.amount
                }
            });

        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }

    } catch (error) {
        console.error("Transaction error:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};

const getTransactionHistory = async (req, res) => {
    try {
        const userEmail = req.user.Email;
        const transactions = await Transaction.find({ userEmail })
            .sort({ timestamp: -1 })
            .limit(10); 

        return res.status(200).json({
            status: "success",
            data: {
                transactions
            }
        });
    } catch (error) {
        console.error("Error fetching transaction history:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};

export { createTransaction, getTransactionHistory };