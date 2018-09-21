import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../dev/server';

chai.use(chaiHttp);

const connection = chai.request(app.listen(8081));
const expect = chai.expect;

describe('All In One Product Review Application', () => {
  before(() => {
    connection.keepOpen();
  });

  after(() => {
    connection.close(console.log('Test completed, connection closed.'));
  });

  it('should get status 200 when loading root url', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});


