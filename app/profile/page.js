"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { fetchProfile } from "@/services/apiProfiles";
import Link from "next/link";

export default function ProfilePage() {
  const { session } = useAuth();
  const [profile, setProfile] = useState(null);

  const user = session?.user;

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const data = await fetchProfile(user.id);
      setProfile(data);
    }

    loadProfile();
  }, [user]);

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-gray-500 text-lg">
        <p>Not logged in</p>
        <p>
          Click
          <Link href={"/login"} className="text-blue-500">
            here
          </Link>
          to log in
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

        {/* Info */}
        <div className="text-left space-y-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="text-base font-medium text-gray-900">
              {profile?.full_name || "Not set"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">User ID</p>
            <p className="text-xs text-gray-600 break-all">{user.id}</p>
          </div>
        </div>

        {/* Button */}
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
