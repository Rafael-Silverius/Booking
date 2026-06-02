export default function GuestCard({ guest }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={guest.avatar_url}
          alt={guest.full_name}
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-lg font-semibold">{guest.full_name}</h2>
          <p className="text-gray-500">{guest.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
        <span className="font-medium text-gray-600">Guest ID</span>
        <span>{guest.id}</span>

        <span className="font-medium text-gray-600">Name</span>
        <span>{guest.full_name}</span>

        <span className="font-medium text-gray-600">Email</span>
        <span>{guest.email}</span>
      </div>
    </div>
  );
}
