const mongoose = require("mongoose");

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(
            process.env.DB_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        ).then((res, err) => {
            if (err) return reject(err);
            console.log("db connected");
            resolve();
        })
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = { connect, close };