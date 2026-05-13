import Product from "../../models/Product.js";


export const createProduct =
async (req, res) => {

   try {

      const {

         name,
         price,
         category,
         description,
         stock,

      } = req.body;





      const image =

         req.file

            ? `/uploads/${req.file.filename}`

            : "";






      const product =

         await Product.create({

            name,

            description,

            price,

            category,

            stock,

            image,

         });






      res
         .status(201)
         .json(product);

   }


   catch (error) {

      console.log(
         error
      );


      res
         .status(500)
         .json({

            message:
               error.message

         });

   }

};