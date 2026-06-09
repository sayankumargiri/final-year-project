import Order from "../../models/Order.js";
import Cart from "../../models/Cart.js";

export const placeOrder = async (req, res) => {

  try {

    const { items, totalAmount } = req.body;

    if (!items || items.length === 0) {

      return res.status(400).json({
        message: "Cart is empty",
      });

    }

    const order =
    await Order.create({

      user: req.user._id,

      items: items.map(item => ({

         product: item._id,

         quantity: item.quantity

      })),

      totalAmount,

      paymentMethod: "COD"

   });

    res.status(201).json({

      message: "Order placed successfully",

      order,

    });

      // clear user's cart after successful order
      try {
        await Cart.deleteMany({ user: req.user._id });
      } catch (e) {
        console.error("Failed to clear cart after order:", e.message);
      }

  }

  catch (error) {

    res.status(500).json({

      message: error.message,

    });

  }

};