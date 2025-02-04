import express from "express";
import { qrcode } from "./controller/queryController.js";
const router = express.Router();

router
  .route("/qrcode")
  .post(
    // body("username")
    //   .exists()
    //   .withMessage(strings.VALID_ERROR_USERNAME_NOT_EXISTS)
    //   .isString()
    //   .isLength({ min: 4 })
    //   .withMessage(strings.VALID_ERROR_SHORT_USERNAME)
    //   .isString()
    //   .isLength({ max: 64 })
    //   .withMessage(strings.VALID_ERROR_LONG_USERNAME),
    // body("password")
    //   .exists()
    //   .withMessage(strings.VALID_ERROR_PASSWORD_NOT_EXISTS)
    //   .isString()
    //   .isLength({ min: 8 })
    //   .withMessage(strings.VALID_ERROR_SHORT_PASSWORD)
    //   .isString()
    //   .isLength({ max: 32 })
    //   .withMessage(strings.VALID_ERROR_LONG_PASSWORD),
    qrcode
  );

export default router;