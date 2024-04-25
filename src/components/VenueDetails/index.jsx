import { useParams } from "react-router";
import useDoFetch from "../../hooks/useDoFetch";
import { API_BASE_URL } from "../../constants/api";
import { useEffect } from "react";
import LoadingIndicator from "../ui/LoadingIndicator";
import ErrorMessage from "../ui/ErrorMessage";
import { Carousel } from "flowbite-react";

export default function VenueDetails() {
  let id = useParams().id;
  const { data: venue, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues/${id}?_owner=true&_bookings=true`);
  console.log("venue", venue);

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
      metaDescription.setAttribute("content", "Unfortunately we don`t have this venue at Holidaze");
    }
  }, [venue, isLoading, isError]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage message="Oooops! We could not find this venue, please try again." />;
  }

  if (venue) {
    return (
      <section className="flex flex-col gap-3 items-center justify-center">
        <div className="relative w-full h-56 sm:h-72 md:h-96 lg:h-96 md:max-w-3xl lg:max-w-4xl custom-carousel">
          {venue.media.length > 1 ? (
            <Carousel slide={false}>
              {venue.media.map((media, index) => (
                <img key={index} src={media.url} alt={venue.name} className="w-full h-full object-cover object-center" />
              ))}
            </Carousel>
          ) : (
            <img src={venue.media[0].url} alt={venue.name} className="w-full h-full object-cover object-center"></img>
          )}
        </div>
      </section>
    );
  }
}
