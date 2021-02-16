const multer                  = require('multer')
const fs                      = require('fs')
const path                    = require('path')

const GetPemFilePathUseCase   = require('../DomainLayer/GetPemFilePathUseCase')

const FileDataSource          = require('../DataLayer/FileDataSource')
const FileRepository          = require('../DataLayer/FileRepository')


class PemFileService {

  static pemFileDirPath = {
    certDirPath: './apns/keys/cert/',
    keyDirPath: './apns/keys/key/'
  }

  uploader = multer({ storage: multer.diskStorage({
    destination: function (req, file, callback) {

      var uploadPath = (file.fieldname.includes('cert')) ? PemFileService.pemFileDirPath.certDirPath : PemFileService.pemFileDirPath.keyDirPath

      if (!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath, { recursive: true })
      }

      callback(null, uploadPath)
    }
    ,
    filename: function (req, file, callback) {
      let extension = path.extname(file.originalname);
      let basename  = path.basename(file.originalname, extension);
      let today     = new Date().toISOString().replace(new RegExp(/-/, 'g'), '').replace(/ /, '').replace(/T/, '').replace(new RegExp(/:/, 'g'), '').replace(/\..+/, '')
      callback(null, basename + '_upload_' + today + extension);
    }
  })})


  constructor() {
    let fileRepository = new FileRepository(new FileDataSource())

    this.getPemFilePathUseCase = new GetPemFilePathUseCase(fileRepository)
  }

  getCertPemFilePath() {
    return this.getPemFilePathUseCase.execute(PemFileService.pemFileDirPath.certDirPath)
  }

  getKeyPemFilePath() {
    return this.getPemFilePathUseCase.execute(PemFileService.pemFileDirPath.keyDirPath)
  }
}

module.exports = PemFileService;
