const express = require('express');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

let server;

chai.use(chaiHttp);

describe('All In One Product Review Application', () => {
  before(() => {
    return runServer();
  });

  after(() => {
    return closeServer();
  });

  it('should get status 200 when loading root url', () => {
    return chai.request(app)
      .get('/index.html')
      .then((res) => {
        expect(res).to.have.status(200);
      });
  });
});

