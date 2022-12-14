const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

//config Express App
const app = express();
app.use(express.json());
app.use(cors());

//config PORT
const PORT = process.env.PORT || 5000;

//config MongoDB
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () =>
    console.log("MongoDB connection has been established!")
);

//config routes
const blogsRouter = require("./routes/blog");
const authRouter = require("./routes/auth");

app.use("/auth", authRouter);
app.use("/server/posts", blogRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("frontend/build"));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../frontend", "build", "index.html")
        );
    });
}

app.listen(PORT, () => console.log(`Server is running at PORT ${PORT}!`));