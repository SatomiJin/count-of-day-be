import NoteService from "../Service/NoteService";
const createNote = async (req, res) => {
  try {
    let response = await NoteService.createNote(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

const getAllNote = async (req, res) => {
  try {
    let response = await NoteService.getAllNote(req.headers);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);

    return res.status(400).json({
      status: "ERROR",
      message: "Error from server...",
    });
  }
};

module.exports = {
  createNote,
  getAllNote,
};
