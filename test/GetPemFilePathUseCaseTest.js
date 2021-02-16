const should              = require('should')
const path                = require('path')
const RepositoryInterface = require('../Class/DomainLayer/RepositoryInterface/FileRepositoryInterface')
const UseCase             = require('../Class/DomainLayer/GetPemFilePathUseCase')

class MockRepository extends RepositoryInterface {
  findPemFile(dirPath) {
    return Promise.resolve('exampleFile.pem')
  }
}

describe('** GetPemFilePathUseCase Class test **', function () {

  let useCase
  let dirPath = 'apns/keys/cert/'

  before(function(){
    useCase = new UseCase(new MockRepository())
  })

  it('Test createJsonFile', async() => {
    await useCase.execute(dirPath).then(file => {
      should(file).be.ok();
      should(path.extname(file)).be.exactly(".pem")
    })
  });
});
