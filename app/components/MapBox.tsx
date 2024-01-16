"use client";

import React from "react";
import { useState, useEffect } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Button from "./Button";
import LoadingPage from "../loading";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Subtitle from "./Subtitle";

const MapBox = () => {
  const [loading, setLoading] = useState(false);

  // state for location, non-persisting
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  // useEffect to get client-side lat,lng from localStorage
  useEffect(() => {
    let value;
    // Get the value from local storage if it exists
    value =
      localStorage.getItem("cc_coords") || JSON.stringify({ lat: 0, lng: 0 });
    let parsedValue = JSON.parse(value);
    let { lat, lng } = parsedValue;
    setLocation({ lat, lng });
  }, []);

  // get user location with permission from button click
  const getGeo = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      localStorage.setItem(
        "cc_coords",
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      );
      setLoading(false);
    });
  };

  // recenter map back on user location
  const recenterMap = () => {
    setTimeout(() => {
      setLoading(false), 3000;
    });
    setLoading(true);
  };

  if (loading) {
    return (
      <div className="container ">
        <Subtitle text="Restaurant Restroom Reviews Near You" />
        <div className="flex flex-col items-center space-y-12 p-12 drop-shadow-2xl">
          <div>
            <div className="flex flex-row mt-6 justify-center">
              <SearchBar placeholder="Search Restaurants" />
              <Button text="Locate Me" onClick={getGeo} />
            </div>
            <div className="flex flex-col items-center drop-shadow-2xl">
              <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] mt-6 border-4 border-white-500 rounded-xl shadow-md">
                <LoadingPage />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (location.lat === 0) {
    try {
      return (
        <div className="container">
          <Subtitle text="Restaurant Restroom Reviews Near You" />
          <div className="flex flex-row mt-6 justify-center">
            <SearchBar placeholder="Search Restaurants" />
            <Button text="Locate Me" onClick={getGeo} />
          </div>
          <div className="flex flex-col items-center drop-shadow-2xl">
            <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] mt-6 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
              <Image
                priority
                src="/img/blurred-map.jpg"
                alt="local map"
                width={1000}
                height={600}
                className="w-full brightness-50"
              />
            </div>
          </div>
        </div>
      );
    } catch (err) {
      console.log(err);
      return (
        <div>Your map is having some trouble... please reload this page.</div>
      );
    }
  }

  try {
    return (
      <div id="search" className="container">
        <Subtitle text="Restaurant Restroom Reviews Near You" />
        <div className="flex flex-row mt-12 justify-center">
          <SearchBar placeholder="Search Restaurants" />
          <Button text="Locate Me" onClick={recenterMap} />
        </div>
        <div className="flex flex-col items-center drop-shadow-2xl">
          <div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] mt-6 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
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
