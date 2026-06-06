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
import supabase from "@/services/supabase/supabase";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/services/apiProfiles";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import {
  House,
  CalendarDays,
  LayoutDashboard,
  Info,
  Menu,
  UserPlus,
  User,
  LogOut,
  LogIn,
} from "lucide-react";

export default function Navigation() {
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const navLinkClass = (href) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-slate-700 hover:bg-white hover:text-black transition ${
      isActive(href)
        ? "bg-white shadow-sm text-black"
        : "text-slate-700 hover:bg-white hover:text-black"
    }`;

  const { session } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      if (!session?.user) return;

      const data = await fetchProfile(session.user.id);
      setProfile(data);
    }

    loadProfile();
  }, [session]);

  const handleLogout = async () => {
    try {
      toast.loading("Signing out...", { id: "logout" });

      await supabase.auth.signOut();

      toast.success("Logged out", { id: "logout" });

      router.push("/");
      router.refresh();
    } catch (err) {
      toast.error("Logout failed", { id: "logout" });
      console.error(err);
    }
  };

  return (
    <>
      <nav className="hidden md:flex items-center gap-2">
        <Link
          href="/"
          className={navLinkClass("/")}
          onClick={() => setOpen(false)}
        >
          <House size={16} className="hidden lg:inline" /> Homes
        </Link>

        {session && (
          <Link
            href="/bookings"
            className={navLinkClass("/bookings")}
            onClick={() => setOpen(false)}
          >
            <CalendarDays size={16} className="hidden lg:inline" /> My Bookings
          </Link>
        )}

        {profile?.role === "host" && (
          <Link
            href="/host/dashboard"
            className={navLinkClass("/host/dashboard")}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={16} className="hidden lg:inline" /> Manage
            Bookings
          </Link>
        )}

        <Link
          href="/about"
          className={navLinkClass("/about")}
          onClick={() => setOpen(false)}
        >
          <Info size={16} className="hidden lg:inline" /> About
        </Link>
      </nav>

      <DropdownMenu>
        <DropdownMenuTrigger className="hidden md:inline hover:bg-gray-300 text-gray-800 rounded-full px-4 py-2 ">
          ☰
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 mr-4 mt-2">
          {profile?.role !== "host" && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/host" className="font-medium">
                  Become a host
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuGroup>
            {session ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className={navLinkClass("/profile")}>
                    <User size={16} />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  asChild
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <Link href="/" className={navLinkClass("/")}>
                    <LogOut size={16} />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login" className={navLinkClass("/login")}>
                  <LogIn size={16} />
                  Login or Sign up
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 flex items-center gap-4 rounded-md hover:bg-gray-200 transition">
              <Menu size={18} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 mr-4 mt-2">
            <DropdownMenuItem asChild>
              <Link href="/" className={navLinkClass("/")}>
                <House size={16} /> Homes
              </Link>
            </DropdownMenuItem>

            {session && (
              <DropdownMenuItem asChild>
                <Link href="/bookings" className={navLinkClass("/bookings")}>
                  <CalendarDays size={16} /> My Bookings
                </Link>
              </DropdownMenuItem>
            )}

            {profile?.role === "host" && (
              <DropdownMenuItem asChild>
                <Link
                  href="/host/dashboard"
                  className={navLinkClass("/host/dashboard")}
                >
                  <LayoutDashboard size={16} /> Manage Bookings
                </Link>
              </DropdownMenuItem>
            )}

            {profile?.role !== "host" && (
              <DropdownMenuItem asChild>
                <Link href="/host" className={navLinkClass("/host")}>
                  <UserPlus size={16} />
                  Become a host
                </Link>
              </DropdownMenuItem>
            )}
            {session ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className={navLinkClass("/profile")}>
                    <User size={16} />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  asChild
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <Link href="/" className={navLinkClass("/")}>
                    <LogOut size={16} />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login" className={navLinkClass("/login")}>
                  <LogIn size={16} />
                  Login or Sign up
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem asChild>
              <Link href="/about" className={navLinkClass("/about")}>
                <Info size={16} /> About
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
