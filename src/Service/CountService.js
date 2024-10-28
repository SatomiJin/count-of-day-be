const { where } = require("sequelize");
const db = require("../models");

const createCount = async (data) => {
  try {
    if (!data.email || !data.countOfDay) {
      return {
        status: "ERROR",
        message: "Missing parameters....",
      };
    }
    let newCount = await db.Count.create({
      email: data.email,
      time: data.time || new Date(),
      countOfDay: data.countOfDay,
    });
    return {
      status: "OK",
      message: "Created count success!!",
      count: newCount,
    };
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};
const plusCount = async (data) => {
  try {
    if (!data.email) {
      return {
        status: "ERROR",
        message: "Missing parameters....",
      };
    }
    let count = await db.Count.findOne({
      where: { id: 1 },
    });

    if (!count) {
      return {
        status: "ERROR",
        message: "The count of days is not exist!!",
      };
    } else {
      let currentDate = new Date().toISOString();
      let currentDateNew = new Date(currentDate);
      let oldDate = count.time.toISOString();
      let oldDateNew = new Date(oldDate);
      if (
        oldDateNew.getFullYear() <= currentDateNew.getFullYear() &&
        oldDateNew.getMonth() <= currentDateNew.getMonth() &&
        oldDateNew.getDate() < currentDateNew.getDate()
      ) {
        count.countOfDay += 1;
        count.email = data.email;
        count.time = currentDateNew;
        await count.save();
        return {
          status: "OK",
          message: "Count of day success",
          count: count,
        };
      } else {
        return {
          status: "ERROR",
          message: "You was count of day today!!",
        };
      }
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: e.toString(),
    };
  }
};

const getDay = async (data) => {
  try {
    let count = await db.Count.findOne({
      where: { id: 1 },
    });
    if (!count) {
      return {
        status: "ERROR",
        message: "Count is not exist!",
      };
    } else {
      return {
        status: "OK",
        message: "Get count is success!!",
        count: count,
      };
    }
  } catch (e) {
    return {
      status: "ERROR",
      message: "Error from server...",
    };
  }
};

module.exports = {
  createCount,
  plusCount,
  getDay,
};
