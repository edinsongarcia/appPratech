const mongoose = require('mongoose');
const authSchema = require('./auth.model');

mongoose.set('useFindAndModify', false);

authSchema.statics = {
    create: function(data, cb) {
        const user = new this(data);
        user.save(cb);
    },
    login: function(query, cb) {
        this.find(query, cb);
    },
    getUsers: function(query, cb) {
        this.find(query, cb);
    },
    deleteUser: function(query, cb) {
        this.delete(query, cb);
    },
    updateUser: function (query, cb) {
        this.update(query, cb);
    }
};

const authModel = mongoose.model('Users', authSchema);
module.exports = authModel;