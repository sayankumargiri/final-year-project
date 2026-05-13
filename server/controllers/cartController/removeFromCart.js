import Cart from "../../models/Cart.js";


export const removeFromCart =
async (req,res)=>{

   try{

      await Cart.findByIdAndDelete(

         req.params.id
      );


      res.json({

         message:
         "Removed from cart"
      });

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