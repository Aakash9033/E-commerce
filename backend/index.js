const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jet = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Product = require("./model/product");

app.use(express.json());
app.use(cors());

// Database connection with mongodb
mongoose
  .connect(
    "mongodb+srv://Aakash:Aakash1999@cluster0.r5mslfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("mongo is connected");
  })
  .catch((err) => {
    console.log("problem in connection with mongo db: " + err);
  });

// API creation

app.get("/", (req, res) => {
  res.send("Express App is running");
});
// Creating End point for add product

app.post("/addproduct", async (req, res) => {
  const product = new Product({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    Success: true,
    name: req.body.name,
  });
});

// Image storage Engine

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating Upload Endpoint for Images
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    Success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port " + port);
  } else {
    console.log("Error: " + error);
  }
});
