import { useEffect, useState } from "react";
import useUpdateHead from "../../../hooks/useUpdateHead";
import VenuesList from "../../VenuesList";
import { VscSettings } from "react-icons/vsc";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import FilterVenuesForm from "../../forms/FilterVenuesForm";
import SortVenuesForm from "../../forms/SortVenuesForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTerms, setFilterTerms] = useState({});
  const [sortTerm, setSortTerm] = useState("rating");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useUpdateHead("Home", "Browse through all the amazing venues available at Holidaze");

  useEffect(() => {
    const countActiveFilters = () => {
      let count = 0;

      if (filterTerms.priceRange && (filterTerms.priceRange[0] !== 10 || filterTerms.priceRange[1] !== 10000)) {
        count++;
      }
      if (filterTerms.ratingRange && filterTerms.ratingRange > 0) {
        count++;
      }
      if (filterTerms.minGuests && filterTerms.minGuests > 0) {
        count++;
      }

      Object.values(filterTerms.features || {}).forEach((value) => {
        if (value) count++;
      });
      return count;
    };

    setActiveFiltersCount(countActiveFilters());
  }, [filterTerms]);

  return (
    <main className="flex flex-col gap-10 px-5 container">
      <section className="flex flex-wrap gap-10 justify-between items-center">
        <div className="w-max">
          <h1>Browse</h1>
          <p className="text-primary font-heading font-bold text-lg">our holidaze venues</p>
        </div>
        <div className="flex flex-wrap gap-5 mx-auto sm:mx-0">
          <div>
            <button onClick={() => setIsModalOpen(true)} className="btn border-secondary hover:border-primary flex gap-2 relative w-full h-full">
              <VscSettings size={25} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -end-2 text-xs font-normal bg-primary text-neutral rounded-full w-5 h-5 flex items-center justify-center">{activeFiltersCount}</span>
              )}
            </button>
          </div>
          <SortVenuesForm setSortTerm={setSortTerm} setSortOrder={setSortOrder} />
        </div>
      </section>

      <VenuesList filterTerms={filterTerms} sortOrder={sortOrder} sortTerm={sortTerm} />

      <Modal dismissible size="lg" position="top-center" show={isModalOpen} onClose={() => setIsModalOpen(false)} popup>
        <ModalHeader />
        <ModalBody className="pt-0 flex flex-col gap-5">
          <h3>Filter venues</h3>
          <FilterVenuesForm filterTerms={filterTerms} setFilterTerms={setFilterTerms} setIsModalOpen={setIsModalOpen} />
        </ModalBody>
      </Modal>
    </main>
  );
}
