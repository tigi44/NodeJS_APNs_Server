const path       = require('path')
const should     = require('should')
const DataSource = require('../Class/DataLayer/FileDataSource')

describe('** FileDataSource Class test **', function () {

  let dataSource
  let dirPath = 'apns/keys/cert/'

  before(function(){
    dataSource = new DataSource()
  })

  it('Test findPemFile', function () {
    let file = dataSource.findPemFile(dirPath)
    should(file).be.ok;
    should(path.extname(file)).be.exactly(".pem")
  });
});
