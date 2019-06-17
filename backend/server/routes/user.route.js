const { userController } = require('../controllers');
const { auth } = require('../middleware/auth');

module.exports = (app) => {
    app.post('/api/user', auth, userController.create);
    app.post('/api/login', userController.login);
    app.get('/api/users', auth, userController.allUsers);
};
