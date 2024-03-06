import Subtitle from "../components/Subtitle";

export const metadata = {
  title: "About ChamberCheck",
};

const AboutPage = () => {
  return (
    <div className="container mx-auto p-12 max-w-96">
      <Subtitle text="What is ChamberCheck?" />

      <p className="mt-12 text-xl font-normal text-gray-800 lg:text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit
        molestiae ipsam, et aut consequatur ipsum voluptates quasi, quos
        recusandae doloribus provident consequuntur amet nobis est voluptate
        perferendis quaerat distinctio saepe dolores perspiciatis ex ab nostrum
        eaque! Porro perspiciatis possimus, sed a quidem sunt sit doloremque
        molestiae maiores blanditiis quasi quod.
      </p>
    </div>
  );
};
export default AboutPage;
