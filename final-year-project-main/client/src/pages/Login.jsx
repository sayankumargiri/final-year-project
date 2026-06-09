import { useState } from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { useDispatch } from "react-redux";

import api from "../api/axios";

import toast from "react-hot-toast";

import {
  setCredentials
} from "../redux/slices/authSlice";

import {
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";



export default function Login() {

  const dispatch =
    useDispatch();


  const navigate =
    useNavigate();



  const [identifier, setIdentifier] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [showPassword, setShowPassword] =
    useState(false);




  const isPhone =

    /^[0-9]/.test(
      identifier
    );




  const handleLogin =
    async () => {

      try {

        const res =
          await api.post(

            "/auth/login",

            {
              identifier,
              password
            }

          );

          



        dispatch(

          setCredentials({

            user:
              res.data.user,

            token:
              res.data.token

          })

        );



        toast.success(
          res.data.message
        );



        navigate(
          "/home"
        );

      }

      catch (error) {

        toast.error(

          error.response
            ?.data?.message ||

          "Login failed"

        );

      }

    };




  return (

    <div className="hero min-h-screen bg-base-200">

      <div
        className="
        card
        w-[420px]
        bg-base-100
        shadow-2xl
        border
        border-base-300
      "
      >

        <div className="card-body p-8">

          <h2
            className="
            text-4xl
            font-bold
            text-center
            mb-8
          "
          >

            Login

          </h2>




          <label
            className="
            input
            input-bordered
            flex
            items-center
            gap-3
            h-14
            mb-5
          "
          >

            {
              isPhone

                ? (
                  <Phone
                    size={20}
                  />
                )

                : (
                  <Mail
                    size={20}
                  />
                )
            }


            <input

              type="text"

              className="grow"

              placeholder="Email or Phone"

              value={
                identifier
              }

              onChange={
                (e) =>
                  setIdentifier(
                    e.target.value
                  )
              }

            />

          </label>





          <label
            className="
            input
            input-bordered
            flex
            items-center
            gap-3
            h-14
            mb-6
          "
          >

            <Lock
              size={20}
            />


            <input

              type={

                showPassword

                  ? "text"

                  : "password"

              }

              className="grow"

              placeholder="Password"

              value={
                password
              }

              onChange={
                (e) =>
                  setPassword(
                    e.target.value
                  )
              }

            />




            <button

              type="button"

              onClick={
                () =>
                  setShowPassword(

                    !showPassword

                  )
              }

            >

              {

                showPassword

                  ? (
                    <EyeOff
                      size={20}
                    />
                  )

                  : (
                    <Eye
                      size={20}
                    />
                  )

              }

            </button>

          </label>






          <button

            onClick={
              handleLogin
            }

            className="
            btn
            btn-primary
            btn-lg
            w-full
          "
          >

            <LogIn
              size={20}
            />

            Login

          </button>






          <p
            className="
            text-center
            mt-5
          "
          >

            Don't have an account?{" "}

            <Link

              to="/signup"

              className="
              link
              link-primary
              font-semibold
            "
            >

              Signup

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}