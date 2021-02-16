const app               = require('../app');
const supertest         = require('supertest');
const should            = require('should');

describe('** TEST API Integration **', function () {
  let request = null

  before(function(){
    request = supertest.agent(app)
  })

  after(function(done){
    app.close(done)
  })

  describe('** Integration test **', function () {
    it('Test url : /', function (done) {
      request
        .get('/')
        .expect(200)
        .end((err, res) => {
          should.not.exist(err)
          should.exist(res)
          should.exist(res.text);

          done()
        })
    });
  });
});
