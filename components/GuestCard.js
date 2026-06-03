export default function GuestCard({ guest }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center gap-4 mb-6">
      <img
        src={guest.avatar_url}
        alt={guest.full_name}
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div>
        <h2 className="text-lg font-semibold">{guest.full_name}</h2>
        <p className="text-gray-500">{guest.email}</p>
        <small className="font-medium text-gray-500">{guest.id}</small>
      </div>
    </div>
  );
}
