import { useState } from "react";
import useUpdateHead from "../../../hooks/useUpdateHead";
import VenuesList from "../../VenuesList";
import { VscSettings } from "react-icons/vsc";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import FilterVenuesForm from "../../forms/FilterVenuesForm";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([]);
  console.log("filters:", filters);

  useUpdateHead("Home", "Browse through all the amazing venues available at Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5">
      <section className="flex flex-col sm:flex-row gap-5 justify-between sm:items-center">
        <div>
          <h1>Browse</h1>
          <p className="text-primary font-heading font-bold text-lg">our holidaze venues</p>
        </div>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="btn border-secondary flex gap-2">
            <VscSettings size={30} />
            Filters
          </button>
        </div>
      </section>

      <VenuesList />

      <Modal dismissible size="lg" position="top-center" show={isModalOpen} onClose={() => setIsModalOpen(false)} popup>
        <ModalHeader className="p-3 border-none" />
        <ModalBody className="pt-0 flex flex-col gap-5">
          <h3>Filter venues</h3>
          <FilterVenuesForm filters={filters} setFilters={setFilters} />
        </ModalBody>
      </Modal>
    </main>
  );
}
