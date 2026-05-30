"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { useAuth } from "@/providers/AuthProvider";
import { fetchProfile } from "@/services/apiProfiles";

export default function Page() {
  const { session } = useAuth();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user) return;

      const data = await fetchProfile(session.user.id);
      setProfile(data);
    }

    loadProfile();
  }, [session]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="h-[70vh] bg-gray-100 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold mb-6">Become a Host</h1>

          <p className="text-xl text-gray-600 mb-8">
            Earn money by sharing your space with travelers.
          </p>

          <Link
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-lg"
            href={
              !session
                ? "/login?redirect=/host/createListing"
                : profile?.role === "host"
                ? "/host/dashboard"
                : "/host/createListing"
            }
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Why host with us?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 shadow-lg rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">💰 Earn income</h3>

            <p className="text-gray-600">
              Turn your unused property into passive income.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">🛡 Secure hosting</h3>

            <p className="text-gray-600">
              Verified users and secure reservations.
            </p>
          </div>

          <div className="p-8 shadow-lg rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">🌍 Meet travelers</h3>

            <p className="text-gray-600">
              Welcome guests from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Hosting is easy
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-3">1. Create listing</h3>

              <p className="text-gray-600">
                Add title, photos, amenities and pricing.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">2. Welcome guests</h3>

              <p className="text-gray-600">
                Accept reservations and communicate easily.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3">3. Get paid</h3>

              <p className="text-gray-600">
                Receive payments securely through the platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
