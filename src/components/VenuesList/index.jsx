import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/apiURL";
import useDoFetch from "../../hooks/useDoFetch";
import VenueCard from "../VenueCard";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingIndicator from "../ui/LoadingIndicator";
import { Pagination } from "flowbite-react";

export default function VenuesList() {
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const { data, isLoading, isError, metaData } = useDoFetch(`${API_BASE_URL}/venues?page=${isCurrentPage}`);
  const venues = data.filter(
    (venue) => !venue.name.toLowerCase().includes("test") && !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("aa") && (venue.location.city || venue.location.country)
  );

  const onPageChange = (page) => {
    setIsCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isCurrentPage]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (venues) {
    return (
      <>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </section>

        <div className="flex justify-center overflow-x-auto text-primary-light">
          <Pagination currentPage={isCurrentPage} totalPages={metaData.pageCount} onPageChange={onPageChange} previousLabel="" nextLabel="" showIcons />
        </div>
      </>
    );
  }
}
