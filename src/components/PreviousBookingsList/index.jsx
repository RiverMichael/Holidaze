import BookedVenueCard from "../BookedVenueCard";

export default function PreviousBookingsList({ bookings }) {
  const currentDate = new Date();
  const sortedBookings = bookings.filter((booking) => new Date(booking.dateTo) < currentDate).sort((a, b) => new Date(b.dateFrom) - new Date(a.dateFrom));

  if (sortedBookings.length > 0) {
    return (
      <ul className="flex flex-col gap-5">
        {sortedBookings.map((booking) => (
          <div key={booking.id} className="mb-5 opacity-80">
            <BookedVenueCard booking={booking} />
          </div>
        ))}
      </ul>
    );
  } else {
    return <p>You have no previous bookings</p>;
  }
}
