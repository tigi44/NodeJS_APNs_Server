const UseCase = require('./UseCase')

class GetPemFilePathUseCase extends UseCase {

  execute(dirPath) {

    return this.repository.findPemFile(dirPath).then(pemFile => {
      return dirPath + pemFile
    })
  }
}

module.exports = GetPemFilePathUseCase
