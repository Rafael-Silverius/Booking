"use client";
import AddPropertyModal from "@/components/AddPropertyModal";
import Dashboard from "@/components/Dashboard";
import HostNavigation from "@/components/HostNavigation";
import Listings from "@/components/Listings";
import Ratings from "@/components/Ratings";
import Reservations from "@/components/Reservations";
import Settings from "@/components/Settings";
import { useAuth } from "@/providers/AuthProvider";
import { getAmenities } from "@/services/apiAmenities";
import { getBookingsByOwnerId } from "@/services/apiBookings";
import { getPropertiesByOwnerId } from "@/services/apiProperties";
import { useEffect, useState } from "react";

export default function Page() {
  const { session } = useAuth();
  const [properties, setProperties] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [modal, setModal] = useState({ open: false, property: null });
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    getAmenities().then(setAmenities).catch(console.error);
  }, []);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!session?.user?.id) return;

    getPropertiesByOwnerId(session.user.id)
      .then(setProperties)
      .catch(console.error);
  }, [session?.user?.id, refreshKey]);

  useEffect(() => {
    if (!session?.user?.id) return;

    getBookingsByOwnerId(session.user.id)
      .then(setReservations)
      .catch(console.error);
  }, [session?.user?.id, refreshKey]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");

      let current = "";

      sections.forEach((section) => {
        const top = section.offsetTop - 60;
        const height = section.offsetHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.id;
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <HostNavigation activeSection={activeSection} />

      <main className="flex-1 p-10">
        <Dashboard properties={properties} reservations={reservations} />
        <Listings
          properties={properties}
          onAddProperty={() => setModal({ open: true, property: null })}
          setModal={setModal}
          onSuccess={handleSuccess}
        />
        {console.log(properties)}
        <Reservations properties={properties} onSuccess={handleSuccess} />
        <Ratings />
        <Settings />
      </main>
      <AddPropertyModal
        isOpen={modal.open}
        onClose={() => setModal({ open: false, property: null })}
        userId={session?.user?.id}
        property={modal.property}
        amenities={amenities}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
