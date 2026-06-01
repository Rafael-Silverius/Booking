export default function Dashboard({ properties, reservations }) {
  return (
    <section id="dashboard">
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <a href="#listings" className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Listings</p>

          <h2 className="text-3xl font-bold mt-2">{properties.length}</h2>
        </a>

        <a href="#reservations" className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Reservations</p>

          <h2 className="text-3xl font-bold mt-2">{reservations?.length}</h2>
        </a>

        <a href="#ratings" className="bg-white rounded-3xl shadow p-6">
          <p className="text-gray-500">Overall Rating</p>

          <h2 className="text-3xl font-bold mt-2">4.9</h2>
        </a>
      </div>
    </section>
  );
}
