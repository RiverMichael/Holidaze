import useUpdateHead from "../../../hooks/useUpdateHead";
import AddVenueForm from "../../forms/AddVenueForm";

export default function AddVenuePage() {
  useUpdateHead("Add Venue", "Add a new venue to Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5 max-w-md container">
      <div>
        <h1>Add</h1>
        <p className="text-primary font-heading font-bold text-lg">a new venue</p>
      </div>

      <section>
        <AddVenueForm />
      </section>
    </main>
  );
}
