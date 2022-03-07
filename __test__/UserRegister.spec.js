const request = require('supertest');
const app = require('../src/app');

describe('User Registration', () => {
  it('returns 200 OK when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
    // .expect(200, done);
  });

  it('returns success message when signup request is valid', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then((res) => {
        expect(res.body.message).toBe('User created');
        done();
      });
    // .expect(200, done);
  });
});
