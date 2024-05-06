import useUpdateHead from "../../../hooks/useUpdateHead";
import BookingConfirmation from "../../BookingConfirmation";

export default function BookingConfirmationPage() {
  useUpdateHead("Booking Confirmation", "Congratulations! Your booking has been confirmed!");

  return (
    <main className="px-5">
      <BookingConfirmation />
    </main>
  );
}
