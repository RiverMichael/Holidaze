import VenueBookingDetails from "../VenueBookingsListDetails";

export default function VenueBookingsList({ bookings }) {
  const sortedBookings = [...bookings].sort((a, b) => {
    return new Date(a.dateFrom) - new Date(b.dateFrom);
  });
  const upcomingBookings = sortedBookings.filter((booking) => new Date(booking.dateFrom) > new Date());

  return (
    <>
      {upcomingBookings.length ? (
        <ul className="flex flex-col gap-2 mt-1">
          {upcomingBookings.map((booking) => (
            <VenueBookingDetails key={booking.id} booking={booking} />
          ))}
        </ul>
      ) : (
        <p>No upcoming bookings.</p>
      )}
    </>
  );
}
