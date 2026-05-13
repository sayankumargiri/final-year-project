import Cart from "../../models/Cart.js";


export const addToCart =
async (req,res)=>{

   try{

      const {
         productId,
         quantity
      } = req.body;


      const cart =
      await Cart.create({

         user:
         req.user._id,

         product:
         productId,

         quantity

      });


      res
      .status(201)
      .json(cart);

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