import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  let error = { ...err };
  error.statusCode = err.statusCode || 500;
  error.message = err.message || "Internal server error";

  // Handling expired JWT token error
  if (err.name === "TokenExpiredError") {
    const message = "JSON web token is expired try again";
    error = new ErrorHandler(message, 401);
    err.statusCode = 401;
  }

  if (err.errno === 1062) {
    error = new ErrorHandler("نام کاربری تکراری", 409);
    err.statusCode = 409;
  }

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode || 500).json({
      success: false,
      error,
      message: error.message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "production") {
    res.status(err.statusCode || 500).json({
      success: false,
      message: error.message || "internal server error",
    });
  }
};


