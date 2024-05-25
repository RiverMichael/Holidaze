import { useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../../constants/apiURL";
import VenueCard from "../VenueCard";
import ErrorMessage from "../ui/ErrorMessage";
import LoadingIndicator from "../ui/LoadingIndicator";
import { Pagination } from "flowbite-react";
import doFetch from "../../utils/doFetch";

export default function VenuesList({ filterTerms, sortOrder, sortTerm }) {
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const venuesPerPage = 50;

  useEffect(() => {
    const fetchAllVenues = async () => {
      let fetchedVenues = [];
      let page = 1;
      let totalPages = 1;

      setIsLoading(true);
      setIsError(false);

      try {
        while (page <= totalPages) {
          const result = await doFetch(`${API_BASE_URL}/venues?sort=rating&sortOrder=desc&page=${page}`);

          result.data.forEach((venue) => {
            if (fetchedVenues.every((v) => v.id !== venue.id)) {
              fetchedVenues = [...fetchedVenues, venue];
            }
          });

          totalPages = result.meta.pageCount;
          page++;
        }
        setVenues(fetchedVenues);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllVenues();
  }, []);

  const applyFilters = useCallback(
    (venues) => {
      return venues.filter((venue) => {
        if (venue.name?.toLowerCase().includes("test") || venue.name?.toLowerCase().includes("string") || !(venue.location?.city || venue.location?.country) || !venue.name) {
          return false;
        }
        if (filterTerms.priceRange) {
          const [minPrice, maxPrice] = filterTerms.priceRange;
          if (venue.price < minPrice || venue.price > maxPrice) {
            return false;
          }
        }
        if (filterTerms.ratingRange !== undefined) {
          if (venue.rating < filterTerms.ratingRange) {
            return false;
          }
        }
        if (filterTerms.minGuests !== undefined) {
          if (venue.maxGuests < filterTerms.minGuests) {
            return false;
          }
        }
        if (filterTerms.features) {
          for (const feature in filterTerms.features) {
            if (filterTerms.features[feature] && !venue.meta?.[feature]) {
              return false;
            }
          }
        }
        return true;
      });
    },
    [filterTerms]
  );

  const applySortTerms = useCallback(
    (venues) => {
      return venues.sort((a, b) => {
        if (typeof a[sortTerm] === "string") {
          let trimmedA = a[sortTerm].trim();
          let trimmedB = b[sortTerm].trim();

          if (sortOrder === "asc") {
            return trimmedA.localeCompare(trimmedB);
          } else {
            return trimmedB.localeCompare(trimmedA);
          }
        } else {
          if (sortOrder === "asc") {
            return a[sortTerm] - b[sortTerm];
          } else {
            return b[sortTerm] - a[sortTerm];
          }
        }
      });
    },
    [sortOrder, sortTerm]
  );

  useEffect(() => {
    if (venues.length > 0) {
      const filteredVenues = applyFilters(venues);
      const sortedVenues = applySortTerms(filteredVenues);
      setFilteredVenues(sortedVenues);
    }
  }, [venues, applyFilters, applySortTerms]);

  const displayedVenues = filteredVenues.slice((isCurrentPage - 1) * venuesPerPage, isCurrentPage * venuesPerPage);

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
    return <ErrorMessage message="Oooops! Something went wrong when loading the venues, please try again." />;
  }

  if (filteredVenues.length > 0) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-center overflow-x-auto">
          <Pagination currentPage={isCurrentPage} totalPages={Math.ceil(filteredVenues.length / venuesPerPage)} onPageChange={onPageChange} previousLabel="" nextLabel="" showIcons />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {displayedVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </section>

        <div className="flex justify-center overflow-x-auto">
          <Pagination currentPage={isCurrentPage} totalPages={Math.ceil(filteredVenues.length / venuesPerPage)} onPageChange={onPageChange} previousLabel="" nextLabel="" showIcons />
        </div>
      </div>
    );
  }

  return <p className="flex text-lg text-center">Sorry! We can not find any venues with these filters.</p>;
}
