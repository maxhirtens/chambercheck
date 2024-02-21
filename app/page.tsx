import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";
import SearchBox from "./components/SearchBox";

const HomePage = async () => {
  return (
    <>
      <div className="relative container mx-auto p-12">
        <SearchBox />
        <MapBox />
        <ReviewsBox />
      </div>
    </>
  );
};

export default HomePage;
