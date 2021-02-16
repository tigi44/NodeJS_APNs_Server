const UseCase = require('./UseCase')

class SendPushUseCase extends UseCase {

  execute(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData) {

    return this.repository.sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData)
  }
}

module.exports = SendPushUseCase
