const { photoController } = require('../controllers');
const { auth } = require('../middleware/auth');
const cm = require('connect-multiparty');
const uploadPhoto = cm({uploadDir:'./server/uploads/photos'});

module.exports = (app) => {
  app.post('/api/photo', auth, photoController.create);
  app.put('/api/photo/:id', auth, photoController.update);
  app.post('/api/photo/:id', [auth, uploadPhoto], photoController.photoUpload);

};
