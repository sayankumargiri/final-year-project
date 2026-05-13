import Product from "../../models/Product.js";


export const updateProduct = async (req,res)=>{

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


      const updatedProduct =
      await Product.findByIdAndUpdate(

         req.params.id,

         req.body,

         {
            new:true,
            runValidators:true
         }

      );


      res
      .status(200)
      .json({

         message:
         "Product updated successfully",

         product:
         updatedProduct

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