const mongoose = require("mongoose");
module.exports = {
    connection: () => {
        const uri = process.env.ATLAS_URI;
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        const connection = mongoose.connection;
        connection.once("open", () => {
            console.log("MongoDB databse connection enstablished successfully");
        });
    }
} 