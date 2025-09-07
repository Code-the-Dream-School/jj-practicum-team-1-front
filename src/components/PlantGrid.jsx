import PlantCard from "./PlantCard";

export default function PlantGrid({ plants, linkedFrom, onDelete }) {
  // Grid display
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant._id || plant.id}
          plant={plant}
          linkedFrom={linkedFrom}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
