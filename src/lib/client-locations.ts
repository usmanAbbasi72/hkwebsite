export type ClientLocation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

export const clientLocations: ClientLocation[] = [
    { id: '1', name: 'New York, USA', lat: 40.7128, lng: -74.0060 },
    { id: '2', name: 'London, UK', lat: 51.5074, lng: -0.1278 },
    { id: '3', name: 'Tokyo, Japan', lat: 35.6895, lng: 139.6917 },
    { id: '4', name: 'Sydney, Australia', lat: -33.8688, lng: 151.2093 },
    { id: '5', name: 'Berlin, Germany', lat: 52.5200, lng: 13.4050 },
    { id: '6', name: 'Singapore', lat: 1.3521, lng: 103.8198 },
    { id: '7', name: 'Toronto, Canada', lat: 43.6532, lng: -79.3832 },
    { id: '8', name: 'Dubai, UAE', lat: 25.2048, lng: 55.2708 },
    { id: '9', name: 'Paris, France', lat: 48.8566, lng: 2.3522 },
    { id: '10', name: 'San Francisco, USA', lat: 37.7749, lng: -122.4194 },
];
