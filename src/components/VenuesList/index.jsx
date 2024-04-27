import { API_BASE_URL } from "../../constants/apiURL";
import useDoFetch from "../../hooks/useDoFetch";
import VenueCard from "../VenueCard";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingIndicator from "../ui/LoadingIndicator";

export default function VenuesList() {
  const { data, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues`);
  const venues = data.filter(
    (venue) =>
      venue.media.length > 0 &&
      !venue.name.toLowerCase().includes("test") &&
      !venue.name.toLowerCase().includes("string") &&
      !venue.name.toLowerCase().includes("aa") &&
      (venue.location.city || venue.location.country)
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (venues) {
    return (
      <section className="flex flex-wrap gap-y-10 gap-x-10 justify-center">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </section>
    );
  }
}
