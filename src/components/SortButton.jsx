export default function SortButton({ handleSort, isAscending }) {
  const upArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <path fillRule="evenodd" d="M5 12l5-5 5 5H5z" clipRule="evenodd" />
    </svg>
  );

  const downArrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-6 h-6 text-white"
    >
      <path fillRule="evenodd" d="M15 8l-5 5-5-5h10z" clipRule="evenodd" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={handleSort}
      className="px-6 py-3 rounded-xl font-bold transition duration-200 shadow inline-flex items-center justify-center"
      style={{
        backgroundColor: "#3A7D44",
        fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        fontSize: "14px",
        color: "white",
        letterSpacing: "0",
      }}
    >
      Sort by Name
      {isAscending ? upArrow : downArrow}
    </button>
  );
}
