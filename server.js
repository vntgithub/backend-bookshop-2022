const express = require("express");
const cors = require("cors");
const mongodb = require("./mongodb.js");
require("dotenv").config();

const userRoute = require('./routes/user.route');
const tokenRoute = require('./routes/token.route')

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/tokens', tokenRoute);

app.get("/", (req, res) => {
    res.send("Back end book shop");
})

mongodb.connection()

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})