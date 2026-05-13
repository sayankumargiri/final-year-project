import Order from "../../models/Order.js";


export const getAllOrders = async (req,res)=>{

   try{

      const orders =
      await Order.find()
      .populate("user","name email")
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