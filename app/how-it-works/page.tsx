import SmallTitle from "../components/SmallTitle";
import Image from "next/image";

export const metadata = {
  title: "How ChamberCheck Works",
};

const HowItWorksPage = () => {
  return (
    <div className="mb-24 p-12">
      <SmallTitle text="How It Works" />

      <div className="flex flex-col m-auto justify-center mt-12 max-w-4xl text-xl font-normal text-gray-500">
        <div className="">
          <p className="mb-8">
            Step 1: Use the map to find a nearby restaurant or search for one
            you want to review.
          </p>
          <Image
            alt="ChamberCheck Map Example"
            src="/img/map-example.jpg"
            width="375"
            height="375"
            sizes="100vw"
            className="items-center mx-auto rounded-3xl shadow-md overflow-hidden mb-8"
          />
        </div>
        <br />
        <p className="mb-8">
          Step 2: Leave a star rating out of 5, write a brief review, and mark
          the checkboxes for any amenities or issues you discover.
        </p>
        <Image
          alt="ChamberCheck Form Example"
          src="/img/form-example.jpg"
          width="375"
          height="375"
          sizes="100vw"
          className="items-center mx-auto rounded-3xl shadow-md overflow-hidden mb-4"
        />
        <br />
        <p>
          Step 3: That&apos;s it! ChamberCheck works all over the world. Check
          out all your favorite restaurants!
        </p>
        <br />
      </div>
    </div>
  );
};
export default HowItWorksPage;
