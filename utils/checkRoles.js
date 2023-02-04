const boom = require('@hapi/boom');

const checkRoles = async (context, ...roles) => {
  const { user } = await context.authenticate('jwt', { session: false });
  if(!user) throw boom.forbidden('Invalid token')
  if (roles.length && !roles.includes(user.role)) throw boom.forbidden('Your role is not allow');
  return user
}

module.exports = {checkRoles}
