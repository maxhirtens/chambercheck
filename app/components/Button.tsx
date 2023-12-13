const Button = (props: { text: string; onClick: () => void }) => {
  return (
    <button
      className="bg-blue-500 text-white p-2 shadow-inner rounded-lg hover:bg-blue-800 m-2"
      type="button"
      style={{
        margin: "10px",
      }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
