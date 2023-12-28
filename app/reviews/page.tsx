import ReviewList from "../components/ReviewList";
import AdminPanel from "../components/AdminPanel";

export const metadata = {
  title: "ChamberCheck Reviews",
};

const ReviewPage = () => {
  return (
    <div>
      <ReviewList />
      <AdminPanel />
    </div>
  );
};
export default ReviewPage;
