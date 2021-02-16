const SendPushUseCase   = require('../DomainLayer/SendPushUseCase')
const APNsDataSource    = require('../DataLayer/APNsDataSource')
const APNsRepository    = require('../DataLayer/APNsRepository')

const PemFileService = require('./PemFileService')
const pemFileService = new PemFileService()

class APNsService {

  constructor() {
    let apnsRepository = new APNsRepository(new APNsDataSource())

    this.sendPushUseCase = new SendPushUseCase(apnsRepository)
  }

  async sendPush(isProduction, appId, token, jsonData) {
    let certPemFilePath = await pemFileService.getCertPemFilePath()
    let keyPemFilePath  = await pemFileService.getKeyPemFilePath()

    return await this.sendPushUseCase.execute(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData)
  }
}

module.exports = APNsService;
