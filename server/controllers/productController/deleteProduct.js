import Product from "../../models/Product.js";


export const deleteProduct = async (req,res)=>{

   try{

      const product =
      await Product.findById(

         req.params.id
      );


      if(!product){

         return res
         .status(404)
         .json({

            message:
            "Product not found"

         });

      }


      await Product.findByIdAndDelete(

         req.params.id
      );


      res
      .status(200)
      .json({

         message:
         "Product deleted successfully"

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