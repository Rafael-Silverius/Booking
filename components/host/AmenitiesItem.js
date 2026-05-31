export default function AmenitiesItem({ amenity }) {
  return (
    <label
      key={amenity.id}
      className="flex items-center gap-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
    >
      <input
        type="checkbox"
        // checked={selectedAmenities.includes(amenity.id)}
        // onChange={() => toggleAmenity(amenity.id)}
      />

      <span>{amenity.name}</span>
    </label>
  );
}
