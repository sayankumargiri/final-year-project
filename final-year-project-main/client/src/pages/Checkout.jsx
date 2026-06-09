import api from "../api/axios";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-hot-toast";

import Navbar from "../components/Navbar";

import {
  clearCart,
} from "../redux/slices/cartSlice";



export default function Checkout() {

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




  const handleOrder = async () => {

  if (cartItems.length === 0) {

    toast.error("Cart is empty");

    return;

  }

  try {

    const response = await api.post("/orders", {
      items: cartItems,
      totalAmount: total,
    });

    toast.success(
      response.data.message ||
      "Order placed successfully"
    );

    dispatch(clearCart());

    navigate("/home");

  }

  catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to place order"
    );

  }

};


  return (

    <div className="min-h-screen bg-base-200">

      <Navbar />



      <div className="p-5 max-w-4xl mx-auto">

        <h1
          className="
          text-3xl
          font-bold
          mb-6
        "
        >
          Checkout
        </h1>





        <div
          className="
          card
          bg-base-100
          shadow-md
          p-6
        "
        >

          <h2
            className="
            text-xl
            font-semibold
            mb-4
          "
          >
            Order Summary
          </h2>





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
                    flex
                    justify-between
                    border-b
                    pb-3
                  "
                  >

                    <div>

                      <p
                        className="
                        font-medium
                      "
                      >
                        {
                          item.name
                        }
                      </p>


                      <p>
                        Qty:
                        {" "}
                        {
                          item.quantity
                        }
                      </p>

                    </div>



                    <p
                      className="
                      font-semibold
                    "
                    >
                      ₹
                      {
                        item.price *
                        item.quantity
                      }
                    </p>

                  </div>

                )
              )
            }

          </div>






          <div
            className="
            mt-6
            flex
            justify-between
            text-xl
            font-bold
          "
          >

            <span>
              Total
            </span>

            <span>
              ₹
              {
                total
              }
            </span>

          </div>






          <button
            onClick={
              handleOrder
            }
            className="
            btn
            btn-success
            w-full
            mt-6
          "
          >
            Place Order
          </button>


        </div>


      </div>


    </div>
  );
}