import express from "express";

import {
   signup
} from "../controllers/authController/signup.js";

import {
   login
} from "../controllers/authController/login.js";

import {
   getProfile
} from "../controllers/authController/profile.js";

import {
   protect
} from "../middleware/authMiddleware.js";


const router =
express.Router();


router.post(
   "/signup",
   signup
);


router.post(
   "/login",
   login
);


router.get(
   "/me",
   protect,
   getProfile
);


export default router;