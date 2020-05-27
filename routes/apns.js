const express = require('express');
const router  = express.Router();
const fs      = require('fs');
const path    = require('path');
const multer  = require('multer');
const apn     = require('../routes/modules/sendApns');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {

    var uploadPath = (file.fieldname.includes('cert')) ? apn.certDirPath : apn.keyDirPath

    if (!fs.existsSync(uploadPath)){
      fs.mkdirSync(uploadPath)
    }

    callback(null, uploadPath)
  }
  ,
  filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename  = path.basename(file.originalname, extension);
    let today     = new Date().toLocaleString().replace(new RegExp(/-/, 'g'), '').replace(/ /, '').replace(/T/, '').replace(new RegExp(/:/, 'g'), '').replace(/\..+/, '')
    callback(null, basename + '_upload_' + today + extension);
  }
});
const upload = multer({ storage: storage });


router.get('/', function(req, res, next) {

  res.render('apns', {
    title: 'APNs Server',
    certFileName: path.basename(apn.certificationFilePath()),
    keyFileName: path.basename(apn.keyFilePath())
  })
});

router.post('/apns/upload/certfile', upload.single('certFile'), function(req, res, next) {
  res.redirect(req.get('referer'));
});

router.post('/apns/upload/keyfile', upload.single('keyFile'), function(req, res, next) {
  res.redirect(req.get('referer'));
});

router.post('/apns/sendpush', function(req, res, next) {
  var json = req.body;

  if (json.token && json.appId) {
    apn.push(json.production, json.appId, json.token, json.notification, function(errorMessage){
      if (errorMessage) {
        res.status(205);
        res.json(errorMessage);
      } else {
        res.json("Success Send Push!!");
      }
    });
  } else {
    res.json("Empty Token or AppId..");
  }
});

module.exports = router;
