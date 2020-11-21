import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import jsonPatch from 'fast-json-patch';
import sinon from 'sinon';
import app from '../src/app';

chai.use(chaiHttp);
let token;

describe('Check input validation', () => {
  before(async () => {
    const response = await chai.request(app)
      .post('/signin')
      .send({
        email: 'wii@gmail.com',
        password: 'dsjdfjfdj',
      });

    token = response.body.token;
  });

  it('should return error if jsonObject is missing', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: [
          { op: 'replace', path: '/firstName', value: 'Joachim' },
        ],
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error if patch is missing', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        jsonObject: { a: 1 },
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid patch', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: 'sjs',
        jsonObject: { a: 1 },
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid patch operation', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: [
          { op: 'replce', path: '/firstName', value: 'Joachim' },
          { op: 'addd', path: '/lastName', value: 'Wester' },
          { op: 'addd', path: '/contactDetails/phoneNumbers/0', value: { number: '555-123' } },
        ],
        jsonObject: { a: 1 },
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid json object', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: [
          { op: 'replace', path: '/firstName', value: 'Joachim' },
        ],
        jsonObject: 'djjddjdjd',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return status 500 for unexpected errors', async () => {
    const cb = sinon.stub(jsonPatch, 'applyPatch');
    cb.throws(new Error());

    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: [
          { op: 'replace', path: '/firstName', value: 'Joachim' },
        ],
        jsonObject: { firstName: 'Albert', contactDetails: { phoneNumbers: [] } },
      });

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('status');
    cb.restore();
  });

  it('should return status 200 for a valid patch and object', async () => {
    const response = await chai
      .request(app)
      .post('/patch-json')
      .set('authorization', `bearer ${token}`)
      .send({
        patch: [
          { op: 'replace', path: '/firstName', value: 'Joachim' },
        ],
        jsonObject: { firstName: 'Albert', contactDetails: { phoneNumbers: [] } },
      });

    expect(response).to.have.status(200);
  });
});
