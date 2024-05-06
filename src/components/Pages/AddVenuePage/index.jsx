import useUpdateHead from "../../../hooks/useUpdateHead";

export default function AddVenuePage() {
  useUpdateHead("Add Venue", "Add a new venue to Holidaze");

  return (
    <main className="flex flex-col gap-8">
      <h1>Add new venue</h1>

      <section>Add venue form goes here...</section>
    </main>
  );
}
