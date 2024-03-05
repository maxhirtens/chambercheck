"use client";
import { useState, useEffect } from "react";
import Button from "./Button";
import LoadingPage from "../loading";
import Image from "next/image";
import SmallTitle from "./SmallTitle";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import { MarkerWithInfowindow } from "./MarkerWithInfoWindow";
import MapHandler from "../lib/map-handler";
import CustomMapControl from "../lib/map-control";

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

  // center lat, lng for map marker.
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  // restaurants from Google places API, non-persisting.
  const [restaurants, setRestaurants] = useState<RestaurantsType>([]);

  // reviews from ChamberCheck API, non-persisting.
  const [reviews, setReviews] = useState<any>([]);

  // place state for Google auto-complete
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  // useEffect to get client-side lat,lng from localStorage
  useEffect(() => {
    // Get the value from local storage if it exists
    let value =
      localStorage.getItem("cc_coords") || JSON.stringify({ lat: 0, lng: 0 });
    let parsedValue = JSON.parse(value);
    let { lat, lng } = parsedValue;
    setCenter({ lat, lng });
    setLocation({ lat, lng });
  }, []);

  // get nearby restaurants and reviews
  useEffect(() => {
    // get nearby restaurants
    fetch(
      `http://localhost:3000/api/google-places/?lat=${location.lat}&lng=${location.lng}`
    )
      .then((data) => data.json())
      .then((data) => {
        setRestaurants(data.product.results);
      });
    // get nearby reviews
    // *** don't query WHOLE database, how to fix? ***
    fetch("/api/review", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        setReviews(data.reviews.map((review: any) => review.placeId));
      });
  }, [location]);

  // get user location with permission from button click
  const getGeo = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setCenter({
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

  // refresh location-based results.
  const refreshResults = () => {
    setLocation(center);
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
            gestureHandling={"greedy"}
            center={center}
            zoom={16}
            disableDefaultUI={true}
            // onDragend={() => {
            //   setLocation(center);
            // }}
            onCenterChanged={(res) => {
              setCenter(res.detail.center);
            }}
            minZoom={14}
            maxZoom={17}
          >
            <AdvancedMarker position={center} />;
            {restaurants.map((restaurant, idx) => (
              <MarkerWithInfowindow
                key={idx}
                name={restaurant.name}
                position={restaurant.geometry.location}
                placeId={restaurant.place_id}
                color={
                  reviews.includes(restaurant.place_id)
                    ? "text-teal-500"
                    : "text-black-500"
                }
                hasReviews={reviews.includes(restaurant.place_id)}
              />
            ))}
          </Map>
          <CustomMapControl
            controlPosition={ControlPosition.TOP}
            onPlaceSelect={setSelectedPlace}
          />
          <MapHandler place={selectedPlace} />
        </APIProvider>
      );
    }
  };

  try {
    return (
      <div id="search" className="container drop-shadow-2xl">
        <SmallTitle text="Search Restaurants" />
        <div className="flex flex-col items-center">
          <div className="w-[450px] h-[450px] md:w-[800px] md:h-[600px] lg:w-[960px] mt-6 border-4 border-white-500 rounded-xl overflow-hidden">
            {generateMapContent()}
          </div>
          <div className="flex bottom-20 z-10 relative">
            <Button color="teal" text="Locate Me" onClick={getGeo} />
            <Button
              color="orange"
              text="Refresh Results"
              onClick={refreshResults}
            />
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
