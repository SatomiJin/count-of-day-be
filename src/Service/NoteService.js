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
      type: data.type || "message",
      sticker: data.sticker,
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
      include: [
        {
          model: db.User,
          as: "author",
          attributes: ["image"], // chỉ lấy các thuộc tính cần thiết
        },
      ],
      raw: false,
      nest: true,
    });
    if (messages) {
      messages.map((item) => {
        if (item && item.author && item.author.image) {
          item.author.image = Buffer.from(item.author.image, "base64").toString("binary");
          // console.log("a");
        }
      });
    }
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
