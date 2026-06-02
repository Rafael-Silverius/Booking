import { deleteProperty } from "@/services/apiProperties";
import { toast } from "sonner";

export default function OwnersPropertyCard({ property, setModal, onSuccess }) {
  const handleDelete = async () => {
    const hasActiveBookings = property.bookings.some(
      (b) => b.status === "pending" || b.status === "confirmed"
    );

    if (hasActiveBookings) {
      toast.error(
        "This property cannot be deleted because it has active bookings.",
        { position: "top-center" }
      );
      return;
    }

    if (!window.confirm("Delete this property?")) return;

    try {
      await deleteProperty(property.id);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Failed to delete property");
      toast.error(err, { position: "top-center" });
    }
  };

  console.log(property);

  return (
    <div className="border rounded-2xl p-4 flex items-center gap-4">
      <img
        src={property?.property_images[0]?.image_url}
        className="w-32 h-24 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-bold text-lg">{property.title}</h3>
        <small className="text-gray-600">{property.small_title}</small>

        <p className="text-gray-500">
          {property.city}, {property.country}
        </p>
      </div>

      <div className="text-right">
        <p className="font-bold">€{property.price_per_night}/night</p>
        <div className="flex gap-2">
          <button
            className="mt-2 border px-4 py-1 rounded-lg"
            onClick={() => setModal({ open: true, property })}
          >
            Edit
          </button>
          <button
            className="mt-2 border px-4 py-1 rounded-lg bg-red-500 text-white"
            onClick={handleDelete}
          >
            Delete Property
          </button>
        </div>
      </div>
    </div>
  );
}
