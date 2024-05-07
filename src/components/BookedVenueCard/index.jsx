import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BookedVenueCard({ booking }) {
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [bookingAmount, setBookingAmount] = useState(0);

  useEffect(() => {
    if (booking.dateFrom && booking.dateTo) {
      const checkInDate = new Date(booking.dateFrom);
      const checkOutDate = new Date(booking.dateTo);
      const timeDifference = Math.abs(checkOutDate - checkInDate);
      const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setNumberOfNights(nights);
    }

    if (numberOfNights) {
      const price = booking.venue.price;
      const totalBookingAmount = price * numberOfNights;
      setBookingAmount(totalBookingAmount);
    }
  }, [booking, numberOfNights]);

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 md:items-center">
      <figure className="w-28 h-20 flex-none">
        <Link to={`/venues/${booking.venue.id}`}>
          <img src={booking.venue.media[0].url} alt={booking.venue.name} className="w-full h-full rounded object-cover object-center" />
        </Link>
      </figure>

      <div className="flex flex-col">
        <h3 className="text-2xl capitalize">
          <Link to={`/venues/${booking.venue.id}`} className="link-primary hover:no-underline">
            {booking.venue.name}
          </Link>
        </h3>

        <ul className="flex flex-col md:flex-row md:flex-wrap gap-x-3">
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Check-in date:</h4>
            <p>{booking.dateFrom ? new Date(booking.dateFrom).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Date not available"}</p>
          </li>
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Check-out date:</h4>
            <p>{booking.dateTo ? new Date(booking.dateTo).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "Date not available"}</p>
          </li>
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Nights:</h4>
            <p>{numberOfNights}</p>
          </li>
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Guests:</h4>
            <p>{booking.guests}</p>
          </li>
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Total amount:</h4>
            <p>${bookingAmount}</p>
          </li>
          <li className="flex gap-1 md:items-center">
            <h4 className="text-primary font-bold text-base">Location:</h4>
            <p className="capitalize">
              {booking.venue.location.address}, {booking.venue.location.zip}, {booking.venue.location.city}, {booking.venue.location.country}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
