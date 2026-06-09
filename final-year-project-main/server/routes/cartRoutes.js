import express from "express";

import {
   addToCart
} from "../controllers/cartController/addToCart.js";

import {
   getCart
} from "../controllers/cartController/getCart.js";

import {
   removeFromCart
} from "../controllers/cartController/removeFromCart.js";

import {
   updateCart
} from "../controllers/cartController/updateCart.js";

import {
   protect
} from "../middleware/authMiddleware.js";


const router =
express.Router();


router.post(
   "/",
   protect,
   addToCart
);

router.get(
   "/",
   protect,
   getCart
);

router.delete(
   "/:id",
   protect,
   removeFromCart
);

router.patch(
   "/:id",
   protect,
   updateCart
);


export default router;