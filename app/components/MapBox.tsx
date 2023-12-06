import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const MapBox = () => {
  const position = { lat: 61.2176, lng: -149.8997 };

  return (
    <div>
      <div className="flex flex-col items-center space-y-12 p-12">
        <div>
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
              Restroom Reviews Near You
            </h2>
            <div className="w-[375px] h-[550px] md:w-[500px] md:h-[600px] mt-12">
              <Map center={position} zoom={10}>
                <Marker position={position} />
              </Map>
            </div>
          </APIProvider>
        </div>
      </div>
    </div>
  );
};

export default MapBox;
