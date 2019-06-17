const {helloController} = require('../controllers');

module.exports = (app) => {
    app.get('/api/hello',helloController.world);
};
