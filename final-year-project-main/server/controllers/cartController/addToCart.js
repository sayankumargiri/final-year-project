import Cart from "../../models/Cart.js";

export const addToCart = async (req, res) => {
   try {
      const { productId, quantity = 1 } = req.body;

      // find existing cart item for this user and product
      let cartItem = await Cart.findOne({
         user: req.user._id,
         product: productId,
      });

      if (cartItem) {
         cartItem.quantity = cartItem.quantity + quantity;
         await cartItem.save();
      } else {
         cartItem = await Cart.create({
            user: req.user._id,
            product: productId,
            quantity,
         });
      }

      // populate product before returning
      cartItem = await Cart.findById(cartItem._id).populate("product");

      res.status(201).json(cartItem);
   } catch (error) {
      res.status(500).json({
         message: error.message,
      });
   }
};