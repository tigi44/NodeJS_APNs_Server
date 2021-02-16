const FileRepositoryInterface = require('../DomainLayer/RepositoryInterface/FileRepositoryInterface')

class FileRepository extends FileRepositoryInterface {

  findPemFile(dirPath) {
    return Promise.resolve(this.dataSource.findPemFile(dirPath))
  }
}

module.exports = FileRepository;
