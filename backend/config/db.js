const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    mongoose.connect(dbURL, { useNewUrlParser: true })
        .then(() => console.log(`DB successfully connected`))
        .catch(err => console.log(`Connection has error ${err}`))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`DB is disconnected`);
            process.exit(0)
        });
    });
}