import useUpdateHead from "../../../hooks/useUpdateHead";
import VenuesList from "../../VenuesList";

export default function HomePage() {
  useUpdateHead("Home", "Browse through all the amazing venues available at Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5">
      <div>
        <h1>Browse</h1>
        <p className="text-primary font-heading font-bold text-lg">our holidaze venues</p>
      </div>
      <VenuesList />
    </main>
  );
}
