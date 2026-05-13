import Order from "../../models/Order.js";


export const myOrders = async (req,res)=>{

   try{

      const orders =
      await Order.find({

         user:req.user._id

      })
      .populate("items.product");


      res.status(200).json(

         orders

      );

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};