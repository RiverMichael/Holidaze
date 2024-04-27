import { useState, useEffect } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import useDoFetch from "../../hooks/useDoFetch";
import { API_BASE_URL } from "../../constants/apiURL";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { data, isLoading, isError } = useDoFetch(`${API_BASE_URL}/venues`);
  const venues = data.filter(
    (venue) => !venue.name.toLowerCase().includes("test") && !venue.name.toLowerCase().includes("string") && !venue.name.toLowerCase().includes("aa") && (venue.location.city || venue.location.country)
  );

  useEffect(() => {
    if (searchTerm && venues) {
      const filteredSuggestions = venues.filter(
        ({ name, location }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (location.city && location.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (location.country && location.country.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  return (
    <>
      <form id="search-bar" className="max-w-md mx-auto relative" onSubmit={(event) => event.preventDefault()}>
        <div className="form-input focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
          <label htmlFor="search-navbar" className="sr-only">
            Search venue
          </label>
          <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none start-2">
            <IoSearchOutline size={20} />
          </div>

          <input
            id="search-navbar"
            type="text"
            aria-label="Search venues"
            placeholder="Search by venue, city or country"
            className="ps-8 w-full border-none focus:ring-0"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            onBlur={() => {
              setTimeout(() => {
                setShowSuggestions(false);
              }, 200);
            }}
            onFocus={() => searchTerm && setShowSuggestions(true)}
          />
          {searchTerm && (
            <button
              aria-label="Clear search"
              onClick={() => {
                setSearchTerm("");
              }}
              className="text-gray-400 hover:text-gray-600">
              <IoClose size={20} />
            </button>
          )}
        </div>

        {showSuggestions && !isLoading && !isError && (
          <ul className="rounded border border-secondary bg-neutral absolute mt-1 w-full py-2 overflow-auto max-h-[70vh]">
            {suggestions.length > 0 ? (
              suggestions.map(({ id, media, name, location }) => (
                <li key={id} className="hover:bg-gray-200 p-2">
                  <Link to={`venues/${id}`}>
                    <div className="flex gap-2 items-center">
                      <figure className="w-8 h-8">
                        {media && media.length ? (
                          <img src={media[0].url} alt={name} className="rounded object-center object-cover w-full h-full" />
                        ) : (
                          <img src="https://placehold.co/600x400?text=No+image" alt="Placeholder image" className="rounded object-center object-cover w-full h-full"></img>
                        )}
                      </figure>
                      <div className="capitalize text-base text-primary font-bold">{name}</div>
                      <div className="flex gap-1 capitalize text-sm">
                        <p>
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-2">Sorry! We can not find any venue that match this search.</li>
            )}
          </ul>
        )}
      </form>
    </>
  );
}
