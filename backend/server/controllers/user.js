const user = require('../models').user;

const create = (req, res) => {
    user.create(req.body)
        .then(userCreated => {
            return res.status(200).send({ userCreated });
        })
        .catch(err => {
            return res.status(500).send({ err });
        })
}

const login = async (req, res) => {
    try {
        const userFounded = await user.findOne({
            where: {
                usernsame: req.body.username,
                password: req.body.password
            }
        }).catch(err => res.status(500).send({ 'error': 'Database Error - check SQL' }));
        if (userFounded) {
            res.status(200).send({ user: userFounded });
        } else {
            res.status(401).send({ message: 'Access non autorizzato' })
        }
    } catch (e) {
        res.status(500).send({ 'error': 'Errore richiesta' })
    }
}

module.exports = {
    create,
    login
};
