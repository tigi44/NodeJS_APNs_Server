const should              = require('should')
const path                = require('path')
const RepositoryInterface = require('../Class/DomainLayer/RepositoryInterface/APNsRepositoryInterface')
const UseCase             = require('../Class/DomainLayer/SendPushUseCase')

class MockRepository extends RepositoryInterface {
  sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData) {
    return Promise.resolve()
  }
}

describe('** SendPushUseCase Class test **', function () {

  let useCase

  before(function(){
    useCase = new UseCase(new MockRepository())
  })

  it('Test sendPush', async() => {
    await useCase.execute().then(result => {
      should(result).not.be.ok();
    }).catch(error => {
      should(error.message).be.ok;
    })
  });
});
