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
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";

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
    north: 37.85,
    south: 37.66,
    west: -122.6,
    east: -122.3,
  };

  // loading state for MapBox.
  const [loading, setLoading] = useState(false);

  // state for filter options.
  const [active, setActive] = useState({
    accessible: false,
    genderNeutral: false,
    babyChanging: false,
    clothTowels: false,
    handDryer: false,
  });
  const [filterState, setFilterState] = useState({
    accessible: false,
    genderNeutral: false,
    babyChanging: false,
    clothTowels: false,
    handDryer: false,
  });

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
  const [reviewIds, setReviewIds] = useState<any>([]);

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
    // get all reviews from ChamberCheck API
    fetch("/api/review", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        setReviews(data.reviews);
        setReviewIds(data.reviews.map((loc: any) => loc.placeId));
      });
  }, []);

  useEffect(() => {
    // get nearby restaurants from Google Places API
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
  // alert non-SF users.
  const refreshLocation = async () => {
    getLocation().then((res) => {
      if (
        res.lat < SF_BOUNDS.south ||
        res.lat > SF_BOUNDS.north ||
        res.lng < SF_BOUNDS.west ||
        res.lng > SF_BOUNDS.east
      ) {
        alert("Sorry, it looks like you're not in San Francisco...");
        return;
      }
      setCenter(res);
      setLocation(res);
      localStorage.setItem("cc_coords", JSON.stringify(res));
    });
  };

  // refresh location-based results, save pin center to localStorage.
  const refreshResults = () => {
    setLocation(center);
    localStorage.setItem("cc_coords", JSON.stringify(center));
  };

  // search locations for matching placeId.
  const findLocationRating = (placeId: string) => {
    let location = reviews.filter((loc: any) => loc.placeId === placeId);
    if (location.length > 0) {
      const total = location.reduce(
        (acc: number, loc: any) => acc + loc.rating,
        0
      );
      return total / location.length;
    } else {
      return null;
    }
  };

  // find location amenities based on placeId.
  const findLocationAmenities = (placeId: string) => {
    let location = reviews.filter((loc: any) => loc.placeId === placeId);
    const accessible = location.some((loc: any) => loc.accessible);
    const genderNeutral = location.some((loc: any) => loc.genderNeutral);
    const babyChanging = location.some((loc: any) => loc.changingTable);
    const clothTowels = location.some((loc: any) => loc.clothTowels);
    const handDryer = location.some((loc: any) => loc.handDryer);
    const notClean = location.some((loc: any) => loc.notClean);
    return {
      accessible: accessible,
      genderNeutral: genderNeutral,
      babyChanging: babyChanging,
      clothTowels: clothTowels,
      handDryer: handDryer,
      notClean: notClean,
    };
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
            maxZoom={18}
          >
            <AdvancedMarker position={center} />;
            {restaurants.map((restaurant, idx) => (
              <MarkerWithInfowindow
                key={idx}
                name={restaurant.name}
                position={restaurant.geometry.location}
                placeId={restaurant.place_id}
                hasReviews={reviewIds.includes(restaurant.place_id)}
                rating={findLocationRating(restaurant.place_id)}
                accessible={
                  findLocationAmenities(restaurant.place_id)?.accessible
                }
                accessibleHighlight={filterState.accessible}
                genderNeutral={
                  findLocationAmenities(restaurant.place_id)?.genderNeutral
                }
                genderNeutralHighlight={filterState.genderNeutral}
                babyChanging={
                  findLocationAmenities(restaurant.place_id)?.babyChanging
                }
                babyChangingHighlight={filterState.babyChanging}
                clothTowels={
                  findLocationAmenities(restaurant.place_id)?.clothTowels
                }
                clothTowelsHighlight={filterState.clothTowels}
                handDryer={
                  findLocationAmenities(restaurant.place_id)?.handDryer
                }
                handDryerHighlight={filterState.handDryer}
                notClean={false}
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
        <div className="flex flex-col items-center justify-evenly">
          <div className="flex flex-col space-x-6">
            {/* Map Filters */}
            <div>
              <div className="flex flex-col -mb-4 mt-8 rounded-xl border-4 bg-slate-100 m-auto justify-evenly">
                <p className="text-center text-teal-500 shadow-md">
                  Map Filters
                </p>
                <div className="flex flex-row space-x-8 px-8 py-2 items-center">
                  <button
                    className={
                      active.accessible ? "text-red-500" : "text-slate-500"
                    }
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        accessible: !filterState.accessible,
                      });
                      setActive({ ...active, accessible: !active.accessible });
                    }}
                  >
                    <Tooltip title="Search For an Accessible Restroom">
                      <AccessibleOutlined fontSize="large" />
                    </Tooltip>
                  </button>
                  <button
                    className={
                      active.genderNeutral
                        ? "text-purple-400"
                        : "text-slate-500"
                    }
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        genderNeutral: !filterState.genderNeutral,
                      });
                      setActive({
                        ...active,
                        genderNeutral: !active.genderNeutral,
                      });
                    }}
                  >
                    <Tooltip title="Search For All-Gender Restrooms">
                      <WcOutlined fontSize="large" />
                    </Tooltip>
                  </button>
                  <button
                    className={
                      active.babyChanging ? "text-blue-500" : "text-slate-500"
                    }
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        babyChanging: !filterState.babyChanging,
                      });
                      setActive({
                        ...active,
                        babyChanging: !active.babyChanging,
                      });
                    }}
                  >
                    <Tooltip title="Search For a Baby Changing Station">
                      <BabyChangingStationOutlined fontSize="large" />
                    </Tooltip>
                  </button>
                  <button
                    className={
                      active.clothTowels ? "text-green-500" : "text-slate-500"
                    }
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        clothTowels: !filterState.clothTowels,
                      });
                      setActive({
                        ...active,
                        clothTowels: !active.clothTowels,
                      });
                    }}
                  >
                    <Tooltip title="Search For Cloth Hand Towels. Fancy!">
                      <DryCleaningOutlined fontSize="large" />
                    </Tooltip>
                  </button>
                  <button
                    className={
                      active.handDryer ? "text-orange-500" : "text-slate-500"
                    }
                    onClick={() => {
                      setFilterState({
                        ...filterState,
                        handDryer: !filterState.handDryer,
                      });
                      setActive({
                        ...active,
                        handDryer: !active.handDryer,
                      });
                    }}
                  >
                    <Tooltip title="Search For Hot-Air Hand Dryers">
                      <DryOutlined fontSize="large" />
                    </Tooltip>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="w-[375px] h-[525px] md:w-[800px] md:h-[600px] lg:w-[960px] mt-6 border-4 border-white-500 rounded-xl overflow-hidden">
            {generateMapContent()}
          </div>
          {/* Map Buttons */}
          <div className="flex bottom-20 z-10 relative">
            <Button text="Locate Me" onClick={refreshLocation} />
            <Button text="Refresh Map Results" onClick={refreshResults} />
          </div>
          {/* Map Legend */}
          <MapLegend />
        </div>

        <Divider className="mb-8" />
      </div>
    );
  } catch (err) {
    console.log(err);
    return <div>Your map is having some trouble...</div>;
  }
};

export default MapBox;
