const fs   = require('fs');
const path = require('path');

class FileDataSource {
  findPemFile(dirPath) {

    if (!fs.existsSync(dirPath)){
      fs.mkdirSync(dirPath, { recursive: true })
    }

    var pemFileName
    let files = fs.readdirSync(dirPath);

    files.sort(function(a, b) {
      return fs.statSync(dirPath + b).mtime.getTime() - fs.statSync(dirPath + a).mtime.getTime();
    });

    for (var file of files) {
      if (path.extname(file) === '.pem') {
        pemFileName = file
        break
      }
    }

    return pemFileName
  }
}

module.exports = FileDataSource;
