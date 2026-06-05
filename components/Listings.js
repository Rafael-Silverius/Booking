import OwnersPropertyCard from "./OwnersPropertyCard";

export default function Listings({
  properties,
  onAddProperty,
  setModal,
  onSuccess,
}) {
  return (
    <section id="listings" className="bg-white rounded-3xl shadow p-6 mb-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Listings</h2>

        <button
          onClick={onAddProperty}
          className="bg-red-500 text-white px-5 py-2 rounded-xl"
        >
          Add Property
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {properties.map((pro) => (
            <OwnersPropertyCard
              key={pro.id}
              property={pro}
              setModal={setModal}
              onSuccess={onSuccess}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
