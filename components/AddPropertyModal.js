"use client";

import { useEffect, useState } from "react";
import { createProperty, updateProperty } from "@/services/apiProperties";

const emptyForm = {
  title: "",
  small_title: "",
  description: "",
  city: "",
  country: "Greece",
  address: "",
  guests: "",
  bedrooms: "",
  beds: "",
  bathrooms: "",
  price_per_night: "",
};

export default function AddPropertyModal({
  isOpen,
  onClose,
  userId,
  onSuccess,
  property,
}) {
  const [form, setForm] = useState(emptyForm);
  useEffect(() => {
    if (!isOpen) return;

    if (property) {
      setForm({
        title: property.title ?? "",
        small_title: property.small_title ?? "",
        description: property.description ?? "",
        city: property.city ?? "",
        country: property.country ?? "Greece",
        address: property.address ?? "",
        guests: property.guests ?? "",
        bedrooms: property.bedrooms ?? "",
        beds: property.beds ?? "",
        bathrooms: property.bathrooms ?? "",
        price_per_night: property.price_per_night ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [isOpen, property]);

  if (!isOpen) return null;

  const isEdit = !!property?.id;

  const handleSave = async () => {
    const payload = {
      ...form,
      owner_id: userId,
      guests: Number(form.guests),
      bedrooms: Number(form.bedrooms),
      beds: Number(form.beds),
      bathrooms: Number(form.bathrooms),
      price_per_night: Number(form.price_per_night),
    };

    if (isEdit) {
      console.log("Calling Update");
      await updateProperty(property.id, payload);
    } else {
      console.log("Calling Create");
      await createProperty(payload);
    }

    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">Add Property</h2>
        <label>Title</label>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Title"
          value={form.title ?? ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Title</label>
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Small title"
          value={form.small_title ?? ""}
          onChange={(e) => setForm({ ...form, small_title: e.target.value })}
        />

        <textarea
          className="w-full border p-2 mb-3 rounded"
          placeholder="Description"
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="City"
          value={form.city ?? ""}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Country"
          value={form.country ?? ""}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Address"
          value={form.address ?? ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Maximum guests"
          type="number"
          value={form.guests ?? ""}
          min="1"
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Bedrooms"
          type="number"
          value={form.bedrooms ?? ""}
          min="1"
          onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Beds"
          type="number"
          value={form.beds ?? ""}
          min="1"
          onChange={(e) => setForm({ ...form, beds: e.target.value })}
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Bathrooms"
          type="number"
          value={form.bathrooms ?? ""}
          min="1"
          onChange={(e) =>
            setForm({
              ...form,
              bathrooms: e.target.value,
            })
          }
        />
        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Price per night"
          type="number"
          value={form.price_per_night ?? ""}
          min="20"
          onChange={(e) =>
            setForm({
              ...form,
              price_per_night: e.target.value,
            })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
