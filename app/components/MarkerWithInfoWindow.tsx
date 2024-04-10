import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "@mui/material";
import { StarIconSmall } from "./StarIconSmall";
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MapPinIcon } from "@heroicons/react/16/solid";
import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";

type MarkerWithInfowindowProps = {
  position: { lat: number; lng: number };
  name: string;
  placeId: string;
  hasReviews: boolean;
  rating: number;
  accessible: boolean;
  accessibleHighlight: boolean;
  genderNeutral: boolean;
  genderNeutralHighlight: boolean;
  babyChanging: boolean;
  babyChangingHighlight: boolean;
  clothTowels: boolean;
  clothTowelsHighlight: boolean;
  handDryer: boolean;
  handDryerHighlight: boolean;
  notClean: boolean;
};

export const MarkerWithInfowindow = ({
  position,
  name,
  placeId,
  hasReviews,
  rating,
  accessible,
  accessibleHighlight,
  genderNeutral,
  genderNeutralHighlight,
  babyChanging,
  babyChangingHighlight,
  clothTowels,
  clothTowelsHighlight,
  handDryer,
  handDryerHighlight,
  notClean,
}: MarkerWithInfowindowProps) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  const getColor = () => {
    if (rating >= 4.5) {
      return "text-yellow-500";
    } else if (hasReviews) {
      return "text-teal-500";
    } else {
      return "text-slate-600";
    }
  };

  const getBorder = () => {
    if (accessible && accessibleHighlight) {
      return "border-4 border-red-500";
    }
    if (genderNeutral && genderNeutralHighlight) {
      return "border-4 border-purple-400";
    }
    if (babyChanging && babyChangingHighlight) {
      return "border-4 border-blue-500";
    }
    if (clothTowels && clothTowelsHighlight) {
      return "border-4 border-green-500";
    }
    if (handDryer && handDryerHighlight) {
      return "border-4 border-orange-500";
    } else {
      return;
    }
  };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(!infowindowOpen)}
        position={position}
        title={name}
      >
        <div>
          <MapPinIcon
            className={`w-9 h-9 rounded-xl ${getColor()} ${getBorder()}`}
          />
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
          {hasReviews ? (
            <div>
              <div className="flex flex-row">
                Average Rating: {rating.toFixed(1)}/5.0{" "}
                <div className="pt-1">
                  <StarIconSmall />
                </div>
              </div>
              <div className="flex flex-row space-x-5 pt-4 ">
                <div className="text-teal-500 space-x-4 mb-4">
                  {accessible && (
                    <Tooltip title="Reviewers Noticed Restroom was Accessible">
                      <AccessibleOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                  {genderNeutral && (
                    <Tooltip title="Reviewers Noticed All-Gender Restrooms">
                      <WcOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                  {babyChanging && (
                    <Tooltip title="Reviewers Noticed a Baby Changing Station">
                      <BabyChangingStationOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                  {clothTowels && (
                    <Tooltip title="Reviewers Noticed Cloth Hand Towels. Fancy!">
                      <DryCleaningOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                  {handDryer && (
                    <Tooltip title="Reviewers Noticed a Hot-Air Hand Dryer">
                      <DryOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                </div>
                <div className="text-orange-600">
                  {notClean && (
                    <Tooltip title="Reviewers Noticed A Mess or Other Issues">
                      <WarningAmberOutlined fontSize="medium" />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
          <div className="text-md">
            {hasReviews ? (
              <div>
                <Link
                  className="text-teal-600 text-md"
                  href={`/places/${placeId}`}
                >
                  SEE REVIEWS
                </Link>
              </div>
            ) : (
              <div>No Reviews Yet</div>
            )}
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
