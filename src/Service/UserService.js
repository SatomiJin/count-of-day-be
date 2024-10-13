import { where } from "sequelize";
import db from "../models/index";
import bcrypt from "bcrypt";
import { generalAccessToken, generalRefreshToken, refreshTokenJwtService } from "./JWTService";

let createNewUser = async (data) => {
  try {
    if (
      !data.email ||
      !data.password ||
      !data.phoneNumber ||
      !data.firstName ||
      !data.lastName ||
      !data.gender ||
      !data.confirmPassword
    ) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let checkUser = await db.User.findOne({
      where: { email: data.email },
    });

    if (checkUser) {
      return {
        status: "ERROR",
        message: "The user was existed",
      };
    }

    if (data.password !== data.confirmPassword) {
      return {
        status: "ERROR",
        message: "The confirm password is not equal password, try again",
      };
    }

    let hasPass = bcrypt.hashSync(data.password, 14);
    let newUser = await db.User.create({
      email: data.email,
      password: hasPass,
      phoneNumber: data.phoneNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      gender: data.gender,
      roleId: data.roleId || "user",
      image: data.image,
    });

    return {
      status: "OK",
      message: "Create new user success!",
      user: newUser,
    };
  } catch (e) {
    return e;
  }
};

let signIn = async (data) => {
  try {
    if (!data.email || !data.password) {
      return {
        status: "ERROR",
        message: "Please, fill all field!",
      };
    }
    let checkUser = await db.User.findOne({
      where: { email: data.email },
      attributes: {
        exclude: ["image", "address", "gender", "roleId", "createdAt", "updatedAt"],
      },
    });
    if (!checkUser) {
      return {
        status: "ERROR",
        message: "Email isn't exist, try again",
      };
    }
    let comparePassword = bcrypt.compareSync(data.password, checkUser.password);
    if (!comparePassword) {
      return {
        status: "ERROR",
        message: "Password is wrong!, try again",
      };
    }
    let access_token = await generalAccessToken({
      email: data.email,
      role: checkUser.roleId,
    });
    let refresh_token = await generalRefreshToken({
      email: data.email,
      role: checkUser.roleId,
    });
    return {
      status: "OK",
      message: "Sign in success!!",
      access_token: access_token,
      refresh_token: refresh_token,
    };
  } catch (e) {
    return e;
  }
};

let getDetailUser = async (data) => {
  try {
    if (!data.email) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let user = await db.User.findOne({
      where: { email: data.email },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });

    if (!user) {
      return {
        status: "ERROR",
        message: "User is not defined!",
      };
    }
    if (user && user.image) {
      user.image = Buffer.from(user.image, "base64").toString("binary");
    }
    return {
      status: "OK",
      message: "Get user is success!!",
      user: user,
    };
  } catch (e) {
    return e;
  }
};

const updateProfile = async (data) => {
  try {
    if (!data.email) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let user = await db.User.findOne({
      where: { email: data.email },
      attributes: {
        exclude: ["password"],
      },
      raw: false,
    });

    if (!user) {
      return {
        status: "ERROR",
        message: "User is not defied!!",
      };
    } else {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.address = data.address;
      user.phoneNumber = data.phoneNumber;
      user.gender = data.gender;
      user.image = data.image;
      await user.save();
      return {
        status: "OK",
        message: "Update user success!",
        user: user,
      };
    }
  } catch (e) {
    return e;
  }
};

module.exports = {
  createNewUser,
  signIn,
  getDetailUser,
  updateProfile,
};
