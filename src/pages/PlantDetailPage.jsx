import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../lib/apiClient";
import Button from "../components/shared/Button";
import PlantCard from "../components/PlantCard";

// **`` Temporary data while not actually calling the api
const res = {
  data: {
    id: 2230,
    common_name: "crocus",
    scientific_name: ["Crocus luteus 'Golden Yellow'"],
    origin: [
      "Turkey",
      "Greece",
      "Bulgaria",
      "Albania",
      "Macedonia",
      "Serbia",
      "Montenegro",
      "Bosnia and Herzegovina",
      "Croatia",
    ],
    hardiness_zones: {
      min: "3",
      max: "8",
    },
    hardiness_location: {
      full_url:
        "https://perenual.com/api/hardiness-map?species_id=2230&size=og&key=sk-7wRB68a4e4efc60fe11920",
      full_iframe:
        "<iframe frameborder=0 scrolling=yes seamless=seamless width=1000 height=550 style='margin:auto;' src='https://perenual.com/api/hardiness-map?species_id=2230&size=og&key=sk-7wRB68a4e4efc60fe11920'></iframe>",
    },
    description:
      "Crocus luteus 'Golden Yellow' is truly an amazing flower. Its vibrant sunny yellow petals are a sight to behold! They stand atop thin green stems and offer a cheerful splash of color to any garden setting. As a spring-blooming perennial, it's hardy in most climates, and its spectacular display will reappear year after year. The lovely, aromatic blooms also attract bees and other pollinators, making it an excellent choice for butterfly gardens. Not a fan of mowing the lawn? Planting Crocus luteus 'Golden Yellow' in large clumps will provide a beautiful, low-maintenance, natural alternative and can even resist light foot traffic!",
    default_image: {
      license: 45,
      license_name: "Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
      license_url: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
      original_url:
        "https://perenual.com/storage/species_image/2230_crocus_luteus_golden_yellow/og/Crocus_ancyrensis002.jpg",
      regular_url:
        "https://perenual.com/storage/species_image/2230_crocus_luteus_golden_yellow/regular/Crocus_ancyrensis002.jpg",
      medium_url:
        "https://perenual.com/storage/species_image/2230_crocus_luteus_golden_yellow/medium/Crocus_ancyrensis002.jpg",
      small_url:
        "https://perenual.com/storage/species_image/2230_crocus_luteus_golden_yellow/small/Crocus_ancyrensis002.jpg",
      thumbnail:
        "https://perenual.com/storage/species_image/2230_crocus_luteus_golden_yellow/thumbnail/Crocus_ancyrensis002.jpg",
    },
    cycle: "Perennial",
    sunlight: ["Full sun", "part shade"],
    growth_rate: "Low",
    care_level: "Moderate",
    watering: "Average",
    maintenance: "Low",
  },
};

export default function PlantDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { state } = location;

  // Fetch individual plant from the API
  useEffect(() => {
    let url;

    if (state.linkedFrom === "plants page") {
      url = `/plants/${id}`;
    }

    if (state.linkedFrom === "explorer page") {
      url = `/identifyPlants/${id}`;
    }

    const fetchPlant = async () => {
      try {
        setLoading(true);
        setError(null);

        // **`` This is the actual api call when you want to reactivate it
        // const response = await api.get(url);
        // setPlant(response.plant || response.data);

        // **`` When you reactivate the api call, remove the code between the block below
        //***************************************** */
        let response;
        if (state.linkedFrom === "plants page") {
          url = `/plants/${id}`;
          response = await api.get(url);

          setPlant(response.plant);
        }
        if (state.linkedFrom === "explorer page") {
          url = `/identifyPlants/${id}`;
          setPlant(res.data);
        }
        //***************************************** */
      } catch (err) {
        console.error("Error fetching plant:", err);
        setError(err.message || "Failed to fetch plant details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlant();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl font-semibold">Plant not found</p>
              <p className="text-sm text-gray-600 mt-2">{error}</p>
            </div>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  // Plant not found
  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-xl font-semibold text-gray-600">
              Plant not found
            </p>
            <Button onClick={() => navigate(-1)} className="mt-4">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </Button>
        </div>

        {/* Plant Card Display */}
        <div className="max-w-md mx-auto">
          <PlantCard plant={plant} disableClick={true} />
        </div>
      </div>
    </div>
  );
}
