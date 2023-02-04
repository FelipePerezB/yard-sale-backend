const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../libs/sequelize');
const { upSeed, downSeed } = require('../utils/umzug');

describe('suite for /users', () => {
  let app;
  let server;
  let api;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('suite for GET', () => {
    test('Should return a user', async () => {
      const inputId = '1';
      const { dataValues } = await models.User.findByPk(inputId);
      const { statusCode, body } = await api.get('/api/v1/users/' + inputId);
      delete body.createdAt;
      delete dataValues.createdAt;
      expect(statusCode).toBe(200);
      expect(body).toEqual(dataValues);
    });
  });

  describe('suite for POST', () => {
    let data = {
      email: 'admin7@gmail.com',
      role: 'admin',
      password: 'admin123',
    };

    test('Should return a 400 Bad request with password invalid', async () => {
      data.password = '---';
      const { statusCode, body } = await api.post('/api/v1/users').send(data);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test('Should return a 400 Bad request with password invalid', async () => {
      data.email = '---';
      const { statusCode, body } = await api.post('/api/v1/users').send(data);
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });

    test('Should create and return a user', async () => {
      const newUser = {
        email: 'pepito@mail.com',
        password: 'admin123',
        role: 'admin',
      };
      const { statusCode, body } = await api.post('/api/v1/users').send(newUser);
      expect(statusCode).toBe(201);
      // Check DB
      const user = await models.User.findByPk(body.id);
      expect(user.role).toBe(newUser.role);
      expect(user.email).toBe(newUser.email);
      expect(user.password).not.toBe(newUser.password);
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
