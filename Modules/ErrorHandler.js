const path       = require('path');

module.exports = {
  errorNotFound: function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404
    next(err);
  },
  errorHandler: function (err, req, res, next) {
    var contentType = req.headers['content-type'];

    err.status = err.status || 500;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status);

    if (path.extname(req.path) == '.json' || contentType == 'application/json') {

      res.json(err.message);
    } else {

      res.render('error');
    }
  }
}
