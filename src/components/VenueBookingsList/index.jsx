import VenueBookingDetails from "../VenueBookingsListDetails";

export default function VenueBookingsList({ bookings }) {
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });

  return (
    <ul className="flex flex-col gap-2 mt-1">
      {sortedBookings.map((booking) => (
        <VenueBookingDetails key={booking.id} booking={booking} />
      ))}
    </ul>
  );
}
