class APNsRepositoryInterface {

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData) {}
}

module.exports = APNsRepositoryInterface;
