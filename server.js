const app = require('./app');
const db = require("./db/index");
const port = process.env.PORT || 3000;

db.connect().then(() => {
    app.listen(port, () => {
        console.log("Server started");
    })
}).catch(error => {
    console.log('cought', error.message);
});