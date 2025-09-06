import { useNavigate } from "react-router-dom";

export default function PlantCard({ plant, disableClick = false, linkedFrom }) {
  console.log("linkedFrom:", linkedFrom);
  const navigate = useNavigate();

  const {
    _id,
    id,
    name,
    common_name,
    scientific_name,
    origin,
    hardiness_zones,
    // hardiness_location, <-- This reveals our API key in the url. Might get rid of this response on the backend
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
              <>
                {scientific_name && (
                  <div>Scientific Name: {scientific_name[0]}</div>
                )}
                {origin && (
                  <div>
                    Origin:
                    {origin.map((location) => (
                      <div>{location}</div>
                    ))}
                  </div>
                )}
                {hardiness_zones.min && hardiness_zones.max && (
                  <div>
                    Hardiness Zones:{" "}
                    {hardiness_zones?.min === hardiness_zones?.max
                      ? hardiness_zones?.min
                      : `${hardiness_zones?.min} - ${hardiness_zones?.max}`}
                  </div>
                )}
                {cycle && <div>Cycle: {cycle}</div>}
                {sunlight && (
                  <div>
                    Sunlight:
                    {sunlight.map((sunData) => (
                      <div>{sunData}</div>
                    ))}
                  </div>
                )}
                {growth_rate && <div>Growth Rate: {growth_rate}</div>}
                {care_level && <div>Care Level: {care_level}</div>}
                {watering && <div>Watering: {watering}</div>}
                {maintenance && <div>Maintenance: {maintenance}</div>}
                {description && <div>{description}</div>}
              </>
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
