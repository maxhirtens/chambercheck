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
import MapLegend from "./MapLegend";
import { Divider } from "@mui/material";

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

type LatLngType = { lat: number; lng: number };

const MapBox = () => {
  // bounds for MapBox.
  const SF_BOUNDS = {
    north: 37.87,
    south: 37.66,
    west: -122.6,
    east: -122.28,
  };

  // loading state for MapBox.
  const [loading, setLoading] = useState(false);

  // state for location, non-persisting.
  const [location, setLocation] = useState<LatLngType>({
    lat: 0,
    lng: 0,
  });

  // center lat, lng for map marker.
  const [center, setCenter] = useState<LatLngType>({
    lat: 0,
    lng: 0,
  });

  // restaurants from Google places API, non-persisting.
  const [restaurants, setRestaurants] = useState<RestaurantsType>([]);

  // reviews from ChamberCheck API, non-persisting.
  // *** fix this type ***
  const [reviews, setReviews] = useState<any>([]);

  // place state for Google auto-complete
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  // useEffect to get client-side lat,lng from localStorage
  useEffect(() => {
    // Get the value from local storage if it exists, otherwise set to downtown SF.
    let value =
      localStorage.getItem("cc_coords") ||
      JSON.stringify({ lat: 37.7749, lng: -122.4194 });
    let parsedValue = JSON.parse(value);
    let { lat, lng } = parsedValue;
    console.log(
      "useEffect running to get coords from localStorage. coords: ",
      lat,
      lng
    );
    setCenter({ lat, lng });
    setLocation({ lat, lng });
  }, []);

  useEffect(() => {
    // get nearby reviews
    // * with a persistent rating, can implement top restaurant gold markers *
    // *** don't query WHOLE database? ***

    fetch("/api/review", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        // change this to return more info about the reviews?
        setReviews(data.reviews.map((review: any) => review.placeId));
      });
  }, []);

  useEffect(() => {
    // get nearby restaurants
    fetch(`/api/google-places/?lat=${location.lat}&lng=${location.lng}`)
      .then((data) => data.json())
      .then((data) => {
        setRestaurants(data.product.results);
      });
  }, [location]);

  // get user location via promise.
  const getCoords = () => {
    return new Promise((resolve, reject) => {
      console.log("getting coords");
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // turn user location into lat,lng object.
  const getLocation = async () => {
    setLoading(true);
    let pos = { lat: 0, lng: 0 };

    let position: any = await getCoords();

    pos.lat = position?.coords.latitude;
    pos.lng = position?.coords.longitude;
    setLoading(false);
    return pos;
  };

  // set user location to center of map, save to localStorage.
  const refreshLocation = async () => {
    getLocation().then((res) => {
      setCenter(res);
      setLocation(res);
      localStorage.setItem("cc_coords", JSON.stringify(res));
    });
  };

  // refresh location-based results, save center pin to localStorage.
  const refreshResults = () => {
    setLocation(center);
    localStorage.setItem("cc_coords", JSON.stringify(center));
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
          alt="map background"
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
            restriction={{ latLngBounds: SF_BOUNDS, strictBounds: false }}
            gestureHandling={"greedy"}
            center={center}
            zoom={16}
            disableDefaultUI={true}
            onCenterChanged={(res) => {
              setCenter(res.detail.center);
            }}
            minZoom={13}
            maxZoom={16}
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
                    : "text-slate-500"
                }
                hasReviews={reviews.includes(restaurant.place_id)}
                accessible={false}
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
        <SmallTitle text="Find Restaurants" />
        <div className="flex flex-col items-center">
          <div className="w-[375px] h-[375px] md:w-[800px] md:h-[600px] lg:w-[960px] mt-6 border-4 border-white-500 rounded-xl overflow-hidden">
            {generateMapContent()}
          </div>
          <div className="flex bottom-20 z-10 relative">
            <Button text="Locate Me" onClick={refreshLocation} />
            <Button text="Refresh Map Results" onClick={refreshResults} />
          </div>
        </div>
        <MapLegend />
        <Divider className="mb-8" />
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>Your map is having some trouble...</div>;
  }
};

export default MapBox;
