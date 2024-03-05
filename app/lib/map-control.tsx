import React from "react";
import { ControlPosition, MapControl } from "@vis.gl/react-google-maps";
import { PlaceAutocompleteClassic } from "../components/AutoComplete";

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
};

const CustomMapControl = ({
  controlPosition,
  onPlaceSelect,
}: CustomAutocompleteControlProps) => {
  return (
    <MapControl position={controlPosition}>
      <div className="autocomplete-control">
        <PlaceAutocompleteClassic onPlaceSelect={onPlaceSelect} />
        {/* <AutocompleteCustom onPlaceSelect={onPlaceSelect} /> */}
      </div>
    </MapControl>
  );
};

export default CustomMapControl;
