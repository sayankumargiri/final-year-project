import Product from "../../models/Product.js";


export const searchProduct = async (req,res)=>{

   try{

      const keyword =
      req.query.keyword;


      const products =
      await Product.find({

         name:{

            $regex:keyword,

            $options:"i"

         }

      });


      res.status(200).json(

         products

      );

   }

   catch(error){

      res.status(500).json({

         message:error.message

      });

   }

};