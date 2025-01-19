import Cash from '../models/cashModel.js';

const updateCash = async (req, res) => {
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
        const cash= await Cash.findOneAndUpdate(
            { userEmail: req.user.Email },
            { amount: amount },
            { new: true }
        );
        console.log("Cash",cash)

        if (!cash) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "Cash Account not found"
                }
            });
        }

        return res.status(200).json({
            status: "success",
            data: {
                message: "Cash Account updated successfully",
                cash: cash
            }
        });

    } catch (error) {
        console.error("Cash Account update error:", error);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal server error"
            }
        });
    }
};

const readCash = async (req, res) => {
  try {
   
    const userEmail = req.user.Email;
    console.log('Fetching cash for user:', userEmail);

   
    const cash = await Cash.findOne({ userEmail });

  
    if (!cash) {
      return res.status(404).json({
        status: "fail",
        data: {
          message: "Cash Account not found"
        }
      });
    }

  
    return res.status(200).json({
      status: "success",
      data: {
        cash
      }
    });

  } catch (error) {
    console.error("Error fetching cash:", error);
    return res.status(500).json({
      status: "error",
      data: {
        message: "Internal server error"
      }
    });
  }
};
export { updateCash,readCash };