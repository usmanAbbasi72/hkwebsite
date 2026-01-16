"use client";

import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { clientLocations } from "@/lib/data";
import { Globe } from "lucide-react";

export function ClientMapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const position = { lat: 20, lng: 10 };
  const mapId = "apex_map_theme";

  return (
    <section id="clients" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tight sm:text-4xl">Our Global Reach</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We've partnered with innovative companies from all corners of the globe.
          </p>
        </div>
        <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
          {!apiKey ? (
            <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-center p-4">
              <Globe className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="font-bold text-lg">Map Not Available</h3>
              <p className="text-muted-foreground">
                Please provide a NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your environment variables to display the map.
              </p>
            </div>
          ) : (
            <APIProvider apiKey={apiKey}>
              <Map
                defaultCenter={position}
                defaultZoom={2.5}
                mapId={mapId}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapOptions={{
                  styles: mapStyles
                }}
              >
                {clientLocations.map((location) => (
                   <AdvancedMarker key={location.id} position={location.pos}>
                    <div className="w-3 h-3 bg-accent rounded-full ring-2 ring-white" />
                  </AdvancedMarker>
                ))}
              </Map>
            </APIProvider>
          )}
        </div>
      </div>
    </section>
  );
}

const mapStyles = [
  { elementType: "geometry", stylers: [{ color: "#f0f4f8" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9dbe9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
];
