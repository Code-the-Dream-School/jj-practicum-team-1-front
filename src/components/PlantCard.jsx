import { useNavigate } from "react-router-dom";

export default function PlantCard({
  plant,
  disableClick = false,
  linkedFrom,
  onDelete,
  onAdd,
}) {
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    common_name,
    scientific_name,
    origin,
    hardiness_zones,
    // hardiness_location, <-- This reveals our API key in the url. This could be used for a separate api call if we set it up
    description,
    cycle,
    sunlight,
    growth_rate,
    care_level,
    watering,
    maintenance,
    imageURL,
    default_image,
    notes,
    location,
    createdAt,
  } = plant;

  const plantId = _id || id;
  const plantName = name || common_name;
  const displayImage =
    imageURL ||
    default_image?.medium_url ||
    default_image?.original_url ||
    "/plant-hero.jpg";

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // don’t navigate to details
    e.preventDefault();
    if (onDelete && plantId) onDelete(plantId);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // don’t navigate to details
    e.preventDefault();
    if (onAdd && plantId) onAdd(displayImage, plantName);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle click to navigate to plant detail page
  const handleClick = () => {
    if (!disableClick) {
      navigate(`/plants/${_id || id}`, {
        state: { linkedFrom: linkedFrom },
      });
    }
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
        !disableClick ? "cursor-pointer hover:scale-105 transform" : ""
      }`}
      onClick={handleClick}
      role={!disableClick ? "button" : undefined}
      tabIndex={!disableClick ? 0 : undefined}
      onKeyDown={
        !disableClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      <div className="relative h-48 w-full">
        <img
          src={displayImage}
          alt={name || common_name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/plant-hero.jpg"; // Fallback if image fails to load
          }}
        />
        {/* DELETE button: show only on collection grid (has _id) and not on details page */}
        {onDelete && _id && !disableClick && (
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-red-600 text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 w-10 h-10"
            aria-label="Delete plant"
            title="Delete"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <g data-name="70-Trash">
                <path d="m29.89 6.55-1-2A1 1 0 0 0 28 4h-7V2a2 2 0 0 0-2-2h-6a2 2 0 0 0-2 2v2H4a1 1 0 0 0-.89.55l-1 2A1 1 0 0 0 3 8h2v22a2 2 0 0 0 .47 1.41A2 2 0 0 0 7 32h18a2 2 0 0 0 2-2V8h2a1 1 0 0 0 .89-1.45zM13 2h6v2h-6zm12 28H7V8h18z" />
                <path d="M17 26V10a2 2 0 0 0-2 2l.06 14H15v2a2 2 0 0 0 2-2zM22 26V10a2 2 0 0 0-2 2l.06 14H20v2a2 2 0 0 0 2-2zM12 26V10a2 2 0 0 0-2 2l.06 14H10v2a2 2 0 0 0 2-2z" />
              </g>
            </svg>
          </button>
        )}

        {/* Add button: show only on photo identify grid and explore grid (has id) */}
        {onAdd && id && !disableClick && (
          <button
            onClick={handleAddClick}
            className="absolute top-2 right-2 px-2 py-1 text-xs rounded bg-green-600 text-white shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 w-10 h-10"
            aria-label="Add plant"
            title="Add"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 128 128"
            >
              <path d="M128 63.954c0 2.006-.797 3.821-2.136 5.127-1.308 1.337-3.125 2.133-5.166 2.133 H71.302 v49.356 c0 4.012-3.284 7.292-7.302 7.292-2.009 0-3.827-.828-5.166-2.134-1.308-1.337-2.136-3.152-2.136-5.159 V71.214 H7.302 c-4.05 0-7.302-3.248-7.302-7.26 0-2.006.797-3.853 2.136-5.159a7.279 7.279 0 0 1 5.166-2.134 h49.395 V7.306 c0-4.012 3.284-7.26 7.302-7.26 2.009 0 3.827.828 5.166 2.133a7.238 7.238 0 0 1 2.136 5.127 v49.356 h49.395 A7.276 7.276 0 0 1 128 63.954z" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {name || common_name}
        </h3>

        {/* disableClick being true means the user is in the details page */}
        {disableClick && (
          <>
            {/* If it contains "id" it came from the plant identifier api */}
            {id && (
              <div className="space-y-3 text-sm text-gray-700">
                {scientific_name && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Scientific Name:
                    </span>{" "}
                    <span className="italic">{scientific_name[0]}</span>
                  </p>
                )}

                {origin && origin.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900">Origin:</span>
                    <ul className="list-disc list-inside ml-2">
                      {origin.map((location, idx) => (
                        <li key={idx}>{location}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {hardiness_zones?.min && hardiness_zones?.max && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Hardiness Zones:
                    </span>{" "}
                    {hardiness_zones.min === hardiness_zones.max
                      ? hardiness_zones.min
                      : `${hardiness_zones.min} – ${hardiness_zones.max}`}
                  </p>
                )}

                {cycle && (
                  <p>
                    <span className="font-semibold text-gray-900">Cycle:</span>{" "}
                    {cycle}
                  </p>
                )}

                {sunlight && sunlight.length > 0 && (
                  <div>
                    <span className="font-semibold text-gray-900">
                      Sunlight:
                    </span>
                    <ul className="list-disc list-inside ml-2">
                      {sunlight.map((sunData, idx) => (
                        <li key={idx}>{sunData}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {growth_rate && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Growth Rate:
                    </span>{" "}
                    {growth_rate}
                  </p>
                )}

                {care_level && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Care Level:
                    </span>{" "}
                    {care_level}
                  </p>
                )}

                {watering && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Watering:
                    </span>{" "}
                    {watering}
                  </p>
                )}

                {maintenance && (
                  <p>
                    <span className="font-semibold text-gray-900">
                      Maintenance:
                    </span>{" "}
                    {maintenance}
                  </p>
                )}

                {description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* If it contains "_id" it came from the plants collection api */}
            {_id && (
              <>
                {notes && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {notes}
                  </p>
                )}

                <div className="flex justify-between items-center text-xs text-gray-500">
                  {location && (
                    <span className="flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {location}
                    </span>
                  )}
                  {createdAt && <span>Added {formatDate(createdAt)}</span>}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
