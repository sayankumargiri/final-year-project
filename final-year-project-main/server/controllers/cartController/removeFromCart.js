import Cart from "../../models/Cart.js";


export const removeFromCart =
async (req,res)=>{

   try{

      const cartItem = await Cart.findById(req.params.id);

      if (!cartItem) {
         return res.status(404).json({ message: "404: Cart item not found" });
      }

      if (cartItem.user.toString() !== req.user._id.toString()) {
         return res.status(403).json({ message: "Not authorized" });
      }

      await Cart.findByIdAndDelete(req.params.id);

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