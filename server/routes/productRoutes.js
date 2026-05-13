import express from "express";

import upload
  from "../middleware/uploadMiddleware.js";

import {
  createProduct
} from "../controllers/productController/createProduct.js";

import {
  getProducts
} from "../controllers/productController/getProduct.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

import {
  updateProduct
} from "../controllers/productController/updateProduct.js";

import {
  deleteProduct
} from "../controllers/productController/deleteProduct.js";

import {
  searchProduct
} from "../controllers/productController/searchProduct.js";

import {
  getSingleProduct
} from "../controllers/productController/getSingleProduct.js";

import Product
  from "../models/Product.js";


const router =
  express.Router();



// ======================
// Public Routes
// ======================

// all products
router.get(
  "/",
  getProducts
);


// search product
router.get(
  "/search",
  searchProduct
);


// fetch all categories
router.get(
  "/categories/all",

  async (
    req,
    res
  ) => {

    try {

      const categories =
        await Product.distinct(
          "category"
        );


      res.json(
        categories
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message

      });
    }
  }
);


// single product
// IMPORTANT:
// this must stay after
// /categories/all
router.get(
  "/:id",
  getSingleProduct
);





// ======================
// Admin Routes
// ======================

// create product
router.post(

  "/",

  protect,

  adminOnly,

  upload.single(
    "image"
  ),

  createProduct

);


// update product
router.put(

  "/:id",

  protect,

  adminOnly,

  upload.single(
    "image"
  ),

  updateProduct

);


// delete product
router.delete(

  "/:id",

  protect,

  adminOnly,

  deleteProduct

);


export default router;