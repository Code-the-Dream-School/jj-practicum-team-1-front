import { useState } from "react";
import api from "../lib/apiClient";
import PlantGrid from "../components/PlantGrid";
import Button from "../components/shared/Button";

export default function ExplorerPage() {
  const [plants, setPlants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchName) {
      setError("Missing plant name");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await api.get(`/identifyPlants?name=${searchName}`);
      console.log("res:", res);
      setPlants(res.data || []);
      setSearchName("");
    } catch (error) {
      console.error("Error searching for plants:", error);
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorer Page
          </h1>

          <form onSubmit={handleSubmit}>
            <label htmlFor="plant-search">Search for plants</label>
            <input
              style={{ border: "solid 2px black", borderRadius: "5px" }}
              id="plant-search"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />

            <Button type="submit" disabled={isLoading}>
              Search
            </Button>
          </form>
        </div>

        {error && (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg
                className="w-12 h-12 mx-auto mb-4"
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
              <p className="text-lg font-semibold">Error loading plants</p>
              <p className="text-sm text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {!isLoading && !error && (
          <PlantGrid plants={plants} linkedFrom="explorer page" />
        )}
      </div>
    </main>
  );
}
