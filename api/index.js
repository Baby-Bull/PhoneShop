const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(helmet());

const authRoute = require("./routes/auth")
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const commentRoute = require("./routes/comment");

mongoose.connect('mongodb://localhost:27017/E-Commerce-Phone', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("database has been connected");
});


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/comment", commentRoute);


app.listen(8000, () => {
    console.log("Backend server is running");
})