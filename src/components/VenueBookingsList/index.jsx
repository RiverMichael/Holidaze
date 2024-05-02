import VenueBookingDetails from "../VenueBookingsListDetails";

export default function VenueBookingsList({ bookings }) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {bookings.map((booking) => (
        <VenueBookingDetails key={booking.id} booking={booking} />
      ))}
    </ul>
  );
}
