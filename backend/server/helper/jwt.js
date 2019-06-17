const njwt = require('njwt');
const {token_secret} = require('../config/config');

exports.createToken = (user) => {
  const params = {
    sub: user.id,
    username: user.username,
    id_role: user.id_role
  };

  const jwt = njwt.create(params, token_secret);
  const expire = new Date();
  expire.setHours(expire.getHours() + 2);
  jwt.setExpiration(expire);

  return jwt.compact();


}
