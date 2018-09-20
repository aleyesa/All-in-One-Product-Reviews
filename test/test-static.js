import chai from 'chai';
import chaiHttp from 'chai-http';
import {
  app,
  runServer,
  closeServer
} from '../server';

const expect = chai.expect;

chai.use(chaiHttp);

describe('All In One Product Review Application', () => {
  before(() => {
    //start mongoose connections
    return runServer();
  });

  after(() => {
    return closeServer();
  });

  it('should get status 200 when loading root url', () => {
    return chai.request(app)
      .get('/')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});

