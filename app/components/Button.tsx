const Button = (props: { text: string; onClick?: () => void }) => {
  return (
    <button
      className="mx-8 bg-blue-800 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-blue-500 px-8"
      type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
