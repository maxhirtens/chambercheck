import React from "react";
import { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapBox = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 61.2176,
    lng: -149.8997,
  });
  // get the user's current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  try {
    return (
      <div>
        <div className="flex flex-col items-center space-y-12 p-12">
          <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
                Restroom Reviews Near You
              </h2>
              <div className="w-[375px] h-[550px] md:w-[500px] md:h-[600px] mt-12">
                <Map center={location} zoom={10}>
                  <Marker position={location} />
                </Map>
              </div>
            </APIProvider>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
  }
};

export default MapBox;
