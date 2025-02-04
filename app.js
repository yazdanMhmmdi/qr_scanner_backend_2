// Import libs
import express from "express";
import cors from "cors";

const app = express();

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down server due to uncaught exception.");
  process.exit(1);
});

// Import routes
import { connectDatabase } from "./config/dboprations.js";
import errorMiddleware from "./middlewares/errors.js";
import ErrorHandler from "./utils/errorHandler.js";

import { qrcode } from "./controller/queryController.js";
connectDatabase().then(async (sql) => {
  console.log(`database connected.`);

  // Spread db connection pool all over application
  app.locals.sql = sql;
  // Setup CORS - Accessible from other domains
  app.use(cors());

  app.use(express.json());


  // Register routes
  app.use("/api/", qrcode);

  // Handle unhandled route
  app.use("*", (req, res, next) => {
    next(new ErrorHandler(`${req.originalUrl} route not found`, 404));
  });

  // Middleware to handle errors
  app.use(errorMiddleware);

  const PORT = 3001;

  const server = app.listen(PORT, () => {
    console.log(
      `Server is started on port ${PORT} in ${process.env.NODE_ENV} mode.`
    );
  });
});

// Handle unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  // console.log("Shutting down the server due to unhandled promise rejection.");
  // server.close(() => {
  //   process.exit(1);
  // });
});


