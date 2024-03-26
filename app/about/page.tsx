import SmallTitle from "../components/SmallTitle";

export const metadata = {
  title: "About ChamberCheck",
};

const AboutPage = () => {
  return (
    <div className="p-12 mb-24">
      <SmallTitle text="What is ChamberCheck?" />

      <div className="flex flex-col m-auto justify-center mt-12 max-w-3xl text-xl font-normal text-gray-500">
        <p>
          ChamberCheck was started by two San Francisco restaurant fans who
          wanted to help others seek out great new restaurants based on the most
          underrated aspect of any establishment: the restroom. We believe that
          a clean, well-maintained restroom is a sign of a well-run restaurant,
          and we want to help you find the best ones.
        </p>
        <br />
        <p>
          So while there are plenty of restaurant review sites out there to
          check up on the food, service, and ambience, ChamberCheck is here to
          help you find the best restaurant restrooms in town. Now get out there
          and start reviewing!
        </p>
      </div>
    </div>
  );
};
export default AboutPage;
