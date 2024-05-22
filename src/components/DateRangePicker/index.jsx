import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";

function getDatesInRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dateList = [];

  let formattedStartDate = new Date(start.toISOString().split("T")[0]);
  let formattedEndDate = new Date(end.toISOString().split("T")[0]);

  while (formattedStartDate <= formattedEndDate) {
    dateList.push(new Date(formattedStartDate));
    formattedStartDate.setDate(formattedStartDate.getDate() + 1);
  }
  return dateList;
}

function DateRangePicker({ bookings, startDate, endDate, setStartDate, setEndDate, register, setValue, errors }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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

  useEffect(() => {
    register("startDate");
    register("endDate");
  }, [register]);

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
      if (end <= start) {
        setAlertMessage("Check-out date must be after check-in date.");
        setIsAlertOpen(true);
        setEndDate(null);
        setValue("endDate", null);
        return;
      }

      if (isDateRangeBooked(start, end)) {
        setAlertMessage("Selected dates includes dates that are unavailable. Please choose different dates.");
        setIsAlertOpen(true);
        setStartDate(null);
        setEndDate(null);
        setValue("startDate", null);
        setValue("endDate", null);
        return;
      }
    }

    setStartDate(start);
    setEndDate(end);

    setValue("startDate", start, { shouldValidate: true });
    setValue("endDate", end, { shouldValidate: true });

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
        <div
          className={`form-input w-full focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative ${
            errors.startDate && "border-error hover:border-error focus-within:border-error focus-within:ring-error"
          }`}>
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
        {errors.startDate && <p className="text-error font-light">{errors.startDate.message}</p>}
      </div>

      <div>
        <label htmlFor="checkOutDate" className="text-sm font-bold text-primary">
          Check-out
        </label>
        <div
          className={`form-input w-full focus-within:ring-1 focus-within:border-primary-dark focus-within:ring-primary-dark flex px-2 items-center relative ${
            errors.endDate && "border-error hover:border-error focus-within:border-error focus-within:ring-error"
          }`}>
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
        {errors.endDate && <p className="text-error font-light">{errors.endDate.message}</p>}
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
            <div className="absolute bottom-full bg-red-50 p-2 rounded border border-error text-error z-30" role="alert">
              {alertMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
