'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { clientLocations } from '@/lib/client-locations';

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }],
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }],
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }],
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }],
  },
];

export function ClientMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <section id="clients" className="py-16 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
             <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
              Our Global Reach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We partner with innovative companies around the world.
            </p>
          </div>
          <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
            <p className="text-muted-foreground text-center">Google Maps API Key is missing.<br />Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file to see the map.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="clients" className="py-16 md:py-24 bg-background">
       <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl gradient-text">
            Our Global Reach
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We partner with innovative companies around the world, delivering solutions that transcend borders.
          </p>
        </div>
        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/10">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={{ lat: 20, lng: 0 }}
              defaultZoom={2}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
              mapId={'qonkar-map'}
              styles={mapStyles}
            >
              {clientLocations.map((location) => (
                <AdvancedMarker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                >
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg animate-pulse"></div>
                </AdvancedMarker>
              ))}
            </Map>
          </APIProvider>
        </div>
       </div>
    </section>
  );
}
