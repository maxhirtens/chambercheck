import UserList from "../components/UserList";
import AdminPanel from "../components/AdminPanel";

export const metadata = {
  title: "ChamberCheck Users",
};

const UserPage = () => {
  return (
    <div>
      <UserList />
      <AdminPanel />
    </div>
  );
};
export default UserPage;
