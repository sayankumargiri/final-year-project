import Cart from "../../models/Cart.js";


export const getCart =
async (req,res)=>{

   try{

      const cart =
      await Cart.find({

         user:
         req.user._id

      })

      .populate("product");


      res.json(
         cart
      );

   }

   catch(error){

      res
      .status(500)
      .json({

         message:
         error.message
      });

   }

};