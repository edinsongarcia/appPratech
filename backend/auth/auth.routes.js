const Users = require('./auth.controller');
module.exports = (router) => {
    router.post('/register', Users.createUser);
    router.post('/login', Users.loginUser);
    router.get('/home', Users.findAll);
    router.put('/home', Users.deleteUser);
};