const Button = (props: { text: string; onClick: () => void }) => {
  return (
    <button
      className="mx-8 bg-blue-500 text-white whitespace-nowrap p-2 shadow-inner rounded-lg hover:bg-blue-800 px-12"
      type="button"
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
