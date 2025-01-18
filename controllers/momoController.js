import Momo from '../models/momoModel.js';

const updateMomo = async (req, res) => {
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

        // Find and update budget
        console.log('user email :', req.user.Email)
        const momo= await Momo.findOneAndUpdate(
            { userEmail: req.user.Email },
            { amount: amount },
            { new: true }
        );
        console.log("Momo",momo)

        if (!momo) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "momo Account not found"
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                message: "momo Account updated successfully",
                momo: momo
            }
        });

    } catch (error) {
        console.error("momo Account update error:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};
export default updateMomo