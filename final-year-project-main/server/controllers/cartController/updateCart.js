import Cart from "../../models/Cart.js";

export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // ensure the user owns this cart item
    if (cartItem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    const populated = await Cart.findById(cartItem._id).populate("product");

    res.json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
