import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  addToCartAsync,
  updateCartQuantity,
  removeFromCartAsync,
} from "../redux/slices/cartSlice";

import {
  Pencil,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

export default function ProductCard({

  product,
  isAdmin,
  onEdit,
  onDelete,

}) {

  const dispatch =
    useDispatch();

  const cartItems =
    useSelector(
      (state) =>
        state.cart.items
    );

  const cartItem =
    cartItems.find(
      (item) =>
        item._id ===
        product._id
    );

  const imageUrl =
    product?.image
      ? (
          product.image.startsWith(
            "http"
          )
            ? product.image
            : `http://localhost:5000${product.image}`
        )
      : "/no-image.png";

  return (

    <div className="card bg-base-100 shadow-xl">

      <figure>

        <img
          src={imageUrl}
          alt={product.name}
          className="h-56 w-full object-cover"
        />

      </figure>

      <div className="card-body">

        <h2 className="card-title">
          {product.name}
        </h2>

        <p>
          ₹{product.price}
        </p>

        <p>
          Stock: {product.stock}
        </p>

        {isAdmin ? (

          <div className="flex gap-3 mt-3">

            <button
              onClick={onEdit}
              className="btn btn-warning btn-sm"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={onDelete}
              className="btn btn-error btn-sm"
            >
              <Trash2 size={16} />
            </button>

          </div>

        ) : (

          <div className="mt-3">

            {!cartItem ? (
              <button
                className="btn btn-primary w-full"
                onClick={() =>
                  dispatch(
                    addToCartAsync({ product, quantity: 1 })
                  )
                }
              >
                Add To Cart
              </button>

            ) : (

              <div className="flex items-center justify-center gap-3">

                <button
                  className="btn btn-sm"
                  onClick={() => {
                    const newQty = cartItem.quantity - 1;
                    if (newQty <= 0) {
                      dispatch(removeFromCartAsync({ cartItemId: cartItem.cartItemId }));
                    } else {
                      dispatch(updateCartQuantity({ cartItemId: cartItem.cartItemId, quantity: newQty }));
                    }
                  }}
                >
                  <Minus size={16} />
                </button>

                <span className="font-bold">{cartItem.quantity}</span>

                <button
                  className="btn btn-sm"
                  onClick={() =>
                    dispatch(updateCartQuantity({ cartItemId: cartItem.cartItemId, quantity: cartItem.quantity + 1 }))
                  }
                >
                  <Plus size={16} />
                </button>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

}