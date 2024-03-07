import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { PlaceAutocompleteClassic } from "../components/AutoComplete";

type CustomAutocompleteControlProps = {
  center: { lat: number; lng: number };
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

const CustomMapControl = ({
  center,
  controlPosition,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        <PlaceAutocompleteClassic
          center={center}
          onPlaceSelect={onPlaceSelect}
        />
      </div>
    </MapControl>
  );
};

export default CustomMapControl;
