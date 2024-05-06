import useUpdateHead from "../../../hooks/useUpdateHead";
import VenuesList from "../../VenuesList";

export default function HomePage() {
  useUpdateHead("Home", "Browse through all the amazing venues available at Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5 container">
      <h1 className="text-center">Browse Venues</h1>
      <VenuesList />
    </main>
  );
}
