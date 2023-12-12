"use client";

import React from "react";
import { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Button from "./Button";
import LoadingPage from "../loading";
import Image from "next/image";

const MapBox = () => {
  const [loading, setLoading] = useState(false);
  const [geoClicked, setGeoClicked] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 61.2176,
    lng: -149.8997,
  });

  // get user location with permission from button click
  const getGeo = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setGeoClicked(true);
    });
    setLoading(false);
  };

  if (!geoClicked) {
    try {
      return (
        <div>
          <div className="flex flex-col items-center space-y-12 p-12">
            <div>
              <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
                Your Local Restroom Reviews
              </h2>

              <div className="flex items-center justify-center relative w-[375px] h-[550px] md:w-[500px] md:h-[600px] mt-12 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
                <Image
                  priority
                  src="/img/blurred-map.jpg"
                  alt="local map"
                  width={500}
                  height={500}
                  className="w-full brightness-50"
                />
                <div className="absolute mt-20">
                  <Button
                    text="Get Restroom Reviews Near Me!"
                    onClick={getGeo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } catch (err) {
      console.log(err);
      return <div>Your map is having some trouble...</div>;
    }
  }

  try {
    if (loading) {
      return <LoadingPage />;
    }
    return (
      <div>
        <div className="flex flex-col items-center space-y-12 p-12">
          <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <h2 className="text-2xl font-bold text-center text-veryDarkBlue">
                Your Local Restroom Reviews
              </h2>
              <div className="w-[375px] h-[550px] md:w-[500px] md:h-[600px] mt-12 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
                <Map center={location} zoom={17}>
                  <Marker position={location} />
                </Map>
              </div>
            </APIProvider>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>Your map is having some trouble...</div>;
  }
};

export default MapBox;
