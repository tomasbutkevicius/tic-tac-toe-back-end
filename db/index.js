const mongoose = require("mongoose");

function connect() {
    return new Promise((resolve, reject) => {
        let databaseUrl = process.env.DB_CONNECTION;
        if (process.env.DB_LOCAL === 'true') {
            databaseUrl = "mongodb://mongo:27017/docker-node-mongo";
        }
        if (process.env.NODE_ENV === 'test') {
            const Mockgoose = require('mockgoose').Mockgoose;
            const mockgoose = new Mockgoose(mongoose);
            mockgoose.prepareStorage()
                .then(() => {
                    mongooseConnect(databaseUrl, resolve, reject);
                });
        } else {
            mongooseConnect(databaseUrl, resolve, reject);
        }
    });
};

function mongooseConnect(url, resolve, reject) {
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