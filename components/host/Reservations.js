import ReservationItem from "./ReservationItem";

export default function Reservations({ properties }) {
  console.log(properties);

  return (
    <section id="reservations" className="bg-white rounded-3xl shadow p-6 mb-4">
      <h2 className="text-2xl font-bold mb-6">Your Reservations</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {properties.map((property) => (
          <ReservationItem property={property} key={property.id} />
        ))}
      </div>
    </section>
  );
}
