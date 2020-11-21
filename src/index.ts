import { ApolloServer, ServerInfo } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';
import BigfootApi from './datasource';

(async () => {

  const server : ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        bigfootApi: new BigfootApi()
      }
    }
  });

  let info : ServerInfo = await server.listen();
  console.log(`🚀  Server ready at ${info.url}`);

})();
