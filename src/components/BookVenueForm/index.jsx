import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateRangePicker from "../DateRangePicker";
import { IoPeople } from "react-icons/io5";

const schema = yup.object({
  //
});

export default function BookVenueForm({ venue }) {
  console.log("venueMaxGuests", venue.maxGuests);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Booking:");
  };

  return (
    <form id="bookVenueForm" onSubmit={handleFormSubmit} className="flex flex-col w-max gap-2 border">
      <DateRangePicker bookings={venue.bookings} />

      <div className="w-full">
        <label htmlFor="bookNumberOfGuests" className="text-sm font-bold">
          Number of guests
        </label>
        <div className="form-input w-max focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
          <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none start-2">
            <IoPeople size={20} />
          </div>
          <select id="bookNumberOfGuests" className="text-sm ps-10 border-none hover:cursor-pointer focus:ring-0">
            {Array.from({ length: venue.maxGuests }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-primary">Book now</button>
      </div>
    </form>
  );
}
