import { Sighting } from './types';

export default {

  Query: {

    sighting: async (_parent: any, args: any, context: any): Promise<Sighting> => {
      let id = args.id;
      let bigfootApi = context.dataSources.bigfootApi;
      return await bigfootApi.fetchSighting(id);
    },

    sightings: async (_parent: any, args: any, context: any): Promise<Sighting[]> => {

      let county = args.county;
      let state = args.state;
      let classification = args.classification;

      let bigfootApi = context.dataSources.bigfootApi;

      return await bigfootApi.fetchSightings(county, state, classification);
    }

  }

};
