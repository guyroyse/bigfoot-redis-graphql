import { gql } from 'apollo-server'

export default gql`

  type Sighting {
    id: ID
    title: String
    date: String
    observed: String
    county: String
    state: String
    classification: String
    location: Location
  }

  type Location {
    latitude: Float
    longitude: Float
  }

  type Query {
    sighting(id: ID): Sighting
    sightings(county: String, state: String, classification: String): [Sighting]
  }
  
`;
