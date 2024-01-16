import ReviewList from "@/app/components/ReviewList";
import UserList from "@/app/components/UserList";

export const metadata = {
  title: "ChamberCheck Admin Page",
};

const Admin = () => {
  return (
    <div>
      <UserList />
      <ReviewList />
    </div>
  );
};
export default Admin;
