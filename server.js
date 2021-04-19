const app = require('./app');
const db = require("./db/index");

//Connect to DB
db.connect().then(() => {
    app.listen(3000, () => {
        console.log("Server started");
    })
}).catch(error => {
    console.log('cought', error.message);
});