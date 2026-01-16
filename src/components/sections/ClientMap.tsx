"use client";

import React from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { clientLocations } from "@/lib/data";
import { Globe } from "lucide-react";

export function ClientMapSection() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const position = { lat: 20, lng: 10 };
  const mapId = "apex_map_theme_dark";

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
                    <div className="w-3 h-3 bg-accent rounded-full ring-2 ring-background" />
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
  { featureType: "all", elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }] },
  { featureType: "all", elementType: "labels.text.stroke", stylers: [{ color: "#000000" }, { lightness: 13 }] },
  { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }] },
  { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#144b53" }, { lightness: 14 }, { weight: 1.4 }] },
  { featureType: "landscape", elementType: "all", stylers: [{ color: "#08304b" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0c4152" }, { lightness: 5 }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#0b434f" }, { lightness: 25 }] },
  { featureType: "road.arterial", elementType: "geometry.fill", stylers: [{ color: "#000000" }] },
  { featureType: "road.arterial", elementType: "geometry.stroke", stylers: [{ color: "#0b3d51" }, { lightness: 16 }] },
  { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "transit", elementType: "all", stylers: [{ color: "#146474" }] },
  { featureType: "water", elementType: "all", stylers: [{ color: "#021019" }] },
];
