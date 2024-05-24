import BookedVenueCard from "../BookedVenueCard";

const resetTime = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

export default function PreviousBookingsList({ bookings }) {
  const currentDate = resetTime(new Date());
  const sortedBookings = bookings.filter((booking) => resetTime(booking.dateTo) < currentDate).sort((a, b) => new Date(b.dateTo) - new Date(a.dateTo));

  if (sortedBookings.length > 0) {
    return (
      <ul className="flex flex-col gap-5">
        {sortedBookings.map((booking) => (
          <li key={booking.id} className="mb-5 opacity-80">
            <BookedVenueCard booking={booking} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>You have no previous bookings</p>;
  }
}
