"use client";

const Button = ({ children, onClick, type = "button", className = "", variant = "default" }) => {
    const baseStyles = "px-3.5 py-2.5 text-sm font-semibold border rounded-md";
    const variants = {
      default: "bg-white text-secondary-700 border border-gray-300 hover:bg-gray-100",
      primary: "bg-primary text-white bg-purple-300",
      secondary: "bg-white text-purple-300 border border-purple-100 hover:bg-gray-200",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;