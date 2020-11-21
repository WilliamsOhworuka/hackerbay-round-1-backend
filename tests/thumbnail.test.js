import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
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

  it('should return error for empty required field', async () => {
    const response = await chai
      .request(app)
      .post('/resize')
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
      .post('/resize')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'safsdsgdfhfghjgfhfghfg',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for non image url', async () => {
    const response = await chai
      .request(app)
      .post('/resize')
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
      .post('/resize')
      .set('authorization', `bearer ${token}`)
      .send({
        url: 'https://www.gla.ac.uk/media/Media_677663_smxx.jpg',
      });

    expect(response).to.have.status(200);
  });

  // it('should return status 200 for valid inputs', async () => {
  //   const response = await chai
  //     .request(app)
  //     .post('/signin')
  //     .send({
  //       password: 'ohwill949',
  //       email: 'wiwi@gmail.com',
  //     });

  //   expect(response).to.have.status(200);
  //   expect(response.body).to.have.property('token');
  // });
});
