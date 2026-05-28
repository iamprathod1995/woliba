
const Button = ({ title, onClick, type = "button", disabled,className = "dark", icon }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon ? <img src={icon}/>:''}
      {title}
    </button>
  );
};

export default Button;