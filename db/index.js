const mongoose = require("mongoose");

function connect() {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    mongooseConnect(process.env.DB_CONNECTION, resolve, reject);
                });
        } else {
            mongooseConnect(process.env.DB_CONNECTION, resolve, reject);
        }
    });
};

function mongooseConnect(url, resolve, reject){
    mongoose.connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then((res, err) => {
        if (err) return reject(err);
        console.log("db connected");
        resolve();
    })
};

function close() {
    return mongoose.disconnect();
};

module.exports = { connect, close };