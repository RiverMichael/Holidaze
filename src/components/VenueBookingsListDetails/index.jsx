import { IoCalendar, IoPeople } from "react-icons/io5";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

export default function VenueBookingsListDetails({ booking }) {
  return (
    <li key={booking.id} className="flex justify-between items-center bg-neutral shadow p-2 border border-secondary rounded">
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <IoCalendar size={20} className="text-primary" />
          <span>
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <IoPeople size={20} className="text-primary" />
          <span>
            {booking.guests} {booking.guests > 1 ? "Guests" : "Guest"}
          </span>
        </div>
        <Link to={`/profile/${booking.customer.name}`} className="link font-normal">
          <div className="flex gap-1 items-center">
            <figure className="w-5 h-5">
              <img src={booking.customer.avatar.url} alt={booking.customer.name} className="w-full h-full rounded-full object-cover" />
            </figure>
            <span>{booking.customer.name}</span>
          </div>
        </Link>
      </div>
    </li>
  );
}
