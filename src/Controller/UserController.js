import UserService from "../Service/UserService.js";

let createNewUser = async (req, res) => {
  try {
    let response = await UserService.createNewUser(req.body);

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

let signIn = async (req, res) => {
  try {
    let response = await UserService.signIn(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

let getDetailUser = async (req, res) => {
  try {
    let response = await UserService.getDetailUser(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

let updateProfile = async (req, res) => {
  try {
    let response = await UserService.updateProfile(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};
module.exports = {
  createNewUser,
  signIn,
  getDetailUser,
  updateProfile,
};
