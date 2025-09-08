import { useNavigate } from "react-router-dom";

export default function PlantCard({
  plant,
  disableClick = false,
  linkedFrom,
  onDelete,
  onEdit,
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

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // don’t navigate to details
    e.preventDefault();
    if (onDelete && plantId) onDelete(plantId);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (onEdit && plantId) onEdit(plant); // pass the whole plant to prefill the modal
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const displayImage =
    imageURL || default_image?.medium_url || "/plant-hero.jpg";

  // Handle click to navigate to plant detail page
  const handleClick = () => {
    if (!disableClick) {
      navigate(`/plants/${_id || id}`, { state: { linkedFrom: linkedFrom } });
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
       
        {/* EDIT + DELETE buttons container */}
        {_id && !disableClick && (
          <div className="absolute top-2 right-2 flex gap-2">
            {/* Edit button */}
            {onEdit && (
              <button
                onClick={handleEditClick}
                className="px-2 py-1 text-xs rounded bg-gray-800 text-white/90 shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 w-10"
                aria-label="Edit plant"
                title="Edit"
              >
                {/* Simple pencil icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 0 1 2.828 2.828l-8.25 8.25a2 2 0 0 1-.878.514l-3.06.817a.75.75 0 0 1-.916-.916l.816-3.06a2 2 0 0 1 .515-.878l8.25-8.25Z" />
                  <path d="M5.121 13.379 6.62 14.88" />
                </svg>
              </button>
            )}

            {/* Delete button - unchanged */}
            {onDelete && (
              <button
                onClick={handleDeleteClick}
                className="px-2 py-1 text-xs rounded bg-red-600 text-white shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 w-10"
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
          </div>
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
