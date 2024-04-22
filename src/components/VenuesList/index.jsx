import { API_BASE_URL } from "../../constants/api";
import useDoFetch from "../../hooks/useDoFetch";
import VenueCard from "../VenueCard";

export default function VenuesList() {
  const { data, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues`);
  const venues = data;
  console.log("venues", venues);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong</p>;
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
