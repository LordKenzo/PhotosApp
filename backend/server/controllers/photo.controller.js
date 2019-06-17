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
  photoUpload
};
