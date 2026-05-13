import express from "express";

import {
   protect,
   adminOnly
} from "../middleware/authMiddleware.js";


import {
   placeOrder
} from "../controllers/orderController/placeOrder.js";


import {
   myOrders
} from "../controllers/orderController/myOrders.js";


import {
   getAllOrders
} from "../controllers/orderController/getAllOrders.js";

import {
   updateOrderStatus
} from "../controllers/orderController/updateOrderStatus.js";


const router = express.Router();


// User
router.post(
   "/",
   protect,
   placeOrder
);


router.get(
   "/my-orders",
   protect,
   myOrders
);


// Admin
router.get(
   "/all",
   protect,
   adminOnly,
   getAllOrders
);

router.put(

   "/:id",

   protect,

   adminOnly,

   updateOrderStatus

);



export default router;