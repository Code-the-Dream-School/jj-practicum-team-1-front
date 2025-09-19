import PlantGrid from "../components/PlantGrid";
import { useState, useEffect } from "react";
import api from "../lib/apiClient";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";
import EditPlantModal from "../components/EditPlantModal";
import SortButton from "../components/SortButton";

export default function PlantsPage() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(
          "/plants?sort=-createdAt&limit=10&page=1"
        );
        setPlants(response.plants || []);
      } catch (err) {
        console.error("Error fetching plants:", err);
        setError(err.message || "Failed to fetch plants");
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // open/close edit modal
  const openEdit = (plant) => setEditing(plant);
  const closeEdit = () => setEditing(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plant?")) return;

    const prev = plants;
    setPlants((list) => list.filter((p) => (p._id || p.id) !== id)); // optimistic remove

    try {
      await api.delete(`/plants/${id}`);
    } catch (e) {
      setPlants(prev); // revert if error
      alert(e.message || "Delete failed");
    }
  };

  // EDIT save handler (optimistic + PATCH)
  const handleEditSave = async (formValues) => {
    const id = editing?._id || editing?.id;
    if (!id) return;

    // Always send all fields, even if empty
    const patch = {
      name: formValues.name ?? "",
      location: formValues.location ?? "",
      notes: formValues.notes ?? "",
    };

    const prev = plants;

    // optimistic update
    setPlants((list) =>
      list.map((p) => (p._id === id ? { ...p, ...patch } : p))
    );

    try {
      await api.patch(`/plants/${id}`, patch);
      closeEdit();
    } catch (e) {
      setPlants(prev); // revert if error
      alert(e?.response?.data?.message || e.message || "Update failed");
    }
  };

  const setAscendingOrder = () =>
    setPlants((plants) =>
      [...plants].sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      })
    );
  const setDescendingOrder = () =>
    setPlants((plants) =>
      [...plants].sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase());
      })
    );

  useEffect(() => {
    isAscending ? setAscendingOrder() : setDescendingOrder();
  }, [isAscending]);

  const handleSort = () => {
    setIsAscending((value) => !value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Plant Collection
              </h1>
              <p className="text-gray-600">
                Discover and manage your plant observations
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <SortButton handleSort={handleSort} isAscending={isAscending} />

              {/* Add Plant Button */}
              <Button onClick={() => navigate("/identify")}>
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
                  <span>Add Plant</span>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {plants.length === 0 && (
          <>
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-semibold mb-2">No plants found</p>
                <p className="text-sm">
                  Start by adding your first plant to your collection!
                </p>
              </div>
            </div>
          </>
        )}

        {/* // Error state */}
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

        {/* Plant Grid */}
        <PlantGrid
          plants={plants}
          linkedFrom="plants page"
          onDelete={handleDelete}
          onEdit={openEdit}
        />
      </div>
      {/* Render modal at the bottom of the component return */}
      {editing && (
        <EditPlantModal
          plant={editing}
          onClose={closeEdit}
          onSave={handleEditSave}
        />
      )}
    </main>
  );
}
