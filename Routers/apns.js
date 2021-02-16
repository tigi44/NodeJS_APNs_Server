const express = require('express');
const router  = express.Router();
const path    = require('path');

const PemFileService = require('../Class/ServiceLayer/PemFileService')
const pemFileService = new PemFileService()

const APNsService = require('../Class/ServiceLayer/APNsService')
const apnsService = new APNsService()


router.get('/', function(req, res, next) {

  pemFileService.getCertPemFilePath().then(certPemFilePath => {
    pemFileService.getKeyPemFilePath().then(keyPemFilePath => {

      res.render('apns', {
        title: 'APNs Server',
        certFileName: path.basename(certPemFilePath),
        keyFileName: path.basename(keyPemFilePath)
      })
    })
  })
});

router.post('/apns/upload/certfile', pemFileService.uploader.single('certFile'), function(req, res, next) {
  res.redirect(req.get('referer'));
});

router.post('/apns/upload/keyfile', pemFileService.uploader.single('keyFile'), function(req, res, next) {
  res.redirect(req.get('referer'));
});

router.post('/apns/sendpush', function(req, res, next) {
  var json = req.body;

  if (json.token && json.appId) {
    apnsService.sendPush(json.production, json.appId, json.token, json.notification).then(result => {
      res.json("Success Send Push!!");
    }).catch(error => {
      res.status(205);
      res.json(error.message);
    })
  } else {
    res.json("Empty Token or AppId..");
  }
});

module.exports = router;
