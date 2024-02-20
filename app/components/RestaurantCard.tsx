import Image from "next/image";

const RestaurantCard = (props: {
  restaurant: string;
  address: string;
  placeId: string;
}) => {
  return (
    <div className="max-w-md mx-auto bg-slate-100 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex flex-col md:flex-row">
        <div className="p-8">
          <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">
            {props.address}
          </div>
          <a
            href={`/places/${props.placeId}`}
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            {props.restaurant}
          </a>
        </div>
        {/* replace with live map API result */}
        <div className="mt-5 pr-8">
          <Image
            src="/img/blurred-map.jpg"
            alt="Map of restaurant location"
            width={60}
            height={60}
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
