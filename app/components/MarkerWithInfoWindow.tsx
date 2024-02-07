import { useState } from "react";
import Link from "next/link";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@heroicons/react/16/solid";

export const MarkerWithInfowindow = ({
  position,
  name,
  placeId,
  color,
  hasReviews,
}: {
  position: { lat: number; lng: number };
  name: string;
  placeId: string;
  color: string;
  hasReviews: boolean;
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={name}
      >
        <div>
          <MapPinIcon className={`w-8 h-8 rounded-xl ${color}`} />
        </div>
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
        >
          {name}
          <br />
          {hasReviews ? (
            <Link className="text-blue-500" href={`/places/${placeId}`}>
              See Reviews
            </Link>
          ) : (
            "No Reviews Yet"
          )}
          <br />
          Click{" "}
          <Link
            className="text-blue-500"
            href={{
              pathname: "/reviews/new",
              query: {
                id: placeId,
              },
            }}
          >
            HERE
          </Link>{" "}
          to leave a review!
        </InfoWindow>
      )}
    </>
  );
};
