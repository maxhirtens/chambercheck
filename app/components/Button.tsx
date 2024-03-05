import UserCircleIcon from "./UserCircleIcon";

const Button = (props: {
  color: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="mx-4 bg-teal-500 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-teal-800 px-4"
      type="button"
      onClick={props.onClick}
    >
      {props.text === "avatar" ? <UserCircleIcon /> : props.text}
    </button>
  );
};

export default Button;
