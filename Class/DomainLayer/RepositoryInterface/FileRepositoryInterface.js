class FileRepositoryInterface {

  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  findPemFile(dirPath) {}
}

module.exports = FileRepositoryInterface;
