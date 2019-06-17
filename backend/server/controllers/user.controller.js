const {user} = require('../models');
const { from } = require('rxjs');
const jwt = require('../helper/jwt');

function create(req, res) {
    user.create(req.body)
        .then(user => {
            return res.status(200).send({user});
        })
        .catch(err => {
            return res.status(500).send({err});
        });
}

function allUsers(req, res) {
    user.findAll()
      .then(users => {
          return res.status(200).send({users});
      })
      .catch(err => {
          return res.status(500).send({err});
      });
}

const login = (req, res) => {
    const sub = from(user.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    })).subscribe( (result) => {
      if(result && result.dataValues) {
        const user = result.dataValues;
        if(req.body.token) {
          return res.status(200).send({
            token: jwt.createToken(user)
          });
        } else {
          return res.status(200).send({
            user
          });
        }

      } else {
        return res.status(401).send({mesg: 'Non autorizzato'});
      }
    },
      (err) => res.status(500).send({err, message: 'Errorelogin'}),
      () => {
        console.log('unsubscribe');
        sub.unsubscribe();
      }
    )};


module.exports = {
    create,
    allUsers,
    login
};
