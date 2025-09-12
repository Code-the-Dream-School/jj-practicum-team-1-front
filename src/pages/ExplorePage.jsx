import { useState } from "react";
import api from "../lib/apiClient";
import PlantGrid from "../components/PlantGrid";
import Button from "../components/shared/Button";
import { useLocation, useNavigate } from "react-router-dom";

// **`` Temporary data while not actually calling the api
const res = {
  data: [
    {
      id: 7,
      common_name: "Alpine Fir",
      scientific_name: ["Abies lasiocarpa"],
      default_image: {
        license: 5,
        license_name: "Attribution-ShareAlike License",
        license_url: "https://creativecommons.org/licenses/by-sa/2.0/",
        original_url:
          "https://perenual.com/storage/species_image/7_abies_lasiocarpa/og/51002756843_74fae3c2fa_b.jpg",
        regular_url:
          "https://perenual.com/storage/species_image/7_abies_lasiocarpa/regular/51002756843_74fae3c2fa_b.jpg",
        medium_url:
          "https://perenual.com/storage/species_image/7_abies_lasiocarpa/medium/51002756843_74fae3c2fa_b.jpg",
        small_url:
          "https://perenual.com/storage/species_image/7_abies_lasiocarpa/small/51002756843_74fae3c2fa_b.jpg",
        thumbnail:
          "https://perenual.com/storage/species_image/7_abies_lasiocarpa/thumbnail/51002756843_74fae3c2fa_b.jpg",
      },
    },
    {
      id: 82,
      common_name: "Nishiki Gawa Japanese Maple*",
      scientific_name: ["Acer palmatum 'Nishiki Gawa'"],
      default_image: {
        license: 451,
        license_name: "CC0 1.0 Universal (CC0 1.0) Public Domain Dedication",
        license_url: "https://creativecommons.org/publicdomain/zero/1.0/",
        original_url:
          "https://perenual.com/storage/species_image/82_acer_palmatum_nishiki_gawa/og/pexels-photo-4977537.jpg",
        regular_url:
          "https://perenual.com/storage/species_image/82_acer_palmatum_nishiki_gawa/regular/pexels-photo-4977537.jpg",
        medium_url:
          "https://perenual.com/storage/species_image/82_acer_palmatum_nishiki_gawa/medium/pexels-photo-4977537.jpg",
        small_url:
          "https://perenual.com/storage/species_image/82_acer_palmatum_nishiki_gawa/small/pexels-photo-4977537.jpg",
        thumbnail:
          "https://perenual.com/storage/species_image/82_acer_palmatum_nishiki_gawa/thumbnail/pexels-photo-4977537.jpg",
      },
    },
  ],
  total: 2,
};

export default function ExplorerPage() {
  const location = useLocation();
  const { state } = location;
  console.log("state.linkedFrom:", state?.linkedFrom);

  const [plants, setPlants] = useState(
    (state?.linkedFrom === "details page" &&
      JSON.parse(sessionStorage.getItem("plants"))) ||
      []
  );
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchName) {
      setError("Missing plant name");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // **`` This is the actual api call when you want to reactivate it
      // const res = await api.get(`/identifyPlants?name=${searchName}`);
      sessionStorage.setItem("plants", JSON.stringify(res.data));
      setPlants(res.data || []);
      setSearchName("");
    } catch (error) {
      console.error("Error searching for plants:", error);
      setError(error.message);
    }

    setIsLoading(false);
  };
  const handleAdd = (imageURL, name) => {
    console.log("Added");
    navigate("/identify", {
      state: { imageURL, name, mode: "manual" },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorer Page
          </h1>
          <div className="max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-3">
              <label
                htmlFor="plant-search"
                className="block text-sm font-medium text-gray-700"
              >
                Search for plants
              </label>

              <input
                id="plant-search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-300 focus:ring-opacity-50"
              />

              <Button type="submit" disabled={isLoading}>
                Search
              </Button>
            </form>
          </div>
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
          <PlantGrid
            plants={plants}
            linkedFrom="explorer page"
            onAdd={handleAdd}
          />
        )}
      </div>
    </main>
  );
}
