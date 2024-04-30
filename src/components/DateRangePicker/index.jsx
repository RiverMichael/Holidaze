import { useState, useEffect } from "react";
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

function DateRangePicker({ bookings, startDate, endDate, setStartDate, setEndDate }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const bookedDates = bookings.flatMap((booking) => getDatesInRange(booking.dateFrom, booking.dateTo));

  useEffect(() => {
    const handleOutsideDatePickerClick = (event) => {
      if (isDatePickerOpen && !event.target.closest(".react-datepicker") && !event.target.closest("#checkInDate") && !event.target.closest("#checkOutDate")) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener("click", handleOutsideDatePickerClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideDatePickerClick);
    };
  }, [isDatePickerOpen]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  function isDateBooked(date) {
    return bookedDates.some((bookedDate) => formatDate(bookedDate) === formatDate(date));
  }

  function isDateRangeBooked(start, end) {
    let currentCheckDate = new Date(start);
    currentCheckDate.setDate(currentCheckDate.getDate() + 1); // Start checking from the day after the start date
    let beforeEndDate = new Date(end);
    beforeEndDate.setDate(beforeEndDate.getDate());

    while (currentCheckDate < beforeEndDate) {
      if (isDateBooked(currentCheckDate)) {
        return true;
      }
      currentCheckDate.setDate(currentCheckDate.getDate() + 1);
    }
    return false;
  }

  const handleDateChange = (dates) => {
    const [start, end] = dates;

    if (start && end) {
      if (isDateRangeBooked(start, end)) {
        setIsAlertOpen(true); // Open popover if date range includes booked dates
        setStartDate(null);
        return; // Prevent setting the date range
      }
    }

    setStartDate(start);
    setEndDate(end);
    setIsAlertOpen(false);
    if (!end) {
      setIsDatePickerOpen(true);
    } else {
      setIsDatePickerOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div>
        <label htmlFor="checkInDate" className="text-sm font-bold text-primary">
          Check-in
        </label>
        <div className="form-input w-full focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
          <div className="text-primary-dark absolute inset-y-0 flex items-center pointer-events-none start-2">
            <IoCalendarOutline size={20} />
          </div>
          <input
            type="text"
            id="checkInDate"
            className="w-full ps-8 border-none hover:cursor-pointer focus:ring-0"
            placeholder={new Date().toLocaleDateString("en-GB")}
            value={startDate ? startDate.toLocaleDateString("en-GB") : ""}
            onClick={() => {
              setIsDatePickerOpen(true);
            }}
            readOnly
          />
        </div>
      </div>
      <div>
        <label htmlFor="checkOutDate" className="text-sm font-bold text-primary">
          Check-out
        </label>
        <div className="form-input w-full focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative">
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
              setIsDatePickerOpen(true);
            }}
            readOnly
          />
        </div>
      </div>
      {isDatePickerOpen && (
        <div className="absolute top-full mt-1 z-20">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            minDate={new Date()}
            excludeDates={bookedDates}
            calendarStartDay={1}
          />
          {isAlertOpen && (
            <div className="absolute -top-24 start-0 bg-red-50 p-2 rounded border border-error text-error z-30" role="alert">
              Selected dates includes dates that are unavailable. Please choose different dates.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
