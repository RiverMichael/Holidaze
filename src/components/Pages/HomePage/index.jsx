import useUpdateHead from "../../../hooks/useUpdateHead";
import VenuesList from "../../VenuesList";

export default function HomePage() {
  useUpdateHead("Home", "Browse through all the amazing venues available at Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5 container items-center">
      <h1>Browse Venues</h1>
      <VenuesList />
    </main>
  );
}
