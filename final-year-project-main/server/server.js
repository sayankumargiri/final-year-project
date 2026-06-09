import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";


dotenv.config();

connectDB();


const app =
   express();




// Middlewares
app.use(
   cors()
);


app.use(
   express.json()
);




// Image Static Folder
app.use(

   "/uploads",

   express.static(
      "uploads"
   )

);




// Test Route
app.get(

   "/",

   (
      req,
      res
   ) => {

      res.send(
         "Server is running..."
      );

   }

);




// Auth Routes
app.use(

   "/api/auth",

   authRoutes

);




// Product Routes
app.use(

   "/api/products",

   productRoutes

);




// Cart Routes
app.use(

   "/api/cart",

   cartRoutes

);




// Order Routes
app.use(

   "/api/orders",

   orderRoutes

);




// Admin Routes
app.use(

   "/api/admin",

   adminRoutes

);





const PORT =

   process.env.PORT || 5000;




app.listen(

   PORT,

   () => {

      console.log(

         `Server running on port ${PORT}`

      );

   }

);