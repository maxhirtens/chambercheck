"use client";

import {
  BabyChangingStationOutlined,
  AccessibleOutlined,
  DryOutlined,
  WcOutlined,
  DryCleaningOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReviewAmenities = ({
  accessible,
  genderNeutral,
  babyChanging,
  clothTowels,
  handDryer,
  notClean,
}) => {
  return (
    <div className="flex flex-row space-x-5 pt-4">
      <div className="text-teal-500 space-x-3">
        {accessible && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AccessibleOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed Restroom was Accessible</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {genderNeutral && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <WcOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed All-Gender Restrooms</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {babyChanging && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <BabyChangingStationOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed a Baby Changing Station</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {clothTowels && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DryCleaningOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed Cloth Hand Towels. Fancy!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {handDryer && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DryOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed a Hot-Air Hand Dryer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="text-orange-600">
        {notClean && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <WarningAmberOutlined fontSize="medium" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Reviewer Noticed A Mess or Other Issues</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
};

export default ReviewAmenities;
