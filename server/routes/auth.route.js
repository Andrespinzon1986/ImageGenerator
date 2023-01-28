import express from "express";
import googlePassport from "../config/passport/google.js";
import facebookPassport from "../config/passport/facebook.js";
import {
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  JWT_REFRESH_SECRET,
  MODE,
} from "../config/index.js";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  userController,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
import JwtService from "../services/JwtService.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const router = express.Router();

// REGISTER

router.post("/register", registerController.register);

// LOGIN

router.post("/login", loginController.login);

// LOGOUT

router.post("/logout", authenticate, logoutController.logout);

// WHO AM I

router.get("/me", authenticate, userController.me);

// REFRESH TOKEN

router.post("/refreshtoken", refreshTokenController.refresh);

// GOOGLE OAUTH

router.get("/login/failed", (req, res) => {
  return next(CustomErrorHandler.unAuthorised());
});

router.get(
  "/google",
  googlePassport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  googlePassport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  loginController.oAuthLoginSuccess
);

// Facebook oauth

router.get(
  "/facebook",
  facebookPassport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/facebook/callback",
  facebookPassport.authenticate("facebook", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  loginController.oAuthLoginSuccess
);

export default router;
