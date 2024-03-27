import SmallTitle from "./SmallTitle";

const MapLegend = () => {
  return (
    <div>
      <SmallTitle text="Map Legend" />
      <div
        className={`flex text-lg text-slate-500 mb-12 mt-8 rounded-xl border-4 bg-slate-100 m-auto max-w-sm flex-row justify-evenly`}
      >
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="w-10 h-10 rounded-xl text-teal-500"
          >
            <path
              fillRule="evenodd"
              d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
              clipRule="evenodd"
            ></path>
          </svg>
          Has Reviews
        </div>
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="w-10 h-10 rounded-xl text-black-500"
          >
            <path
              fillRule="evenodd"
              d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
              clipRule="evenodd"
            ></path>
          </svg>
          Ready to Review
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
