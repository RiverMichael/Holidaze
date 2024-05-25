import { useForm } from "react-hook-form";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterVenuesForm({ filterTerms, setFilterTerms, setIsModalOpen }) {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      priceRange: filterTerms?.priceRange || [10, 10000],
      ratingRange: filterTerms?.ratingRange || 0,
      minGuests: filterTerms?.minGuests || 0,
      features: {
        wifi: filterTerms?.features?.wifi || false,
        parking: filterTerms?.features?.parking || false,
        breakfast: filterTerms?.features?.breakfast || false,
        pets: filterTerms?.features?.pets || false,
      },
    },
  });

  const defaultValues = {
    priceRange: [10, 10000],
    ratingRange: 0,
    minGuests: 0,
    features: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  };

  const priceRange = watch("priceRange");
  const ratingRange = watch("ratingRange");

  const handleFilterFormSubmit = (data) => {
    const filterData = { ...data, minGuests: parseInt(data.minGuests) };
    setFilterTerms(filterData);
    setIsModalOpen(false);
  };

  const handlePriceRangeChange = (newRange) => {
    setValue("priceRange", newRange);
  };

  const handleRatingRangeChange = (newRange) => {
    setValue("ratingRange", newRange);
  };

  const handleClearFilters = () => {
    setFilterTerms(defaultValues);
    reset(defaultValues);
  };

  return (
    <form id="filterForm" onSubmit={handleSubmit(handleFilterFormSubmit)} className="flex flex-col gap-10">
      <div className="w-full flex flex-col gap-1">
        <label htmlFor="priceRange" className="flex text-primary text-lg font-bold w-full justify-between items-center">
          Price range
          <span className="font-normal text-base text-text">
            ${priceRange[0]} - ${priceRange[1]}
          </span>
        </label>
        <Slider range min={10} max={10000} step={20} allowCross={false} pushable={100} onChange={handlePriceRangeChange} value={priceRange} />
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
            <input
              type="radio"
              name="minGuests"
              id="guestsAny"
              value={0}
              {...register("minGuests")}
              className="hidden peer"
              defaultChecked={filterTerms?.minGuests === undefined || filterTerms?.minGuests === 0}
            />
            <label
              htmlFor="guestsAny"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              Any
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests1" value={1} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 1} />
            <label
              htmlFor="guests1"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              1
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests2" value={2} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 2} />
            <label
              htmlFor="guests2"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              2
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests3" value={3} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 3} />
            <label
              htmlFor="guests3"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              3
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests4" value={4} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 4} />
            <label
              htmlFor="guests4"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              4
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests5" value={5} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 5} />
            <label
              htmlFor="guests5"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              5
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests6" value={6} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 6} />
            <label
              htmlFor="guests6"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              6
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests7" value={7} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 7} />
            <label
              htmlFor="guests7"
              className="px-3 py-1 rounded-full bg-neutral text-primary border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral text-sm cursor-pointer">
              7
            </label>
          </li>
          <li>
            <input type="radio" name="minGuests" id="guests8" value={8} {...register("minGuests")} className="hidden peer" defaultChecked={filterTerms?.minGuests === 8} />
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

      <div className="flex flex-wrap justify-between mt-2">
        <button type="submit" className="btn btn-primary sm:w-1/2">
          Apply filters
        </button>
        <button type="button" onClick={handleClearFilters} className="btn btn-outlined sm:w-1/4">
          Clear
        </button>
      </div>
    </form>
  );
}
