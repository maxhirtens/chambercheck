const Button = (props: { text: string; onClick: () => void }) => {
  return (
    <button
      className="bg-indigo-500 text-white p-2 rounded hover:bg-blue-800 m-2"
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
