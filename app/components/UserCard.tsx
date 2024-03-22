import Image from "next/image";

const UserCard = async (props: {
  username: string;
  avatar: string;
  status: string;
}) => {
  return (
    <div className="max-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:shrink-0"></div>
        <div className="p-8">
          {/* User avatar and info */}
          <div className="flex flex-col items-center">
            <Image
              src={props.avatar!}
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="mt-2 px-6 text-slate-500 text-center md:text-left">
              Username:
            </p>
            <p>{props.username}</p>
            <p className="mt-2 px-6 text-slate-500 text-center md:text-left">
              Status:
            </p>
            <p className="text-teal-500">{props.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
