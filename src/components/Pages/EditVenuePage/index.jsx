import { useParams } from "react-router";
import EditVenueForm from "../../forms/EditVenueForm";
import useDoFetch from "../../../hooks/useDoFetch";
import { API_BASE_URL } from "../../../constants/apiURL/";
import ErrorMessage from "../../ui/ErrorMessage";
import LoadingIndicator from "../../ui/LoadingIndicator";
import useUpdateHead from "../../../hooks/useUpdateHead";

export default function EditVenuePage() {
  let id = useParams().id;
  const { data: venue, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues/${id}`);

  useUpdateHead(`${venue.name} | Edit venue`, "Edit your venue at Holidaze");

  if (isError)
    return (
      <main>
        <ErrorMessage />
      </main>
    );

  if (isLoading)
    return (
      <main>
        <LoadingIndicator />
      </main>
    );

  if (venue) {
    return (
      <main className="flex flex-col gap-8 px-5 max-w-md container">
        <div>
          <h1>Edit</h1>
          <p className="text-primary font-heading font-bold text-lg">{venue.name}</p>
        </div>

        <section>
          <EditVenueForm venue={venue} />
        </section>
      </main>
    );
  }
}
