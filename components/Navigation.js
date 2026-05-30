"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import supabase from "@/services/supabase";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/services/apiProfiles";

export default function Navigation() {
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
    <>
      <nav className="flex items-center gap-8">
        <Link
          href="/"
          className="text-sm font-medium text-slate-700 hover:text-black transition"
        >
          Homes
        </Link>

        {session && (
          <>
            <Link
              href={profile?.role === "host" ? "/host/dashboard" : "/bookings"}
              className="text-sm font-medium text-slate-700 hover:text-black transition"
            >
              {profile?.role === "host" ? "Manage Properties" : "My Bookings"}
            </Link>
            {/* {profile?.role === "host" && (
              <Link
                href="/host"
                className="text-sm font-medium text-slate-700 hover:text-black transition"
              >
                Manage Bookings
              </Link>
            )} */}
          </>
        )}
        <Link
          href="/about"
          className="text-sm font-medium text-slate-700 hover:text-black transition"
        >
          About
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full px-4 py-2">
            ☰
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/host" className="font-medium">
                  Become a host
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {session ? (
                <>
                  <DropdownMenuItem>
                    <Link href="/profile">
                      {session.user.identities[0].identity_data.full_name}
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                    }}
                    className="cursor-pointer"
                  >
                    <Link href="/">Logout</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login">Login or Sign up</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
