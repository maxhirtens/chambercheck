import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

interface Props {
  center: { lat: number; lng: number };
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocompleteClassic = ({ onPlaceSelect, center }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");
  const router = useRouter();

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1,
    };

    const options = {
      fields: ["place_id", "geometry", "type"],
      types: ["restaurant", "locality"],
      bounds: defaultBounds,
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, center]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    // On autocomplete select, save coords to localStorage and redirect to place page if a restaurant.
    placeAutocomplete.addListener("place_changed", () => {
      console.log("autocomplete listener engaged");
      onPlaceSelect(placeAutocomplete.getPlace());
      const { place_id, geometry, types } = placeAutocomplete.getPlace();
      localStorage.setItem("cc_coords", JSON.stringify(geometry?.location));
      if (place_id !== undefined && !types?.includes("locality")) {
        router.push(`/places/${place_id}`);
      }
    });
  }, [onPlaceSelect, placeAutocomplete, router]);

  return (
    <div className="autocomplete-container">
      <input
        className="mt-4 h-12 w-96 text-center rounded-lg text-lg border-2 border-gray-300 tex-teal-500"
        ref={inputRef}
        placeholder="Search by Restaurant or Location"
      />
    </div>
  );
};
