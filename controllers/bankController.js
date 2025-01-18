import Bank from '../models/bankModel.js';

const updateBank = async (req, res) => {
    try {
        const { amount } = req.body;
        
        // Validate amount
        if (!amount || typeof amount !== 'number' || amount < 0) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "Please provide a valid amount"
                }
            });
        }

        // Find and update bank
        console.log('user email :', req.user.Email)
        const bank= await Bank.findOneAndUpdate(
            { userEmail: req.user.Email },
            { amount: amount },
            { new: true }
        );
        console.log("Bank",bank)

        if (!bank) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "Bank Account not found"
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                message: "Bank Account updated successfully",
                bank: bank
            }
        });

    } catch (error) {
        console.error("Bank Account update error:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};
export default updateBank