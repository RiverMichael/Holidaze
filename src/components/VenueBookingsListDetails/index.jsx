import { useState } from "react";
import { IoCalendar, IoPeople, IoTrashOutline } from "react-icons/io5";

export default function VenueBookingsListDetails({ booking }) {
  const [tooltipId, setTooltipId] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

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
          <span>{booking.guests} Guests</span>
        </div>
        <div className="flex gap-1 items-center">
          <figure className="w-5 h-5">
            <img src={booking.customer.avatar.url} alt={booking.customer.name} className="w-full h-full rounded-full object-cover" />
          </figure>
          <span>{booking.customer.name}</span>
        </div>
      </div>
      <div className="relative">
        <button
          onMouseEnter={() => setTooltipId(booking.id)}
          onMouseLeave={() => setTooltipId(null)}
          type="button"
          className="p-2 rounded-lg hover:bg-primary-dark hover:text-neutral focus-visible:outline-none">
          <IoTrashOutline size={15} />
        </button>
        {tooltipId === booking.id && (
          <div id="tooltip-deleteBooking" role="tooltip" className="inline-block absolute bottom-full mb-2 start-0 w-max z-10 bg-secondary px-2 py-1 rounded text-sm">
            Cancel booking
          </div>
        )}
      </div>
    </li>
  );
}
