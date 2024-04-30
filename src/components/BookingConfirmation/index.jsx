import { useParams } from "react-router";
import useDoFetch from "../../hooks/useDoFetch";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../constants/apiURL";
import LoadingIndicator from "../ui/LoadingIndicator";
import ErrorMessage from "../ui/ErrorMessage";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import BookedVenueCard from "../BookedVenueCard";
import { Link } from "react-router-dom";

export default function BookingConfirmation() {
  const [bookingNumber, setBookingNumber] = useState(0);
  const { getData } = useFetchOptions();
  const id = useParams().id;
  const { data: booking, isLoading, isError } = useDoFetch(`${API_BASE_URL}/bookings/${id}?_venue=true`, getData());

  useEffect(() => {
    const generateBookingNumber = () => {
      return Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    };
    setBookingNumber(generateBookingNumber());
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage message="Oooops! We could not load your booking confirmation, Please try again!" />;
  }

  if (booking) {
    return (
      <div className="flex flex-col gap-5 max-w-5xl">
        <h1>Happy holidaze!</h1>
        <div className="flex flex-col gap-12">
          <p>
            Your booking <span className="font-bold">#{bookingNumber}</span> is confirmed, a confirmation is sent to your email.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="text-base">Booking #{bookingNumber}</h2>
            <BookedVenueCard booking={booking} />
          </section>

          <Link to="/" className="btn btn-primary w-max">
            Browse more venues
          </Link>
        </div>
      </div>
    );
  }
}
