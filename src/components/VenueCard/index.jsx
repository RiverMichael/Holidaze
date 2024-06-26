import { Link } from "react-router-dom";
import { IoLocation, IoPeople } from "react-icons/io5";
import StarRating from "../StarRating";
import VenueFeaturesList from "../VenueFeaturesList";

export default function VenueCard({ venue }) {
  return (
    <div className="bg-neutral pb-2 border border-secondary rounded-lg shadow flex flex-col">
      <Link to={`/venues/${venue.id}`}>
        <figure className="w-full h-48 overflow-hidden rounded-t-lg">
          {venue.media.length ? (
            <img src={venue.media[0].url} alt={venue.media[0].alt || venue.name} className="object-cover object-center w-full h-48" />
          ) : (
            <img src="https://placehold.co/600x400?text=No+image" alt="Placeholder image" className="object-cover object-center w-full h-48"></img>
          )}
        </figure>
      </Link>

      <div className="flex flex-col py-2 px-3 gap-6 justify-between grow">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>
              <Link to={`/venues/${venue.id}`} className="hover:opacity-70 transition-all duration-200 ease-in-out">
                <h2 className="text-xl">
                  {venue.name.substring(0, 22)}
                  {venue.name.length > 22 ? "..." : ""}
                </h2>
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
              <IoPeople size={20} />{" "}
              <div className="text-text">
                {venue.maxGuests} {venue.maxGuests > 1 ? "Guests" : "Guest"}
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2">
            <VenueFeaturesList features={Object.entries(venue.meta)} />
          </div>
        </div>

        <div className="flex justify-center">
          <Link to={`/venues/${venue.id}`} className="btn btn-primary">
            View more
          </Link>
        </div>
      </div>
    </div>
  );
}
