import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

chai.use(chaiHttp);

describe('Check input validation', () => {
  it('should return error for empty required field', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        password: 'ohwill949',
      });

    expect(response).to.have.status(400);
    expect(response.body).to.have.property('errors');
  });

  it('should return error for invalid email', async () => {
    const response = await chai
      .request(app)
      .post('/signin')
      .send({
        password: 'ohwill949',
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
        password: 'ohwill949',
        email: 'wiwi@gmail.com',
      });

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('token');
  });
});
