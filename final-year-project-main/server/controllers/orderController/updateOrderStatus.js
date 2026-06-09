import Order from "../../models/Order.js";


export const updateOrderStatus = async (req,res)=>{

   try{

      const { status } = req.body;


      const allowedStatus = [

         "Pending",
         "Confirmed",
         "Shipped",
         "Delivered",
         "Cancelled"

      ];


      if(

         !allowedStatus.includes(
            status
         )

      ){

         return res.status(400).json({

            message:
            "Invalid status"

         });

      }



      const order =
      await Order.findById(

         req.params.id

      );


      if(!order){

         return res.status(404).json({

            message:
            "Order not found"

         });

      }



      order.status = status;


      await order.save();



      res.status(200).json({

         message:
         "Order status updated successfully",

         order

      });

   }

   catch(error){

      res.status(500).json({

         message:
         error.message

      });

   }

};