import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";

const HomePage = async () => {
  return (
    <>
      <div className="relative container mx-auto p-12">
        <MapBox />
        <ReviewsBox />
      </div>
    </>
  );
};

export default HomePage;
