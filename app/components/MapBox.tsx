"use client";
import { useState, useEffect, Suspense, use } from "react";
import Button from "./Button";
import LoadingPage from "../loading";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Subtitle from "./Subtitle";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";

interface RestaurantsState {
  name: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  place_id: string;
}

type RestaurantsType = Array<RestaurantsState>;

const MapBox = () => {
  // loading state for MapBox.
  const [loading, setLoading] = useState(false);

  // state for location, non-persisting.
  const [location, setLocation] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  // restaurants from Google places API, non-persisting.
  const [restaurants, setRestaurants] = useState<RestaurantsType>([]);

  // useEffect to get client-side lat,lng from localStorage
  useEffect(() => {
    // Get the value from local storage if it exists
    let value =
      localStorage.getItem("cc_coords") || JSON.stringify({ lat: 0, lng: 0 });
    let parsedValue = JSON.parse(value);
    let { lat, lng } = parsedValue;
    setLocation({ lat, lng });
  }, []);

  // useEffect to get restaurants from Google Places API
  useEffect(() => {
    if (location.lat !== 0) {
      fetch(
        `http://localhost:3000/api/google-places/?lat=${location.lat}&lng=${location.lng}`
      )
        .then((data) => data.json())
        .then((data) => {
          setRestaurants(data.product.results);
        });
    }
  }, [location]);

  // useEffect to get any nearby restaurant data from ChamberCheck
  useEffect(() => {
    if (location.lat !== 0) {
      fetch("/api/place-id", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log(data.reviews.map((review: any) => review.placeId));
        });
    }
  }, [location]);

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
          libraries={["marker", "places"]}
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <Map
            mapId={"1aceaad6651fe7f1"}
            gestureHandling={"greedy"}
            center={location}
            zoom={16}
            disableDefaultUI={true}
          >
            <Marker position={location} />;
            {restaurants.map((restaurant, idx) => (
              <MarkerWithInfowindow
                key={idx}
                name={restaurant.name}
                position={restaurant.geometry.location}
                placeId={restaurant.place_id}
              />
            ))}
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
          <SearchBar placeholder="Search Location" />
          <Button text="Search" />
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] mt-6 border-4 border-white-500 rounded-xl shadow-md overflow-hidden">
            {generateMapContent()}
          </div>
        </div>
        <div className="flex mt-6 relative justify-center">
          <Button text="Search Near My Location" onClick={getGeo} />
        </div>
        <div></div>
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>Your map is having some trouble...</div>;
  }
};

export default MapBox;
