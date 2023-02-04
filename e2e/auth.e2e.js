const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../libs/sequelize');
const { upSeed, downSeed } = require('../utils/umzug');

const mockSendMail = jest.fn();
jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockImplementation(() => ({ sendMail: mockSendMail })),
}));

describe('suite for /auth', () => {
  let app;
  let server;
  let api;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });
  describe('POST', () => {
    let data = {
      email: 'admin7@gmail.com',
      role: 'admin',
      password: 'admin123',
    };

    test('Should return a 404', async () => {
      delete data.role;
      const { statusCode } = await api.post('/api/v1/auth/login').send(data);
      expect(statusCode).toBe(401);
    });

    test('Should return a 200', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };
      const { statusCode, body } = await api.post('/api/v1/auth/login').send(inputData);
      expect(statusCode).toBe(200);
      expect(body.access_token).toBeDefined();
      expect(body.user.email).toEqual(user.email);
      expect(body.user.password).toBeUndefined();
    });
  });

  describe('POST /recovery', () => {
    beforeAll(() => {
      mockSendMail.mockClear();
    });
    test('Should return a 401', async () => {
      const inputData = {
        email: 'fake@mail.com',
      };
      const { statusCode } = await api.post('/api/v1/auth/password-recovery').send(inputData);
      expect(statusCode).toBe(401);
    });

    test('Should return a 200', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
      };
      mockSendMail.mockResolvedValue(true)
      const { statusCode, body } = await api.post('/api/v1/auth/password-recovery').send(inputData);
      expect(statusCode).toBe(200);
      expect(body.message).toBe('email sent');
      expect(mockSendMail).toBeCalled()
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
