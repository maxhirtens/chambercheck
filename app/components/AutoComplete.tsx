import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useRouter } from "next/navigation";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

// This is an example of the classic "Place Autocomplete" widget.
// https://developers.google.com/maps/documentation/javascript/place-autocomplete
export const PlaceAutocompleteClassic = ({ onPlaceSelect }: Props) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");
  const router = useRouter();

  // clear input field.
  const clearInput = () => {
    console.log("clearInput engaged");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    const SAN_FRANCISCO = { lat: 37.7749, lng: -122.4194 };
    const defaultBounds = {
      north: SAN_FRANCISCO.lat + 0.1,
      south: SAN_FRANCISCO.lat - 0.08,
      east: SAN_FRANCISCO.lng + 0.1,
      west: SAN_FRANCISCO.lng - 0.15,
    };
    if (!places || !inputRef.current) return;
    console.log("placeAutocomplete listener engaged");
    const options = {
      bounds: defaultBounds,
      strictBounds: true,
      fields: ["place_id", "geometry"],
      types: ["restaurant"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    // On autocomplete select, save coords to localStorage and redirect to place page if a restaurant.
    placeAutocomplete.addListener("place_changed", () => {
      console.log("autocomplete listener engaged");
      onPlaceSelect(placeAutocomplete.getPlace());
      const { place_id, geometry } = placeAutocomplete.getPlace();
      localStorage.setItem("cc_coords", JSON.stringify(geometry?.location));

      router.push(`/places/${place_id}`);

      clearInput();
    });
  }, [onPlaceSelect, placeAutocomplete, router]);

  return (
    <div className="autocomplete-container">
      <input
        className="mt-4 h-12 w-80 md:w-96 text-center rounded-lg text-lg border-2 border-gray-300 tex-teal-500"
        ref={inputRef}
        placeholder="Search for a Restaurant"
      />
    </div>
  );
};
