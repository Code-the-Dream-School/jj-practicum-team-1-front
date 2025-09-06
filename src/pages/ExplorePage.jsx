import { useState } from "react";
import api from "../lib/apiClient";
import PlantGrid from "../components/PlantGrid";

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
    <main>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Explorer Page</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="plant-search">Search for plants</label>
        <input
          style={{ border: "solid 2px black", borderRadius: "5px" }}
          id="plant-search"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <button
          style={{ background: "lightgrey" }}
          type="submit"
          disabled={isLoading}
        >
          Search
        </button>
      </form>

      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
      <PlantGrid plants={plants} />
    </main>
  );
}
