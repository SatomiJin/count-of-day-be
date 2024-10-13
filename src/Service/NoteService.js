const { where } = require("sequelize");
const db = require("../models");

const createNote = async (data) => {
  try {
    if (!data.email || !data.messageNote) {
      return {
        status: "ERROR",
        message: "Missing parameters...",
      };
    }
    let date = new Date();
    let newNote = await db.Note.create({
      email: data.email,
      messageNote: data.messageNote,
      timeCreate: date,
    });
    return {
      status: "OK",
      message: "Create note is success!!",
      newNote: newNote,
    };
  } catch (e) {
    console.log(e);

    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

const getAllNote = async (data) => {
  try {
    if (!data.email) {
      return {
        status: "ERROR",
        message: "Please, Login for use it",
      };
    }
    let checkEmail = await db.User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!checkEmail) {
      return {
        status: "ERROR",
        message: "Only user of web can use it!!!",
      };
    }
    let messages = await db.Note.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    return {
      status: "OK",
      message: "Get all message is success!!",
      messages: messages,
    };
  } catch (e) {
    console.log(e);

    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

module.exports = {
  createNote,
  getAllNote,
};
