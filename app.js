import express, { json, urlencoded } from "express";
const app = express();
import postRoutes from "./src/routes/postRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import errorHandler from "./src/middlewares/errorhandler.js"; // Import the error handler middleware
import db from "./src/models/Index.js";
import path from "path"; // Import
import { fileURLToPath } from "url"; // Import the fileURLToPath function

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); // Get the directory path
// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize
  .sync()
  .then(() => {
    console.log("Database synchronization successful.");
  })
  .catch((error) => {
    console.error("Database synchronization failed:", error);
  });

db.sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

// Serve static files
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));

// Set views directory and view engine
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use("/posts", postRoutes); // Mount routes at the root path
app.use("/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
