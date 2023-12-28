import ReviewsBox from "./components/ReviewsBox";
import MapBox from "./components/MapBox";
import AdminPanel from "./components/AdminPanel";

const HomePage = () => {
  return (
    <>
      <div className="relative container mx-auto p-12">
        <MapBox />
        <ReviewsBox />
        <AdminPanel />
      </div>
    </>
  );
};

export default HomePage;
