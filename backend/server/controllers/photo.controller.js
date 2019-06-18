const {photo, user} = require('../models');
const fs = require('fs');
const path = require('path');
const {thumb} = require('node-thumbnail');

const create = (req, res) => {
  const body = req.body;

  photo.create(body)
    .then(photo => {
      res.status(200).send({photo})
    })
    .catch( err => {
      res.status(500).send({message: 'Errore nella creazione della fotografia', err});
    });
}

const update = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  photo.findByPk(id)
    .then( photo => {
      photo.update(body)
        .then( () => res.status(200).send(photo))
        .catch( err => res.status(500).send({message: 'Errore di aggiornamento', err}));
    })
    .catch( err => {
      return res.status(500).send({message: 'Errore nell\'aggiornare la foto', err});
    })
};

const photoUpload = (req, res) => {
  const id = req.params.id;
  if(req.files) {
    const filePath = req.files.photo.path;
    const fileSplit = filePath.split('/');
    const fileName = fileSplit[fileSplit.length - 1];
    const ext = fileName.split('\.');
    const fileExt = ext[1];
    if(fileExt === 'jpg') {
      const photoWithFileName = {};
      photoWithFileName.fileName = fileName;
      photo.findByPk(id)
        .then( photo => {
          photo.update(photoWithFileName)
            .then(() => {
              const newePath = './server/uploads/photos/' + fileName;
              const thumbPath = './server/uploads/photos/thumbs';
              thumb({
                source: path.resolve(newePath),
                destination: path.resolve(thumbPath),
                width: 200,
                suffix: ''
              }).then(
                res.status(200).send(photo)
              ).catch(err => res.status(500).send({message: 'Impossibile creare la thumbnail'}));
            })
            .catch(err => {
              deleteFile(filePath, res);
              return res.status(500).send({message: 'Ops... impossibile aggiornare la fotografia'})
            });
        })
        .catch( err => {
          deleteFile(filePath, res);
          return res.status(500).send({message: 'Ops..impossibile trovare la fotografia'})
        })
    } else {
      deleteFile(filePath, res);
      return res.status(500).send({message: 'Estensione file non supportata'});
    }
  } else {
    return res.send(400).send({message:'Nessuna fotografia selezionata'});
  }
};

const get = (req, res) => {
  const photoRequested = req.params.photo;
  const isThumb =  (!(req.params.thumb === undefined || req.params.thumb.toLowerCase() === 'false'));
  console.log(isThumb, isThumb === true);
  if(!isThumb) {
    var pathPhoto = './server/uploads/photos/' + photoRequested;
  } else {
    var pathPhoto = './server/uploads/photos/thumbs/' + photoRequested;
  }


  console.log('=>', pathPhoto);
  fs.exists(pathPhoto, exists => {
      if (exists) {
        res.status(200).sendFile(path.resolve(pathPhoto));
      } else {
        res.status(404).send({message: 'Foto inesistente sul server'});
      }
  });
};

const getAll = (req, res) => {
  photo.findAll({
    where: {
      isActive: true
    },
    order: [
      ['createdAt', 'ASC']
    ]
  }).then( photos => {
    res.status(200).send({photos});
  }).catch(err => {
    res.status(500).send({message: "Ops.. problema nel prelevare le fotografie"})
  });
}

const getAllAdmin = (req, res) => {
  photo.findAll({
    order: [
      ['createdAt', 'ASC']
    ]
  }).then( photos => {
    res.status(200).send({photos});
  }).catch(err => {
    res.status(500).send({message: "Ops.. problema nel prelevare le fotografie"})
  });
}

function deleteFile(filePath, res) {
  fs.unlink(filePath, err => {
    if(err){
      res.status(500).send({message:'Impossibile cancellare il file dal server'});
    }
  });
}

module.exports = {
  create,
  update,
  photoUpload,
  get,
  getAll,
  getAllAdmin
};
