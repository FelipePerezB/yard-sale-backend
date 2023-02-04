const passport = require('passport');

const JwtStrategy = require('./strategies/jwt.strategy');
const LocalStrategy = require('./strategies/local.strategy')
const GQLLocalStrategy = require('./strategies/gql-local.strategy');

passport.use(LocalStrategy);
passport.use(JwtStrategy);
passport.use(GQLLocalStrategy)
