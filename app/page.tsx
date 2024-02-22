import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";
import { Divider } from "@mui/material";

const HomePage = async () => {
  return (
    <>
      <div className="relative container mx-auto p-12">
        <Divider />
        <MapBox />
        <ReviewsBox />
      </div>
    </>
  );
};

export default HomePage;
