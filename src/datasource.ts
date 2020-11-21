import { DataSource } from 'apollo-datasource';
import Redis from 'ioredis';
import { Location, Sighting } from './types';

const BASE_KEYSPACE = 'bigfoot:sightings'
const REPORT_KEYSPACE = `${BASE_KEYSPACE}:report`
const COUNTY_INDEX_KEYSPACE = `${BASE_KEYSPACE}:county`
const STATE_INDEX_KEYSPACE = `${BASE_KEYSPACE}:state`
const CLASSIFICATION_INDEX_KEYSPACE = `${BASE_KEYSPACE}:classification`
const LOCATIONS_KEY = `${BASE_KEYSPACE}:locations`

export default class BigfootDataSource extends DataSource {

  redis: any;

  constructor() {
    super();
    this.redis = new Redis();
  }

  async fetchSightings(county: string, state: string, classification: string): Promise<Sighting[]> {
    
    let keys = [];
    
    if (county) keys.push(`${COUNTY_INDEX_KEYSPACE}:${county}`);
    if (state) keys.push(`${STATE_INDEX_KEYSPACE}:${state}`);
    if (classification) keys.push(`${CLASSIFICATION_INDEX_KEYSPACE}:${classification}`);
    
    if (keys.length === 0) return [];
    
    let ids = await this.redis.sinter(...keys);
    return await this.fetchSightingsByIds(ids);
  }
  
  async fetchSightingsByIds(ids: string[]): Promise<Sighting[]> {
    return await Promise.all(
      ids.map(async (id: string) => await this.fetchSighting(id))
    );
  }

  async fetchSighting(id: string): Promise<Sighting> {
    let sighting = await this.redis.hgetall(`${REPORT_KEYSPACE}:${id}`);
    sighting.location = await this.fetchLocation(id);
    return sighting;
  }

  async fetchLocation(id: string): Promise<Location> {
    let coords = await this.redis.geopos(`${LOCATIONS_KEY}`, id);
    let location = { latitude: coords[0][1], longitude: coords[0][0] };
    return location;
  }
}
