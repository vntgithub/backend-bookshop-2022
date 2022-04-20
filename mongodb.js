const mongoose = require("mongoose");
module.exports = {
    connection: () => {
        const uri = process.env.LOCAL_MONGODB_URI;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        const connection = mongoose.connection;
        connection.once("open", () => {
            console.log("MongoDB databse connection enstablished successfully");
        });
    }
} 