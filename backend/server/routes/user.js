const userController = require('../controllers').user;

module.exports = (app) => {
    app.post('/api/user', userController.create);
    app.post('/api/login', userController.login);
}
