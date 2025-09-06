import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import Button from "../components/shared/Button";
import PlantCard from "../components/PlantCard";

export default function PlantDetailPage() {
  const { id } = useParams();
  console.log("id:", id);
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch individual plant from the API
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        setError(null);

        // Make API call to get single plant
        const response = await api.get(`/plants/${id}`);
        setPlant(response.plant);
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
            <Button onClick={() => navigate("/plants")}>Back to Plants</Button>
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
            <Button onClick={() => navigate("/plants")} className="mt-4">
              Back to Plants
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
            onClick={() => navigate("/plants")}
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
            Back to Plants
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
