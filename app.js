require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");

const multer = require("multer");
const path = require("path");

const router = require("./routes");

const PORT = process.env.PORT || "3000";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "rahasia",
    saveUninitialized: true,
    resave: true,
  })
);

// biar bisa baca static file
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "IMG-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

app.use(upload.single("photo"));
// Definisikan path absolut ke direktori uploads
const uploadsPath = path.join(__dirname, "uploads");

// Gunakan path absolut dalam middleware untuk menentukan lokasi uploads
app.use(express.static(uploadsPath));

app.use(flash());
app.use(morgan("dev"));
app.use(router);

app.listen(PORT, () => {
  console.log(`SERVER JALAN DI PORT : ${PORT}`);
});
