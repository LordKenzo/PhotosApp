const user = require('../models').user;

function create(req, res) {
    user.create(req.body)
        .then(user => {
            return res.status(200).send({user});
        })
        .catch(err => {
            return res.status(500).send({err});
        })
}

module.exports = {
    create
};
