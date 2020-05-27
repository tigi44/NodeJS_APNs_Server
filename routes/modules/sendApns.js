const apn   = require('apn');
const fs    = require('fs');
const path  = require('path');

const sandboxGateway = 'gateway.sandbox.push.apple.com';
const gateway        = 'gateway.push.apple.com';

module.exports = {
  certDirPath : './apns/keys/cert/',
  keyDirPath : './apns/keys/key/',
  pemFileName : function(dirPath) {

    var fileName
    let files = fs.readdirSync(dirPath);
    files.sort(function(a, b) {
      return fs.statSync(dirPath + b).mtime.getTime() - fs.statSync(dirPath + a).mtime.getTime();
    });

    for (key in files) {

      let file = files[key]
      if (path.extname(file) === '.pem') {
        fileName = file
        break
      }
    }

    return fileName
  },
  certificateFilePath : function() {

    let dirPath = this.certDirPath
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath)
    }

    return dirPath + this.pemFileName(dirPath)
  },
  keyFilePath : function() {

    let dirPath = this.keyDirPath
    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath)
    }

    return dirPath + this.pemFileName(dirPath)
  },
  options : {
    // token: {
    //   key: "path/to/APNsAuthKey_XXXXXXXXXX.p8",
    //   keyId: "key-id",
    //   teamId: "developer-team-id"
    // },
    // proxy: {
    //   host: "192.168.10.92",
    //   port: 8080
    // },

    cert: './apns/keys/cert/cert.pem',
    key: './apns/keys/ket/key.pem',
    production: false
  },
  push : function(production, appId, token, noteJson, sendPushResultCallback) {
    if (!appId || !token || noteJson == null) {
      return;
    }

    var options = this.options;

    options.production = production ? true : false;
    options.cert       = this.certificateFilePath()
    options.key        = this.keyFilePath()

    var apnProvider  = new apn.Provider(options);
    var notification = new apn.Notification();

    notification.badge    = noteJson.aps.badge;
    notification.sound    = noteJson.aps.sound;
    notification.alert    = noteJson.aps.alert;
    notification.threadId = noteJson.aps["thread-id"];
    notification.category = noteJson.aps["category"];

    delete noteJson.aps;
    notification.payload  = noteJson;
    notification.topic    = appId;

    console.log("=== Start APNs Push ====");
    console.log("gateway : " + (options.production ? gateway : sandboxGateway));
    console.log("production : " + options.production);
    console.log("appId : " + appId);
    console.log("token : " + token);
    console.log("notification : " + JSON.stringify(notification));

    apnProvider.send(notification, token).then( (result) => {
      var errorMessage;

      if (result.failed.length > 0) {
        console.log("=== Error Fail to send push : " + JSON.stringify(result));
        errorMessage = result.failed;
        isSuccess = false;
      }

      sendPushResultCallback(errorMessage);
      console.log("=== End APNs Push ====");
    });
  }
};
