import User from "../../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (
   req,
   res
) => {

   try {

      let {
         name,
         email,
         phone,
         password,
         role,
      } = req.body;


      // Validation
      if (
         !name ||
         !email ||
         !phone ||
         !password ||
         !role
      ) {

         return res
            .status(400)
            .json({

               message:
                  "All fields are required",

            });
      }


      // Clean input
      name =
         name.trim();

      email =
         email
            .trim()
            .toLowerCase();

      phone =
         phone.trim();

      role =
         role.trim();


      // Role validation
      if (

         role !== "user" &&
         role !== "admin"

      ) {

         return res
            .status(400)
            .json({

               message:
                  "Please select valid role",

            });
      }


      // Password validation
      if (

         password.length < 6

      ) {

         return res
            .status(400)
            .json({

               message:
                  "Password must be at least 6 characters",

            });
      }


      // Existing user check
      const existingUser =
         await User.findOne({

            $or: [

               { email },

               { phone },

            ],

         });


      if (
         existingUser
      ) {

         return res
            .status(400)
            .json({

               message:
                  "User already exists",

            });
      }


      // Hash password
      const hashedPassword =
         await bcrypt.hash(
            password,
            10
         );


      // Create user
      const user =
         await User.create({

            name,
            email,
            phone,

            password:
               hashedPassword,

            role,

         });


      res
         .status(201)
         .json({

            success: true,

            message:
               "Registration successful",

            user: {

               _id:
                  user._id,

               name:
                  user.name,

               email:
                  user.email,

               phone:
                  user.phone,

               role:
                  user.role,

            },

         });

   }

   catch (
      error
   ) {

      console.log(
         "Signup Error:",
         error
      );

      res
         .status(500)
         .json({

            success: false,

            message:
               error.message,

         });
   }
};