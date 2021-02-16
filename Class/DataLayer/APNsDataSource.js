const apn    = require('apn')
const Logger = require('../../Modules/Logger')

const sandboxGateway = 'gateway.sandbox.push.apple.com';
const gateway        = 'gateway.push.apple.com';

class APNsDataSource {

  options = () => { return {
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
  }
  }

  sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData) {
    if (!certPemFilePath || !keyPemFilePath || !appId || !token || jsonData == null || jsonData.aps == null) {
      return Promise.reject(new Error('Error : send push parameter'));
    }

    var options = this.options;

    options.production = isProduction ? true : false;
    options.cert       = certPemFilePath
    options.key        = keyPemFilePath

    var apnProvider  = new apn.Provider(options);
    var notification = new apn.Notification();

    notification.badge    = jsonData.aps.badge;
    notification.sound    = jsonData.aps.sound;
    notification.alert    = jsonData.aps.alert;
    notification.threadId = jsonData.aps["thread-id"];
    notification.category = jsonData.aps["category"];

    delete jsonData.aps;
    notification.payload  = jsonData;
    notification.topic    = appId;

    Logger.debug("=== Start APNs Push ====");
    Logger.debug("gateway : " + (options.production ? gateway : sandboxGateway));
    Logger.debug("production : " + options.production);
    Logger.debug("appId : " + appId);
    Logger.debug("token : " + token);
    Logger.debug("notification : " + JSON.stringify(notification));

    return apnProvider.send(notification, token).then( (result) => {
      if (result.failed.length > 0) {
        Logger.debug("=== Error Fail to send push : " + JSON.stringify(result));
        throw new Error(JSON.stringify(result.failed));
      }
      Logger.debug("=== End APNs Push ====");
    });
  }
}

module.exports = APNsDataSource;
