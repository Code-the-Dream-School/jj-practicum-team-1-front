export default function Button({ children, variant = "primary", ...props }) {
  let baseClasses =
    "px-6 py-3 rounded-xl font-bold transition duration-200 shadow inline-flex items-center justify-center";

  let variantClasses = "";

  if (variant === "outline") {
    variantClasses =
      "border border-green-700 text-green-700 bg-transparent hover:bg-green-50";
  } else if (variant === "ghost") {
    variantClasses =
      "text-green-700 bg-transparent hover:bg-green-100 shadow-none";
  } else if (variant === "secondary") {
    variantClasses =
      "bg-gray-200 text-gray-800 hover:bg-gray-300";
  } else {
    // primary
    variantClasses = "text-white hover:opacity-90";
  }

  const classNames = `${baseClasses} ${variantClasses}`;

  const customStyle = variant === "primary" ? {
    backgroundColor: '#3A7D44',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '700',
    fontSize: '14px',
    color: 'white',
    letterSpacing: '0'
  } : {};

  return (
    <button className={classNames} style={customStyle} {...props}>
      {children}
    </button>
  );
}
