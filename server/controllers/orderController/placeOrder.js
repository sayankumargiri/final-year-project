import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";


export const placeOrder = async (req,res)=>{

   try{

      const cart = await Cart
      .findOne({

         user:req.user._id

      })
      .populate("items.product");


      if(!cart || cart.items.length===0){

         return res.status(400).json({

            message:"Cart is empty"

         });

      }


      let totalAmount = 0;


      for(let item of cart.items){

         const product =
         await Product.findById(

            item.product._id
         );


         if(product.stock < item.quantity){

            return res.status(400).json({

               message:
               `${product.name} out of stock`

            });

         }


         totalAmount +=
         product.price * item.quantity;


         product.stock -= item.quantity;

         await product.save();

      }



      const order =
      await Order.create({

         user:req.user._id,

         items:cart.items,

         totalAmount,

         paymentMethod:"COD"

      });



      cart.items = [];

      await cart.save();



      res.status(201).json({

         message:"Order placed successfully",

         order

      });

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};