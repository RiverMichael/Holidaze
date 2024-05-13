import { useForm } from "react-hook-form";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterVenuesForm({ filters, setFilters }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      priceRange: [50, 1000],
      ratingRange: 0,
      minGuests: 0,
      features: {
        wifi: false,
        parking: false,
        breakfast: false,
        pets: false,
      },
    },
  });

  const priceRange = watch("priceRange");
  const ratingRange = watch("ratingRange");

  const handleFilterFormSubmit = (data) => {
    const filterData = { ...data, minGuests: parseInt(data.minGuests) };
    setFilters(filterData);
  };

  const handlePriceRangeChange = (newRange) => {
    setValue("priceRange", newRange);
  };

  const handleRatingRangeChange = (newRange) => {
    setValue("ratingRange", newRange);
  };

  const handleClearFilters = () => {
    reset();
  };

  return (
    <form id="filterForm" onSubmit={handleSubmit(handleFilterFormSubmit)} className="flex flex-col gap-5">
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="priceRange" className="flex text-primary text-lg font-bold w-full justify-between items-center">
          Price range
          <span className="font-normal text-base text-text">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </label>
        <Slider range min={10} max={5000} step={10} allowCross={false} pushable={100} onChange={handlePriceRangeChange} value={priceRange} />
      </div>

      <div className="w-full flex flex-col gap-1">
        <label htmlFor="ratingRange" className="flex text-primary text-lg font-bold w-full justify-between items-center">
          Minimum rating
          <span className="font-normal text-base text-text">{ratingRange}</span>
        </label>
        <Slider min={0} max={5} step={0.1} onChange={handleRatingRangeChange} value={ratingRange} />
      </div>

      <div className="w-full flex flex-col gap-1">
        <h4 className="text-lg font-body text-primary">Number of guests</h4>
        <ul className="flex flex-wrap gap-2">
          <li>
            <input type="radio" name="minGuests" id="guestsAny" value={0} {...register("minGuests")} className="hidden peer" defaultChecked />
            <label
              htmlFor="guestsAny"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              Any
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests1" value={1} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests1"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              1
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests2" value={2} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests2"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              2
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests3" value={3} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests3"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              3
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests4" value={4} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests4"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              4
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests5" value={5} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests5"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              5
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests6" value={6} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests6"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              6
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests7" value={7} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests7"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              7
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests8" value={8} {...register("minGuests")} className="hidden peer" />
            <label
              htmlFor="guests8"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              8+
            </label>
          </li>
        </ul>
      </div>

      <div className="w-full flex flex-col gap-1">
        <h4 className="text-lg font-body text-primary">Features</h4>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <input
              type="checkbox"
              id="filterWifi"
              {...register("features.wifi")}
              className="rounded border w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
            />
            <label htmlFor="filterWifi" className="text-base">
              Wifi
            </label>
          </li>
          <li className="flex items-center gap-2">
            <input
              type="checkbox"
              id="filterParking"
              {...register("features.parking")}
              className="rounded border w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
            />
            <label htmlFor="filterParking" className="text-base">
              Parking
            </label>
          </li>
          <li className="flex items-center gap-2">
            <input
              type="checkbox"
              id="filterBreakfast"
              {...register("features.breakfast")}
              className="rounded border w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
            />
            <label htmlFor="filterBreakfast" className="text-base">
              Breakfast
            </label>
          </li>
          <li className="flex items-center gap-2">
            <input
              type="checkbox"
              id="filterPets"
              {...register("features.pets")}
              className="rounded border w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
            />
            <label htmlFor="filterPets" className="text-base">
              Pets
            </label>
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap justify-around mt-2">
        <button type="submit" className="btn btn-primary w-1/2">
          Apply filters
        </button>
        <button onClick={handleClearFilters} className="btn btn-outlined w-1/4">
          Clear
        </button>
      </div>
    </form>
  );
}
