const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

beforeAll(async () => {
  await sequelize.sync();
});

beforeEach(() => {
  // clearing all tables
  return User.destroy({ truncate: true });
});

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
  });

  it('save the user to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((userList) => {
          expect(userList.length).toBe(1);
          done();
        });
      });
  });

  it('save the user name and email to database', (done) => {
    request(app)
      .post('/api/1.0/users')
      .send({
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      })
      .then(() => {
        // query user table
        User.findAll().then((userList) => {
          const saveUser = userList[0];
          expect(saveUser.username).toBe('user1');
          expect(saveUser.email).toBe('user1@mail.com');
          done();
        });
      });
  });
});
