import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateRangePicker from "../../DateRangePicker";
import { IoPeople, IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import useAuth from "../../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useFetchOptions } from "../../../hooks/useFetchOptions";
import doFetch from "../../../utils/doFetch";
import { API_BASE_URL } from "../../../constants/apiURL";

const schema = yup.object({
  startDate: yup.date().required("Check-in date is required"),
  endDate: yup.date().required("Check-out date is required"),
  guests: yup.number().required("Number of guests is required").positive("Number of guests must be more than 0").integer("Number of guests must be a number"),
});

export default function BookVenueForm({ venue }) {
  const { isAuthenticated } = useAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { postData } = useFetchOptions();
  const navigate = useNavigate();

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfNights(diffDays);
    } else {
      setNumberOfNights(0);
    }
  }, [startDate, endDate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(schema), mode: "onSubmit" });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);

    const formattedStartDate = startDate ? new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())).toISOString() : null;
    const formattedEndDate = endDate ? new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())).toISOString() : null;

    const formData = { venueId: venue.id, dateFrom: formattedStartDate, dateTo: formattedEndDate, guests: parseInt(data.guests) };

    const options = postData(formData);

    try {
      const bookingResult = await doFetch(`${API_BASE_URL}/bookings`, options);
      navigate(`/booking-confirmation/${bookingResult.data.id}`);
      reset();
    } catch (error) {
      console.log("error", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  return (
    <>
      <form id="bookVenueForm" onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col w-full gap-5">
        <div className="flex flex-col gap-2">
          <DateRangePicker
            bookings={venue.bookings}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            register={register}
            setValue={setValue}
            errors={errors}
          />

          <div>
            <label htmlFor="numberOfGuests" className="text-sm font-bold text-primary">
              Number of guests
            </label>
            <div className="form-input w-max focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
              <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none start-2">
                <IoPeople size={20} />
              </div>
              <select id="numberOfGuests" className="text-sm ps-8 border-none hover:cursor-pointer focus:ring-0" defaultValue={1} {...register("guests")}>
                {Array.from({ length: venue.maxGuests }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {numberOfNights > 0 && (
          <div className="text-primary font-bold text-lg">
            ${venue.price * numberOfNights} <span className="text-base">/ {numberOfNights} Nights</span>
          </div>
        )}

        <div className="flex flex-col justify-center gap-1">
          <button
            disabled={!isAuthenticated || isSubmitting}
            className={`btn btn-primary w-full ${isSubmitting && "btn-outlined"} ${!isAuthenticated && " hover:bg-primary hover:text-neutral opacity-50"}`}>
            {isSubmitting && (
              <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-gray-200 animate-spin " viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#394974"
                />
              </svg>
            )}
            {isSubmitting ? "Booking..." : "Book now"}
          </button>
          {!isAuthenticated && (
            <div className="text-primary text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Log in to book this venue
              </Link>
            </div>
          )}
        </div>
      </form>

      <div
        id="toast"
        className={`bg-neutral items-center m-4 p-5 border rounded-lg shadow fixed z-50 top-0 right-0 ${showToast ? "flex" : "hidden"} ${isError && "border-error text-error"}`}
        role="alert">
        <div className="text-lg">{isError && "Your booking of this venue failed! Please try again."}</div>

        <button onClick={() => setShowToast(false)} type="button" className="ms-5 p-1 rounded-full hover:bg-error hover:text-neutral" aria-label="Close">
          <IoClose size={20} />
        </button>
      </div>
    </>
  );
}
