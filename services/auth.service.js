const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const UserService = require('./users.service');
const userService = new UserService();
const { createTransport } = require('nodemailer');

// const { models } = require('../libs/sequelize');

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) throw boom.unauthorized();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw boom.unauthorized();

    delete user.dataValues.password;
    return user;
  }

  async recoveryPassword(inputEmail) {
    const user = await userService.findByEmail(inputEmail);
    if (!user) boom.unauthorized();
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = 'htts://a.com/recovery?token=' + token;

    await userService.update(user.id, { recoveryToken: token });

    const mail = {
      to: user.email,
      subject: 'Recuperar contraseña',
      html: `<b>Ingresa a este link => ${link} </b>`,
    };

    return this.sendMail(mail);
  }

  async sendMail(infoMail) {
    const { host, email, pass } = config.nodeMailerConfig;
    let transporter = createTransport({
      host: host,
      secure: true,
      port: 465,
      auth: {
        user: email,
        pass: pass,
      },
    });

    await transporter.sendMail({
      from: email,
      ...infoMail,
    });

    return { message: 'email sent' };
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) throw boom.unauthorized();
      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, { recoveryToken: null, password: hash });
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
    return {
      user,
      token,
    };
  }
}

module.exports = AuthService;
