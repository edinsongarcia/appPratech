const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        dateBirth: req.body.dateBirth,
        gender: req.body.gender,
        country: req.body.country,
        acceptTC: req.body.acceptTC
    };

    User.create(newUser, (err, user) => {
        if (err && err.code === 11000) return res.status(409).send('Este correo ya existe');
        if (err) return res.status(500).send('Error en el servidor!');
        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id },
            SECRET_KEY, {
                expiresIn: expiresIn
            });
        const dataUser = {
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        };
        // response 
        res.send({ dataUser });
    });
};

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    };
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) return res.status(500).send('Error en el servidor!');
        if (!user) {
            // email does not exist
            res.status(409).send({ message: 'El email suministrado no se encuentra registrado' });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });

                const dataUser = {
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                };
                res.send({ dataUser });
            } else {
                // password wrong
                res.status(409).send({ message: 'Contraseña incorrecta' });
            }
        }
    });
};

exports.UpdateUser = (req, res, next) => {
    var id = req.body._id;
    var body = req.body;
    console.log(id);
    User.findByIdAndUpdate(id, body, { new: true }, (err, user) => {
        if (err) {
            return res.status(500).send('Error en el servidor!');
        }

        const newUser = {
            id: req.body._id,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            dateBirth: req.body.dateBirth,
            gender: req.body.gender,
            country: req.body.country,
            acceptTC: req.body.acceptTC
        };

        User.save(newUser, (err, user) => {
            if (err) {
                return res.status(400).send('Error al actualizar!');
            }
            res.status(200).send({ message: 'Actualizado con exito' });
        });
    });
};


exports.findAll = (req, res, next) => {
    User.getUsers({}, (err, users) => {
        res.status(200).send(users);
    });
};

exports.findUser = (req, res, next) => {
    User.getUsers({}, (err, users) => {
        res.status(200).send(users);
    });
};

exports.deleteUser = (req, res, next) => {
    var id = req.body._id;
    User.findByIdAndDelete(id, (err, deleteUserId) => {
        if (err) {
            res.status(500).send({ message: 'Algo salio mal eliminando el usuario' });
        }
        res.status(200).send({ message: 'Eliminado con exito' });
    });
};