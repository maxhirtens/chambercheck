"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import LoadingPage from "../loading";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Subtitle from "./Subtitle";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";

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

  // generate map content based on state
  const generateMapContent = () => {
    if (loading) {
      return <LoadingPage />;
    }
    if (location.lat === 0) {
      return (
        <Image
          priority
          src="/img/blurred-map.jpg"
          alt="local map"
          width={1000}
          height={600}
          className="w-full brightness-50"
        />
      );
    } else {
      return (
        <APIProvider
          libraries={["marker"]}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <Map
            mapId={"1aceaad6651fe7f1"}
            center={location}
            zoom={17}
            disableDefaultUI={true}
          >
            {/* <Marker position={location} /> */}
            <MarkerWithInfowindow position={location} />
          </Map>
        </APIProvider>
      );
    }
  };

  try {
    return (
      <div id="search" className="container drop-shadow-2xl">
        <Subtitle text="Restaurant Restroom Reviews Near You" />
        <div className="flex flex-row mt-12 justify-center">
          <SearchBar placeholder="Search Restaurants" />
          <Button text="Search" />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] mt-6 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
            {generateMapContent()}
          </div>
        </div>
        <div className="flex mt-6 relative justify-center">
          <Button text="Locate Me" onClick={getGeo} />
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>Your map is having some trouble...</div>;
  }
};

export default MapBox;
