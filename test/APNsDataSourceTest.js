const should     = require('should')
const DataSource = require('../Class/DataLayer/APNsDataSource')

describe('** APNsDataSource Class test **', function () {

  let dataSource
  let certPemFilePath = 'apns/keys/cert/test_cert.pem'
  let keyPemFilePath  = 'apns/keys/key/test_key.pem'
  let isProduction    = false
  let appId           = 'com.tigi44.app'
  let token           = 'token'
  let jsonData        = {aps: {}}

  before(function(){
    dataSource = new DataSource()
  })

  it('Test sendPush', async() => {
    await dataSource.sendPush(certPemFilePath, keyPemFilePath, isProduction, appId, token, jsonData).then(result => {
      should.not.exist(result)
    }).catch(error => {
      should(error.message).be.ok;
    })
  });
});
