"use client";

import { useEffect, useState } from "react";
import { createProperty, updateProperty } from "@/services/apiProperties";
import ModalFormField from "./ModalFormField";
import AmenitiesItem from "./host/AmenitiesItem";

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
  const [tab, setTab] = useState("main");
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

  const handleSave = async (e) => {
    e.preventDefault();
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl w-125 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSave}>
          <h2 className="text-xl font-bold mb-2">
            {property ? "Edit property" : "Create new property"}
          </h2>
          {/* MODALS TABS  */}
          <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setTab("main")}
              className={`flex-1 py-2 rounded-lg transition ${
                tab === "main"
                  ? "bg-white shadow font-semibold"
                  : "text-gray-600"
              }`}
            >
              Main Details
            </button>

            <button
              type="button"
              onClick={() => setTab("amenities")}
              className={`flex-1 py-2 rounded-lg transition ${
                tab === "amenities"
                  ? "bg-white shadow font-semibold"
                  : "text-gray-600"
              }`}
            >
              Amenities
            </button>

            <button
              type="button"
              onClick={() => setTab("photos")}
              className={`flex-1 py-2 rounded-lg transition ${
                tab === "photos"
                  ? "bg-white shadow font-semibold"
                  : "text-gray-600"
              }`}
            >
              Photos
            </button>
          </div>

          {tab === "main" && (
            <>
              <ModalFormField
                id="title"
                label="Title"
                value={form.title ?? ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />

              <ModalFormField
                id="small_title"
                label="Small title"
                value={form.small_title ?? ""}
                onChange={(e) =>
                  setForm({ ...form, small_title: e.target.value })
                }
              />
              <ModalFormField
                id="description"
                label="Description"
                type="textarea"
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <ModalFormField
                id="city"
                label="City"
                value={form.city ?? ""}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />

              <ModalFormField
                id="country"
                label="Country"
                value={form.country ?? ""}
                onChange={(e) => setForm({ ...form, country: e.target.value })}
              />
              <ModalFormField
                id="address"
                label="Address"
                value={form.address ?? ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <div className="grid grid-cols-4 gap-x-2">
                <ModalFormField
                  id="guests"
                  label="Max Guests"
                  type="number"
                  min="1"
                  value={form.guests ?? ""}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                />

                <ModalFormField
                  id="bedrooms"
                  label="Bedrooms"
                  type="number"
                  min="1"
                  value={form.bedrooms ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, bedrooms: e.target.value })
                  }
                />

                <ModalFormField
                  id="beds"
                  label="Beds"
                  type="number"
                  min="1"
                  value={form.beds ?? ""}
                  onChange={(e) => setForm({ ...form, beds: e.target.value })}
                />

                <ModalFormField
                  id="bathrooms"
                  label="Bathrooms"
                  type="number"
                  min="1"
                  value={form.bathrooms ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, bathrooms: e.target.value })
                  }
                />
              </div>
              <ModalFormField
                id="price_per_night"
                label="Price per Night"
                type="number"
                min="20"
                value={form.price_per_night ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price_per_night: e.target.value,
                  })
                }
              />
            </>
          )}
          {tab === "amenities" && (
            <div className="grid grid-cols-2 gap-3">
              {property.property_amenities.map((amenity) => (
                <AmenitiesItem
                  amenity={amenity.amenities}
                  key={amenity.amenities.id}
                />
              ))}
            </div>
          )}
          {tab === "photos" && <></>}

          <div className="flex justify-end gap-2 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
