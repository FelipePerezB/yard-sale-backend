const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContext } = require('graphql-passport');
const {resolvers} = require('./resolvers');
const {typeDefs: scalarsTypeDefs, resolvers: sacalarsResolvers} = require('graphql-scalars')


const useGraphql = async () => {
  const typeDefs = [
    ...await loadFiles('./src/**/*.graphql'),
    scalarsTypeDefs
  ]
  const allResolvers = [
    resolvers,
    sacalarsResolvers
  ]

  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
  });
  await startStandaloneServer(server, {
    context:({req,res})=> buildContext({req,res})
  });
};

module.exports = useGraphql;
