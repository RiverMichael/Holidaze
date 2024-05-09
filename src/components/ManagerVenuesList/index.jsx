import { IoLocation } from "react-icons/io5";
import StarRating from "../StarRating";
import { Link } from "react-router-dom";

export default function ManagerVenuesList({ venues }) {
  return (
    <ul className="flex flex-col gap-10 mb-10 w-max">
      {venues.map((venue) => (
        <div key={venue.id} className="max-w-md">
          <Link to={`/venues/${venue.id}`}>
            <figure className="max-w-md h-48">
              {venue.media.length ? (
                <img src={venue.media[0].url} alt={venue.name} className="w-full h-full object-cover object-center rounded" />
              ) : (
                <img src="https://placehold.co/600x400?text=No+image" alt="Placeholder image" className="w-full h-full object-cover object-center rounded"></img>
              )}
            </figure>
          </Link>

          <div className="flex justify-between flex-wrap">
            <Link to={`/venues/${venue.id}`} className="">
              <h2 className="text-lg md:text-2xl link-primary hover:no-underline">{venue.name}</h2>
            </Link>
            <StarRating rating={venue.rating} />
          </div>

          <div className="flex gap-1 text-primary">
            <IoLocation size={20} />
            <p className="text-base capitalize">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>
        </div>
      ))}
    </ul>
  );
}
