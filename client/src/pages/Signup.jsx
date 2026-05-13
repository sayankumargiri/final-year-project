import React, { useState } from "react";
import api from "../api/axios";

import { toast } from "react-hot-toast";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
  Phone,
  Shield,
} from "lucide-react";

const Signup = () => {

  const navigate =
    useNavigate();

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    formData,
    setFormData,
  ] = useState({
    name: "",
    email: "",
    phone: "",
    role: "user",
    password: "",
  });


  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };


  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(
          true
        );

        const res =
          await api.post(

            "/auth/signup",

            formData

          );


        toast.success(

          res.data
            .message

        );


        setFormData({

          name: "",
          email: "",
          phone: "",
          role: "user",
          password: "",

        });


        // auto redirect
        setTimeout(
          () => {

            navigate(
              "/login"
            );

          },
          1000
        );

      }

      catch (
        error
      ) {

        toast.error(

          error
            .response
            ?.data
            ?.message ||

            "Signup failed"

        );

      }

      finally {

        setLoading(
          false
        );

      }

    };


  return (

    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-8">

      <div className="card w-full max-w-md bg-base-100 shadow-2xl">

        <div className="card-body">


          {/* logo */}
          <div className="flex justify-center mb-4">

            <div className="bg-primary text-white p-4 rounded-full">

              <ShoppingBag size={28} />

            </div>

          </div>


          <h2 className="text-3xl font-bold text-center">

            Create Account

          </h2>


          <p className="text-center text-base-content/70 mb-5">

            Create your shopping account

          </p>


          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >


            {/* name */}
            <div className="relative">

              <User
                size={18}
                className="absolute left-4 top-4 text-gray-400 z-10"
              />

              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="input input-bordered w-full pl-12"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* email */}
            <div className="relative">

              <Mail
                size={18}
                className="absolute left-4 top-4 text-gray-400 z-10"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="input input-bordered w-full pl-12"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* phone */}
            <div className="relative">

              <Phone
                size={18}
                className="absolute left-4 top-4 text-gray-400 z-10"
              />

              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="input input-bordered w-full pl-12"
                value={
                  formData.phone
                }
                onChange={
                  handleChange
                }
              />

            </div>


            {/* role */}
            <div className="relative">

              <Shield
                size={18}
                className="absolute left-4 top-4 text-gray-400 z-10"
              />

              <select
                name="role"
                className="select select-bordered w-full pl-12"
                value={
                  formData.role
                }
                onChange={
                  handleChange
                }
              >

                <option value="user">

                  User

                </option>

                <option value="admin">

                  Admin

                </option>

              </select>

            </div>


            {/* password */}
            <div className="relative">

              <Lock
                size={18}
                className="absolute left-4 top-4 text-gray-400 z-10"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                required
                placeholder="Password"
                className="input input-bordered w-full pl-12 pr-12"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>

                  setShowPassword(
                    !showPassword
                  )

                }
              >

                {

                  showPassword ?

                  <EyeOff size={18} />

                  :

                  <Eye size={18} />

                }

              </button>

            </div>


            {/* button */}
            <button
              type="submit"
              disabled={
                loading
              }
              className="btn btn-primary w-full"
            >

              {

                loading ?

                "Creating..."

                :

                "Create Account"

              }

            </button>

          </form>


          <div className="divider">

            OR

          </div>


          <p className="text-center text-sm">

            Already have an account?

            <Link
              to="/login"
              className="text-primary ml-2 font-semibold hover:underline"
            >

              Login

            </Link>

          </p>


        </div>

      </div>

    </div>

  );
};

export default Signup;