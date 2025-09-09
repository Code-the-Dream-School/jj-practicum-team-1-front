import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../lib/apiClient";
import PlantCard from "../components/PlantCard";
import Button from "../components/shared/Button";
import { useAuth } from "../auth/AuthContext";
import PlantGrid from "../components/PlantGrid";

const res = {
  data: [
    {
      id: 8551,
      common_name: "golden barrel cactus",
      scientific_name: ["Echinocactus grusonii"],
      default_image: {
        license: 451,
        license_name: "CC0 1.0 Universal (CC0 1.0) Public Domain Dedication",
        license_url: "https://creativecommons.org/publicdomain/zero/1.0/",
        original_url: "https://perenual.com/storage/image/upgrade_access.jpg",
        regular_url: "https://perenual.com/storage/image/upgrade_access.jpg",
        medium_url: "https://perenual.com/storage/image/upgrade_access.jpg",
        small_url: "https://perenual.com/storage/image/upgrade_access.jpg",
        thumbnail: "https://perenual.com/storage/image/upgrade_access.jpg",
      },
    },
  ],
  total: 1,
};

export default function PlantIdentifierPage() {
  // Mode selection
  const [mode, setMode] = useState(
    sessionStorage.getItem("mode") || "identify"
  ); // 'identify' or 'manual'

  // Image identification states
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [identifiedPlants, setIdentifiedPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Manual entry states
  const [plantName, setPlantName] = useState("");
  const [plantNotes, setPlantNotes] = useState("");
  const [plantLocation, setPlantLocation] = useState("");
  const [manualImage, setManualImage] = useState(null);
  const [manualPreviewUrl, setManualPreviewUrl] = useState(null);

  const [plants, setPlants] = useState(
    JSON.parse(sessionStorage.getItem("plants")) || []
  );

  // Common states
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();

  const location = useLocation();

  const resetForm = () => {
    setError(null);
    // Reset identification mode states
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIdentifiedPlants([]);
    setSelectedPlant(null);
    // Reset manual mode states
    setPlantName("");
    setPlantNotes("");
    setPlantLocation("");
    setManualImage(null);
    if (manualPreviewUrl) URL.revokeObjectURL(manualPreviewUrl);
    setManualPreviewUrl(null);
  };

  const validateImageFile = (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      return false;
    }
    return true;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && validateImageFile(file)) {
      setSelectedFile(file);
      setError(null);
      setIdentifiedPlants([]);
      setSelectedPlant(null);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleManualImageSelect = (event) => {
    const file = event.target.files[0];
    if (file && validateImageFile(file)) {
      setManualImage(file);
      setError(null);

      // Create preview URL
      const url = URL.createObjectURL(file);
      setManualPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      const retain = sessionStorage.getItem("retainPlantData");

      if (retain) {
        sessionStorage.removeItem("retainPlantData");
        return;
      }
      // sessionStorage.removeItem("plants");
      // sessionStorage.removeItem("mode");
    };
  }, []);

  const switchMode = (newMode) => {
    // sessionStorage.removeItem("retainPlantData");
    // sessionStorage.removeItem("plants");
    // sessionStorage.removeItem("mode");
    setMode(newMode);
    setError(null);
    // Reset identification mode states
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setIdentifiedPlants([]);
    setSelectedPlant(null);
    // Reset manual mode states
    setPlantName("");
    setPlantNotes("");
    setPlantLocation("");
    setManualImage(null);
    if (manualPreviewUrl) URL.revokeObjectURL(manualPreviewUrl);
    setManualPreviewUrl(null);
  };

  const handleIdentifyPlant = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      if (selectedFile) {
        formData.append("images", selectedFile);
      }

      // const res = await api.post("/identifyPlants", formData);

      setPlants(res.data);
      sessionStorage.setItem("plants", JSON.stringify(res.data));
      // sessionStorage.removeItem("plants");
      sessionStorage.setItem("mode", "results");

      setMode("results");
      resetForm();
      // navigate("/plants");
    } catch (err) {
      console.error("Identify plant error:", err);
      setError(err.message || "Failed to identify plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
    setError(null);
  };

  const handleSavePlant = () => {
    // Just for UI - no API calls
    // Button works but doesn't do anything yet
  };

  const handleSaveManualPlant = async () => {
    if (!plantName.trim()) {
      setError("Please enter a plant name.");
      return;
    }

    if (!isAuthenticated) {
      setError("Please log in to save plants.");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", plantName.trim());
      formData.append("notes", plantNotes);
      formData.append("location", plantLocation);

      if (manualImage instanceof File) {
        formData.append("file", manualImage);
      } else if (typeof manualImage === "string") {
        formData.append("imageURL", manualImage);
      }

      await api.post("/plants", formData);

      resetForm();
      navigate("/plants");
    } catch (err) {
      console.error("Save manual plant error:", err);
      setError(err.message || "Failed to save plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async (imageURL, name) => {
    setMode("manual");
    setPlantName(name);
    setManualImage(imageURL);
    setManualPreviewUrl(imageURL);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Plant to Collection
          </h1>
          <p className="text-gray-600">
            Identify a plant from a photo or add one manually
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={() => switchMode("identify")}
            variant={mode === "identify" ? "primary" : "outline"}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Identify from Photo</span>
            </div>
          </Button>

          <Button
            onClick={() => switchMode("manual")}
            variant={mode === "manual" ? "primary" : "outline"}
          >
            <div className="flex items-center space-x-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add Manually</span>
            </div>
          </Button>
        </div>

        {/* **`` Identifier results displayed here ``**  */}
        {mode === "results" && (
          <PlantGrid
            plants={plants}
            linkedFrom="explorer page"
            onAdd={handleAdd}
          />
        )}

        {/* Identify Mode - Upload Section */}
        {mode === "identify" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upload Plant Image
            </h2>

            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="plant-image-upload"
              />
              <label
                htmlFor="plant-image-upload"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewUrl}
                      alt="Selected plant"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        resetForm();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </label>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleIdentifyPlant}
                disabled={!selectedFile || isLoading}
              >
                <div className="flex items-center space-x-2">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Identifying Plant...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>Identify Plant</span>
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>
        )}

        {mode === "manual" && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Add Plant Manually
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Plant Details */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="plant-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Plant Name *
                  </label>
                  <input
                    type="text"
                    id="plant-name"
                    value={plantName}
                    onChange={(e) => setPlantName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter plant name..."
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="manual-notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Notes (optional)
                  </label>
                  <textarea
                    id="manual-notes"
                    value={plantNotes}
                    onChange={(e) => setPlantNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Add any notes about this plant..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="manual-location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    id="manual-location"
                    value={plantLocation}
                    onChange={(e) => setPlantLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Where did you find this plant?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plant Image (optional)
                </label>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleManualImageSelect}
                    className="hidden"
                    id="manual-plant-image-upload"
                  />
                  <label
                    htmlFor="manual-plant-image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    {manualPreviewUrl ? (
                      <div className="relative w-full h-full">
                        <img
                          src={manualPreviewUrl}
                          alt="Selected plant"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setManualImage(null);
                            if (manualPreviewUrl)
                              URL.revokeObjectURL(manualPreviewUrl);
                            setManualPreviewUrl(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                onClick={handleSaveManualPlant}
                disabled={isLoading || !plantName.trim()}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Add to Collection"
                )}
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {mode === "identify" && identifiedPlants.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Identified Plants ({identifiedPlants.length})
            </h2>
            <p className="text-gray-600 mb-4">
              Select the plant that matches your image:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {identifiedPlants.map((plant, index) => (
                <div
                  key={plant.id || index}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlant?.id === plant.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handlePlantSelect(plant)}
                >
                  {plant.default_image?.medium_url && (
                    <img
                      src={plant.default_image.medium_url}
                      alt={plant.common_name || plant.scientific_name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-semibold text-sm text-gray-900">
                    {plant.common_name || "Unknown Common Name"}
                  </h3>
                  <p className="text-xs text-gray-600 italic">
                    {plant.scientific_name || "Unknown Scientific Name"}
                  </p>
                  {plant.cycle && (
                    <p className="text-xs text-gray-500 mt-1">
                      Cycle: {plant.cycle}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Plant Details Form */}
            {selectedPlant && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Add to Your Collection
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="plant-notes"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Notes (optional)
                    </label>
                    <textarea
                      id="plant-notes"
                      value={plantNotes}
                      onChange={(e) => setPlantNotes(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Add any notes about this plant..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="plant-location"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Location (optional)
                    </label>
                    <input
                      type="text"
                      id="plant-location"
                      value={plantLocation}
                      onChange={(e) => setPlantLocation(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Where did you find this plant?"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    onClick={resetForm}
                    variant="secondary"
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSavePlant} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Add to Collection"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
