import VenuesList from "../../VenuesList";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-8 px-5 container mx-auto">
      <h1 className="">Browse Venues</h1>
      <VenuesList />
    </main>
  );
}
