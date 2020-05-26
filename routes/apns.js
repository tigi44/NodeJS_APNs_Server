var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var apn     = require('../routes/modules/sendApns');

router.get('/', function(req, res, next) {

  res.render('apns', {
    title: 'APNs Server'
  })
});

router.post('/apns/sendpush', function(req, res, next) {
  var json = req.body;

  if (json.token && json.appId) {
    apn.push(json.production, json.appId, json.token, json.notification, function(errorMessage){
      if (errorMessage) {
        res.status(205);
        res.json(errorMessage);
      } else {
        res.json("Success Push!!");
      }
    });
  } else {
    res.json("Empty Token or AppId..");
  }
});

module.exports = router;
