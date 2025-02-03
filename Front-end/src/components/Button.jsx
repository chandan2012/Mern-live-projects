const Button = ({ btnType, btnText, handler }) => {
  let buttonStyles = "px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2";

  if (btnType === "success") {
    buttonStyles += " bg-green-500 hover:bg-green-600 focus:ring-green-300";
  } else if (btnType === "danger") {
    buttonStyles += " bg-red-500 hover:bg-red-600 focus:ring-red-300";
  } else {
    buttonStyles += " bg-blue-500 hover:bg-blue-600 focus:ring-blue-300";
  }

  return (
    <button className={`${buttonStyles} cursor-pointer`} onClick={handler}>
      {btnText}
    </button>
  );
};

export default Button;
