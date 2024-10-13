import express from "express";
import UserController from "../Controller/UserController";
import JWTService from "../Service/JWTService";
let router = express.Router();

router.post("/create-user", UserController.createNewUser);
router.post("/sign-in", UserController.signIn);
router.get("/get-detail-user", UserController.getDetailUser);
router.post("/refresh-token", JWTService.refreshTokenJwtService);
router.put("/update-profile", UserController.updateProfile);

module.exports = router;
