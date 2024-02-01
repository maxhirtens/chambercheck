import AdminReviewList from "@/app/components/AdminReviewList";
import AdminUserList from "@/app/components/AdminUserList";

export const metadata = {
  title: "ChamberCheck Admin Page",
};

const Admin = () => {
  return (
    <div>
      <AdminUserList />
      <AdminReviewList />
    </div>
  );
};
export default Admin;
