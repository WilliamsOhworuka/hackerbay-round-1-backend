import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import jimp from 'jimp';
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

  it('should return error if authorization error is not present', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .send({
        url: 'https://www.gla.ac.uk/media/Media_677663_smxx.jpg',
      });

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('error');
  });

  it('should return error if token is invalid', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', 'bearerjsjd.wefwnefiwengwer,wr,grew,gw,r')
      .send({
        url: 'https://www.gla.ac.uk/media/Media_677663_smxx.jpg',
      });

    expect(response).to.have.status(401);
    expect(response.body).to.have.property('error');
  });

  it('should return error for empty required field', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', `bearer ${token}`)
      .send({
        url: undefined,
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid url', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'safsdsgdfhfghjgfhfghfg',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error with status 500 for unexpected errors', async () => {
    const cb = sinon.stub(jimp, 'read');
    cb.throws(new Error());

    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'https://www.gla.ac.uk/media/Media_677663_smxx.jpg',
      });

    expect(response).to.have.status(500);
    expect(response.body).to.have.property('error');
    expect(response.body).to.have.property('status');
    cb.restore();
  });

  it('should return error for non image url', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'https://www.youtube.com/',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return status 200 for a valid image url', async () => {
    const response = await chai
      .request(app)
      .post('/resize-thumbnail')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'https://www.gla.ac.uk/media/Media_677663_smxx.jpg',
      });

    expect(response).to.have.status(200);
  });
});
