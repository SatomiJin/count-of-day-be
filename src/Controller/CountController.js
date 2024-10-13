import CountService from "../Service/CountService";
const createCount = async (req, res) => {
  try {
    let response = await CountService.createCount(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server",
    });
  }
};
const plusCount = async (req, res) => {
  try {
    let response = await CountService.plusCount(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server",
    });
  }
};

const getDay = async (req, res) => {
  try {
    let response = await CountService.getDay(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      status: "ERROR",
      message: "Error from server",
    });
  }
};
module.exports = {
  createCount,
  plusCount,
  getDay,
};
