import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  ShoppingCart,
  LogOut,
} from "lucide-react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logout,
} from "../redux/slices/authSlice";

import {
  toast,
} from "react-hot-toast";



export default function Navbar() {

  const navigate =
    useNavigate();

  const dispatch =
    useDispatch();



  const cartItems =
    useSelector(
      (state) =>
        state.cart.items
    );



  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        item.quantity,
      0
    );



  const handleLogout =
    () => {

      dispatch(
        logout()
      );

      toast.success(
        "Logged out successfully"
      );

      navigate(
        "/login"
      );
    };



  return (

    <div
      className="
      navbar
      bg-base-100
      shadow-md
      px-4
      md:px-6
    "
    >


      <div className="flex-1">

        <Link
          to="/"
          className="
          text-xl
          md:text-2xl
          font-bold
        "
        >
          ShopHub
        </Link>

      </div>




      <div className="flex items-center gap-5">


        <Link
          to="/cart"
          className="
          relative
          cursor-pointer
        "
        >

          <ShoppingCart
            size={24}
          />


          {
            totalItems > 0 && (

              <span
                className="
                absolute
                -top-2
                -right-2
                badge
                badge-primary
                badge-sm
              "
              >
                {totalItems}
              </span>

            )
          }

        </Link>




        <button
          onClick={
            handleLogout
          }
          className="
          btn
          btn-error
          btn-sm
          gap-2
        "
        >

          <LogOut
            size={16}
          />

          Logout

        </button>


      </div>


    </div>

  );
}