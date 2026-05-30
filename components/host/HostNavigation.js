const navItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "listings", label: "Listings" },
  { id: "reservations", label: "Reservations" },
  { id: "earnings", label: "Earnings" },
  { id: "ratings", label: "Ratings" },
  { id: "settings", label: "Settings" },
];
export default function HostNavigation({ activeSection }) {
  return (
    <aside className="bg-bg-white border-r pt-6 px-8 w-60 sticky top-0 h-screen">
      <nav className="space-y-4">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
              activeSection === item.id
                ? "font-bold bg-gray-100 text-black"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
