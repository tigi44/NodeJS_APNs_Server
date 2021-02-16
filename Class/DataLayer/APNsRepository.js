const APNsRepositoryInterface = require('../DomainLayer/RepositoryInterface/APNsRepositoryInterface')

class APNsRepository extends APNsRepositoryInterface {

  sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData) {
    return this.dataSource.sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData)
  }
}

module.exports = APNsRepository;
