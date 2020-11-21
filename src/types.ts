interface Location {
  latitude: number;
  longitude: number;
}

interface Sighting {
  id: string;
  title: string;
  date: string;
  observed: string;
  county: string;
  state: string;
  classification: string;
  location: Location;
}

export { Location, Sighting }
