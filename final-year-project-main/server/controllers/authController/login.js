import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {

  try {

    const {
      identifier,
      password
    } = req.body;


    const isPhone =
      /^[0-9]/.test(identifier);


    const user =
      await User.findOne(

        isPhone
          ? { phone: identifier }
          : { email: identifier }

      );


    if (!user) {

      return res
        .status(404)
        .json({

          message:
            "User does not exist"

        });

    }


    if (!isPhone &&
      user.email !== identifier) {

      return res
        .status(400)
        .json({

          message:
            "Email is wrong"

        });

    }


    if (isPhone &&
      user.phone !== identifier) {

      return res
        .status(400)
        .json({

          message:
            "Phone is wrong"

        });

    }


    const isMatch =
      await bcrypt.compare(

        password,
        user.password

      );


    if (!isMatch) {

      return res
        .status(400)
        .json({

          message:
            "Password is wrong"

        });

    }


    const token =
      jwt.sign(

        {
          id: user._id
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "7d"
        }

      );


    res.status(200)
      .json({

        message:
          "Login successful",

        token,
        user

      });

  }

  catch (error) {

    res
      .status(500)
      .json({

        message:
          error.message

      });

  }

};