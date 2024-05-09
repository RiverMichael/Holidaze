import { useParams } from "react-router";
import useDoFetch from "../../hooks/useDoFetch";
import { API_BASE_URL } from "../../constants/apiURL";
import { useEffect, useState } from "react";
import LoadingIndicator from "../ui/LoadingIndicator";
import ErrorMessage from "../ui/ErrorMessage";
import { Carousel, Modal } from "flowbite-react";
import { IoClose, IoLocation, IoPeople, IoHome } from "react-icons/io5";
import StarRating from "../StarRating";
import VenueMap from "../VenueMap";
import BookVenueForm from "../forms/BookVenueForm";
import useAuth from "../../store/auth";
import checkIfUserIsOwner from "../../utils/checkIfUserIsOwner";
import VenueBookingsList from "../VenueBookingsList";
import { Link } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";

export default function VenueDetails() {
  const { profile } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState([]);

  let id = useParams().id;
  const { data: venue, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues/${id}?_owner=true&_bookings=true`);

  useEffect(() => {
    let metaDescription = document.querySelector("meta[name='description']");
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    if (venue && !isLoading && !isError) {
      document.title = `${venue.name} | Venues | Holidaze`;
      metaDescription.setAttribute("content", `Book ${venue.name} for your next holiday at Holidaze`);
    } else if (isError) {
      document.title = "Venue not found | Venues | Holidaze";
      metaDescription.setAttribute("content", "Unfortunately we can not find this venue at Holidaze");
    }

    if (!isLoading && venue && profile) {
      setIsOwner(checkIfUserIsOwner(venue.owner, profile));
    }
  }, [venue, isLoading, isError, profile]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage message="Oooops! We could not find this venue, please try again." />;
  }

  const handleImageClick = (url, alt) => {
    setModalImage({ url, alt: alt || venue.name });
    setIsModalOpen(true);
  };

  if (venue) {
    return (
      <>
        <section className="flex flex-col gap-3 md:max-w-3xl lg:max-w-5xl mx-auto">
          <div className="px-5 md:px-0 mb-2 md:mb-5">
            <Breadcrumb aria-label="breadcrumb">
              <Breadcrumb.Item href="/" icon={IoHome}>
                All Venues
              </Breadcrumb.Item>
              {venue.location.country && <Breadcrumb.Item href="/">{venue.location.country}</Breadcrumb.Item>}
              {venue.location.city && <Breadcrumb.Item href="/">{venue.location.city}</Breadcrumb.Item>}
              <Breadcrumb.Item active="true">{venue.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {isOwner && (
            <div className="flex justify-center items-center gap-5 mb-2 md:mb-5">
              <span className="font-bold text-lg">This is your venue</span>
              <Link to={`/venues/${id}/edit`} className="btn btn-primary text-sm px-4">
                Edit Venue
              </Link>
            </div>
          )}
          <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-96 custom-carousel">
            {venue.media.length ? (
              venue.media.length > 1 ? (
                <Carousel slide={false}>
                  {venue.media.map((media, index) => (
                    <img
                      key={index}
                      src={media.url}
                      alt={media.alt || venue.name}
                      onClick={() => handleImageClick(media.url, media.alt)}
                      className="w-full h-full object-cover object-center cursor-zoom-in"
                    />
                  ))}
                </Carousel>
              ) : (
                <img
                  src={venue.media[0].url}
                  alt={venue.media[0].alt || venue.name}
                  onClick={() => handleImageClick(venue.media[0].url, venue.media[0].alt)}
                  className="w-full h-full object-cover object-center cursor-zoom-in md:rounded"></img>
              )
            ) : (
              <img src="https://placehold.co/600x400?text=No+image" alt="Placeholder image" className="w-full h-full object-cover object-center md:rounded"></img>
            )}
          </div>

          <div className="px-5 md:px-0 flex flex-col md:flex-row gap-10 justify-between">
            <div className="flex flex-col w-fit gap-5">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl text-wrap capitalize">{venue.name}</h1>
                <div className="flex items-center  gap-10">
                  <div className="flex items-center gap-1">
                    <IoLocation size={20} className="text-primary" />
                    <span>
                      {venue.location.city}, {venue.location.country}
                    </span>
                  </div>

                  <StarRating rating={venue.rating} />
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

              <div className="flex items-center gap-10 flex-wrap">
                <div className="text-primary text-xl font-bold">
                  ${venue.price} <span className="text-primary-dark text-base font-normal">/ Night</span>
                </div>

                <div className="flex items-center gap-1 text-primary">
                  <IoPeople size={20} /> <div className="text-text">{venue.maxGuests} Guests</div>
                </div>
              </div>

              <div>
                <h3 className="text-base">Description</h3>
                <p>{venue.description}</p>
              </div>

              <div>
                <h3 className="text-base">Venue manager</h3>
                <div className="flex gap-2 items-center">
                  <figure>
                    <img src={venue.owner.avatar.url} alt={`${venue.owner.name} avatar`} className="h-10 w-10 rounded-full object-cover object-center" />
                  </figure>
                  <p>{venue.owner.name}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 flex-none w-fit">
              {!isOwner ? (
                <div>
                  <h2 className="text-2xl">Book this venue</h2>
                  <BookVenueForm venue={venue} />
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl">Venue Bookings</h2>
                  <VenueBookingsList bookings={venue.bookings} />
                </div>
              )}

              <div>
                <h3 className="text-base capitalize">
                  {venue.location.city}, {venue.location.country}
                </h3>

                <div className="max-w-fit">
                  <VenueMap name={venue.name} location={venue.location} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Modal dismissible size="7xl" show={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Modal.Body className="p-0 rounded">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-neutral rounded-full bg-primary-light bg-opacity-50 hover:bg-primary hover:bg-opacity-100 focus-visible:outline-none">
              <IoClose size={40} />
            </button>

            <img src={modalImage.url} alt={modalImage.alt} className="w-full h-full object-cover" />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}
