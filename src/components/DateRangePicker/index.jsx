import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

function getDatesInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateList = [];

  let currentDate = new Date(start.toISOString().split("T")[0]); // Ensure no time component

  while (currentDate <= end) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList;
}

function DateRangePicker({ bookings }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const bookedDates = bookings.flatMap((booking) => getDatesInRange(booking.dateFrom, booking.dateTo));

  console.log("bookings", bookings);

  const handleChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (!end) {
      setDatePickerOpen(true); // Keep date picker open for end date selection
    } else {
      setDatePickerOpen(false); // Close date picker after end date selection
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div>
        <label htmlFor="checkInDate" className="text-sm font-bold">
          Check-in
        </label>
        <div className="form-input w-fit focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
          <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none  start-2">
            <IoCalendarOutline size={20} />
          </div>
          <input
            type="text"
            id="checkInDate"
            className="w-full ps-8 border-none hover:cursor-pointer focus:ring-0"
            placeholder={new Date().toLocaleDateString("en-GB")}
            value={startDate ? startDate.toLocaleDateString("en-GB") : ""}
            onClick={() => setDatePickerOpen(true)} // Open DatePicker when start input is clicked
            readOnly
          />
        </div>
      </div>

      <div>
        <label htmlFor="checkOutDate" className="text-sm font-bold">
          Check-out
        </label>
        <div className="form-input w-fit focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
          <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none  start-2">
            <IoCalendarOutline size={20} />
          </div>
          <input
            type="text"
            id="checkOutDate"
            className="w-full ps-8 border-none hover:cursor-pointer focus:ring-0"
            placeholder={new Date().toLocaleDateString("en-GB")}
            value={endDate ? endDate.toLocaleDateString("en-GB") : ""}
            onClick={() => {
              setDatePickerOpen(true); // Allow reopening date picker if start date is set
            }}
            readOnly
          />
        </div>
      </div>
      {datePickerOpen && <DatePicker selected={startDate} onChange={handleChange} startDate={startDate} endDate={endDate} selectsRange inline minDate={new Date()} excludeDates={bookedDates} />}
    </div>
  );
}

export default DateRangePicker;
