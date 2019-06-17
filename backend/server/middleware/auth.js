const njwt = require('njwt');
const {token_secret} = require('../config/config');

const auth = (req, res, next) => {
  if(!req.headers.authorization) {
    return res.status(403).send({msg: 'La richiesta è priva del token di autorizzazione'});
  }
  // elimino eventuali apici o doppi apici
  token = req.headers.authorization.replace(/['"]+/g, '');
  if (token.startsWith('Bearer ')) {
    // Elimino Bearer dalla stringa
    token = token.slice(7, token.length).trimLeft();
  } else {
    return res.status(403).send({msg: 'Token malformed'});
  }

  const payload = njwt.verify(token, token_secret, (err, verifiedJwt) => {
    if(err) {
      // token non valido o token scaduto
      return res.status(401).send({message: 'Accesso non autorizzato'});
    } else {
      // il middleware passa la gestione al prossimo middleware
      next();
    }
  });
};

module.exports = {auth};
