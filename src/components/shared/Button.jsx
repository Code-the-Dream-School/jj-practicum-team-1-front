export default function Button({ children, variant = "primary", ...props }) {
    let baseClasses =
      "px-4 py-2 rounded-xl font-semibold transition duration-200 shadow";
  
    let variantClasses = "";
  
    if (variant === "outline") {
      variantClasses =
        "border border-green-700 text-green-700 bg-transparent hover:bg-green-50";
    } else if (variant === "ghost") {
      variantClasses =
        "text-green-700 bg-transparent hover:bg-green-100 shadow-none";
    } else {
      // primary
      variantClasses =
        "bg-green-600 text-white hover:bg-green-700";
    }
  
    const classNames = `${baseClasses} ${variantClasses}`;
  
    return (
      <button className={classNames} {...props}>
        {children}
      </button>
    );
  }