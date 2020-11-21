import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);

describe('Check input validation', () => {
  it('should return error if email is empty', async () => {
    const response = await chai
      .request(app)
      .post('/sigssSSA')
      .send({
        password: 'ohwsassa',
      });

    expect(response).to.have.status(404);
  });

  it('should return error if email is empty', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        password: 'ohwsassa',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error if password is empty', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        email: 'ohwil@and.com',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid email', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        password: 'ohwilqdq',
        email: 'wiwi',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return status 200 for valid inputs', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        password: 'ohwiasda9',
        email: 'wiwi@gmail.com',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  });
});
