import BookedVenueCard from "../BookedVenueCard";

export default function UpcomingBookingsList({ bookings }) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  const sortedBookings = bookings.filter((booking) => new Date(booking.dateTo) > currentDate).sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  if (sortedBookings.length > 0) {
    return (
      <ul className="flex flex-col gap-5">
        {sortedBookings.map((booking) => (
          <li key={booking.id} className="mb-5">
            <BookedVenueCard booking={booking} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>You have no upcoming bookings</p>;
  }
}
