import { Link } from "react-router-dom";
import { IoLocation, IoPeople } from "react-icons/io5";
import StarRating from "../StarRating";

export default function VenueCard({ venue }) {
  return (
    <div className="max-w-sm bg-neutral w-80 pb-2 border rounded-lg shadow">
      <Link to={`/venues/${venue.id}`}>
        <figure className="w-full h-48 overflow-hidden rounded-t-lg">
          {venue.media.length ? (
            <img src={venue.media[0].url} alt={venue.media[0].alt} className="object-cover object-center w-full h-48" />
          ) : (
            <img src="https://placehold.co/600x400?text=No+image" alt="Placeholder image" className="object-cover object-center w-full h-48"></img>
          )}
        </figure>
      </Link>

      <div className="flex flex-col py-2 px-3 gap-5">
        <div className="flex flex-col gap-2">
          <div className=" w-fit">
            <Link to={`/venues/${venue.id}`} className="hover:opacity-70 transition-all duration-200 ease-in-out">
              <h2 className="text-xl">{venue.name}</h2>
            </Link>
            <StarRating rating={venue.rating} />
          </div>

          <div className="flex items-center gap-1 capitalize text-primary">
            <IoLocation size={20} />
            <div className="text-text">
              {venue.location.city}, {venue.location.country}
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <div className="text-primary text-lg font-bold">
            ${venue.price} <span className="text-primary-dark text-base font-normal">/ Night</span>
          </div>

          <div className="flex items-center gap-1 text-primary">
            <IoPeople size={20} /> <div className="text-text">{venue.maxGuests} Guests</div>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {Object.entries(venue.meta).map(
            ([feature, value], index) =>
              value && (
                <span key={index} className="text-sm px-3 py-1 rounded-full bg-secondary text-primary capitalize">
                  {feature}
                </span>
              )
          )}
        </div>

        <div className="flex justify-center">
          <Link to={`/venues/${venue.id}`} className="btn btn-primary w-1/2">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}
