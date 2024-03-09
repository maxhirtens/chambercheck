import Link from "next/link";

const RestaurantCard = (props: {
  restaurant: string;
  address: string;
  placeId: string;
}) => {
  return (
    <div className="max-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="p-8">
          <Link
            href={`/places/${props.placeId}`}
            className="block mb-1 text-xl leading-tight font-medium text-black hover:underline"
          >
            {props.restaurant}
          </Link>
          <div className="uppercase tracking-wide text-xs text-teal-500 font-semibold">
            {props.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
