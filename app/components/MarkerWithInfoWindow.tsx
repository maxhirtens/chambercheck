import { useState } from "react";
import Link from "next/link";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@heroicons/react/16/solid";

type MarkerWithInfowindowProps = {
  position: { lat: number; lng: number };
  name: string;
  placeId: string;
  color: string;
  hasReviews: boolean;
  accessible: boolean;
};

export const MarkerWithInfowindow = ({
  position,
  name,
  placeId,
  color,
  hasReviews,
  accessible,
}: MarkerWithInfowindowProps) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
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
          maxWidth={300}
          onCloseClick={() => setInfowindowOpen(false)}
          disableAutoPan={true}
        >
          <div className="text-lg">{name}</div>
          <br />
          <div className="text-md">
            {hasReviews ? (
              <Link className="text-teal-600" href={`/places/${placeId}`}>
                See Reviews
              </Link>
            ) : (
              "No Reviews Yet"
            )}
            <br />
            Click{" "}
            <Link
              className="text-teal-600"
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
          </div>
        </InfoWindow>
      )}
    </>
  );
};
