import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

import {
  toast,
} from "react-hot-toast";

import Navbar from "../components/Navbar";

import {

  removeFromCart,

  increaseQuantity,

  decreaseQuantity,

} from "../redux/slices/cartSlice";





export default function Cart() {



  const navigate =
    useNavigate();



  const dispatch =
    useDispatch();





  const cartItems =
    useSelector(
      (state) =>
        state.cart.items
    );








  const total =
    cartItems.reduce(

      (acc, item) =>

        acc +

        (

          item.price *

          item.quantity

        ),

      0

    );








  const handleRemove =
    (id) => {

      dispatch(

        removeFromCart(
          id
        )

      );



      toast.success(
        "Removed from cart"
      );

    };









  return (

    <div className="min-h-screen bg-base-200">

      <Navbar />





      <div className="p-5">

        <h1
          className="
          text-3xl
          font-bold
          mb-6
        "
        >

          My Cart

        </h1>








        {

          cartItems.length === 0

            ? (

              <div
                className="
                text-center
                mt-20
              "
              >

                <h2
                  className="
                  text-2xl
                  font-semibold
                "
                >

                  Cart is Empty

                </h2>





                <button
                  className="
                  btn
                  btn-primary
                  mt-5
                "
                  onClick={
                    () =>
                      navigate("/")
                  }
                >

                  Continue Shopping

                </button>

              </div>

            )

            : (

              <>





                <div className="space-y-4">

                  {

                    cartItems.map(

                      (
                        item
                      ) => (

                        <div

                          key={
                            item._id
                          }

                          className="
                          card
                          bg-base-100
                          shadow-md
                          p-4
                        "
                        >

                          <div
                            className="
                            flex
                            justify-between
                            items-center
                            flex-wrap
                            gap-4
                          "
                          >





                            <div
                              className="
                              flex
                              items-center
                              gap-4
                            "
                            >

                              <img
                                src={
                                  item.image.startsWith(
                                    "http"
                                  )

                                    ? item.image

                                    : `http://localhost:5000${item.image}`
                                }
                                alt={
                                  item.name
                                }
                                className="
                                w-20
                                h-20
                                object-cover
                                rounded-lg
                              "
                              />





                              <div>

                                <h2
                                  className="
                                  text-lg
                                  font-semibold
                                "
                                >

                                  {
                                    item.name
                                  }

                                </h2>





                                <p>

                                  ₹

                                  {
                                    item.price
                                  }

                                </p>

                              </div>

                            </div>









                            <div
                              className="
                              flex
                              items-center
                              gap-3
                            "
                            >





                              <button
                                className="
                                btn
                                btn-sm
                              "
                                onClick={() =>

                                  dispatch(

                                    decreaseQuantity(
                                      item._id
                                    )

                                  )

                                }
                              >

                                <Minus
                                  size={16}
                                />

                              </button>








                              <span
                                className="
                                font-bold
                                text-lg
                                min-w-[20px]
                                text-center
                              "
                              >

                                {
                                  item.quantity
                                }

                              </span>








                              <button
                                className="
                                btn
                                btn-sm
                              "
                                onClick={() =>

                                  dispatch(

                                    increaseQuantity(
                                      item._id
                                    )

                                  )

                                }
                              >

                                <Plus
                                  size={16}
                                />

                              </button>









                              <button
                                className="
                                btn
                                btn-error
                                btn-sm
                              "
                                onClick={() =>

                                  handleRemove(
                                    item._id
                                  )

                                }
                              >

                                <Trash2
                                  size={16}
                                />

                              </button>









                              <p
                                className="
                                font-bold
                                ml-4
                              "
                              >

                                ₹

                                {

                                  item.price *

                                  item.quantity

                                }

                              </p>

                            </div>

                          </div>

                        </div>

                      )

                    )

                  }

                </div>









                <div
                  className="
                  mt-8
                  text-right
                "
                >

                  <h2
                    className="
                    text-2xl
                    font-bold
                    mb-4
                  "
                  >

                    Total:

                    {" "}

                    ₹

                    {
                      total
                    }

                  </h2>







                  <button
                    className="
                    btn
                    btn-primary
                  "
                    onClick={
                      () =>
                        navigate(
                          "/checkout"
                        )
                    }
                  >

                    Proceed To Checkout

                  </button>

                </div>

              </>

            )

        }

      </div>

    </div>

  );

}