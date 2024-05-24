import BookedVenueCard from "../BookedVenueCard";

const resetTime = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};
export default function UpcomingBookingsList({ bookings }) {
  const currentDate = resetTime(new Date());
  const sortedBookings = bookings.filter((booking) => resetTime(booking.dateTo) >= currentDate).sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
  if (sortedBookings.length > 0) {
    return (
      <ul className="flex flex-col gap-10">
        {sortedBookings.map((booking) => (
          <li key={booking.id}>
            {currentDate <= resetTime(new Date(booking.dateTo)) && currentDate >= resetTime(new Date(booking.dateFrom)) && (
              <div className="mb-3 relative">
                <span className="border border-text px-3 py-1 rounded-full font-bold absolute top-4 left-1 bg-neutral bg-opacity-80 sm:text-sm sm:relative sm:top-0 sm:left-0 sm:bg-opacity-100">
                  Active booking
                </span>
              </div>
            )}
            <BookedVenueCard booking={booking} />
          </li>
        ))}
      </ul>
    );
  } else {
    return <p>You have no upcoming bookings</p>;
  }
}
