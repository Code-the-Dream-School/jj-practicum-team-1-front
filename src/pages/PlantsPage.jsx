import PlantGrid from "../components/PlantGrid";

export default function PlantsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Plant Collection
          </h1>
          <p className="text-gray-600">
            Discover and manage your plant observations
          </p>
        </div>

        {/* Plant Grid */}
        <PlantGrid />
      </div>
    </main>
  );
}
