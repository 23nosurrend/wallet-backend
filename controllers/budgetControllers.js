import Budget from '../models/userBudgetModel.js';

const updateBudget = async (req, res) => {
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
        console.log('user emial :', req.user.Email)
        const budget = await Budget.findOneAndUpdate(
            { userEmail: req.user.Email },
            { amount: amount },
            { new: true }
        );
        console.log("Budget",budget)

        if (!budget) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "Budget not found"
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                message: "Budget updated successfully",
                budget: budget
            }
        });

    } catch (error) {
        console.error("Budget update error:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};
const readBudget = async (req, res) => {
  try {
   
    const userEmail = req.user.Email;
    console.log('Fetching budget for user:', userEmail);

   
    const budget = await Budget.findOne({ userEmail });

  
    if (!budget) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Budget  Account not found"
        }
      });
    }

  
    return res.status(200).json({
      status: "success",
      data: {
        budget
      }
    });

  } catch (error) {
    console.error("Error fetching budget:", error);
    return res.status(500).json({
      status: "error",
      data: {
        message: "Internal server error"
      }
    });
  }
};
export { updateBudget ,readBudget}