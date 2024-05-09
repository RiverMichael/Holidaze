import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFetchOptions } from "../../../hooks/useFetchOptions";
import { useState } from "react";
import { useNavigate } from "react-router";
import doFetch from "../../../utils/doFetch";
import { API_BASE_URL } from "../../../constants/apiURL";
import { IoTrashOutline, IoClose } from "react-icons/io5";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";

const schema = yup.object({
  name: yup.string().required("Please enter a venue name"),
  description: yup.string().required("Please enter a venue description"),
  price: yup.number().typeError("Please enter a price").required("Please enter a price").min(10, "Minimum price is $10").max(10000, "Maximum price is $10,000"),
  maxGuests: yup
    .number("Please enter the maximum number of guests")
    .typeError("Please enter the maximum number of guests")
    .required("Please enter the maximum number of guests")
    .min(1, "Minimum number of guests is 1"),
  rating: yup.number().nullable().typeError("Please enter a valid number between 0 and 5").min(0, "Rating must be at least 0").max(5, "Rating maximum is 5"),
  meta: yup.object({
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  }),
  media: yup.array().of(yup.object().shape({ url: yup.string().url("Please enter a valid URL") })),
  location: yup.object({
    address: yup.string(),
    city: yup.string("Please enter a city").required("Please enter a city"),
    zip: yup.string(),
    country: yup.string("Please enter a country").required("Please enter a country"),
    lat: yup.number().nullable().typeError("Please enter a valid latitude").min(-90, "Minimum latitude is -90").max(90, "Maximum latitude is 90"),
    lng: yup.number().nullable().typeError("Please enter a valid longitude").min(-180, "Minimum longitude is -180").max(180, "Maximum longitude is 180"),
  }),
});

export default function EditVenueForm({ venue }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: venue.name,
      description: venue.description,
      price: venue.price,
      maxGuests: venue.maxGuests,
      rating: venue.rating,
      meta: {
        wifi: venue.meta.wifi,
        parking: venue.meta.parking,
        breakfast: venue.meta.breakfast,
        pets: venue.meta.pets,
      },
      location: { address: venue.location.address, city: venue.location.city, country: venue.location.country, zip: venue.location.zip, lat: venue.location.lat, lng: venue.location.lng },
      media: venue.media.length > 0 ? venue.media : [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "media",
  });

  const { updateData, deleteData } = useFetchOptions();
  const [isSubmitting, setIsSubmitting] = useState();
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (data) => {
    setIsDeleting(false);
    setIsSubmitting(true);

    const filteredMedia = data.media.filter((mediaItem) => mediaItem.url.trim() !== "");
    const formData = {
      ...data,
      media: filteredMedia,
    };
    const options = updateData(formData);

    try {
      const result = await doFetch(`${API_BASE_URL}/venues/${venue.id}`, options);
      setIsError(false);
      setTimeout(() => {
        navigate(`/venues/${venue.id}`);
      }, 1500);
    } catch (error) {
      console.log("error:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  const handleDeleteVenue = async () => {
    setIsDeleting(true);

    try {
      const deleteResult = await fetch(`${API_BASE_URL}/venues/${venue.id}`, deleteData());

      if (deleteResult.status !== 204) {
        throw new Error("Failed to delete venue");
      }

      setIsError(false);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.log("error:", error);
      setIsError(true);
    } finally {
      setShowModal(false);
      setShowToast(true);
    }
  };

  const cancelEditForm = () => {
    reset();
    navigate(`/venues/${venue.id}`);
  };

  return (
    <>
      <form id="addVenueForm" onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="addVenueName" className="text-primary text-sm font-bold flex justify-between w-full">
            Venue name <span className={`font-light text-text ${errors.name && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            type="text"
            id="addVenueName"
            {...register("name")}
            className={`form-input w-full ${errors.name ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            placeholder="Venue name"
          />
          <p className="text-error font-light">{errors.name?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="addVenueDescription" className="text-primary text-sm font-bold flex justify-between w-full">
            Description <span className={`font-light text-text ${errors.description && "text-error font-bold"}`}>*Required</span>
          </label>
          <textarea
            id="addVenueDescription"
            cols="30"
            rows="5"
            {...register("description")}
            className={`form-input w-full ${errors.description ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            placeholder="A description of the venue"></textarea>
          <p className="text-error font-light">{errors.description?.message}</p>
        </div>

        <div className="flex justify-between">
          <div className="w-1/4 flex flex-col gap-1">
            <label htmlFor="addVenuePrice" className="text-primary text-sm font-bold flex flex-col w-full flex-wrap grow">
              $ Price / Night <span className={`font-light text-text ${errors.price && "text-error font-bold"}`}>*Required</span>
            </label>
            <input
              type="number"
              id="addVenuePrice"
              {...register("price")}
              className={`form-input w-full text-center ${errors.price ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
              placeholder="$50"
            />
            <p className="text-error font-light">{errors.price?.message}</p>
          </div>

          <div className="w-1/4 flex flex-col gap-1">
            <label htmlFor="addVenueGuests" className="text-primary text-sm font-bold flex flex-col w-full flex-wrap grow">
              Guests <span className={`font-light text-text ${errors.maxGuests && "text-error font-bold"}`}>*Required</span>
            </label>
            <input
              type="number"
              id="addVenueGuests"
              {...register("maxGuests")}
              className={`form-input w-full text-center ${errors.maxGuests ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
              placeholder="4"
            />
            <p className="text-error font-light">{errors.maxGuests?.message}</p>
          </div>

          <div className="w-1/4 flex flex-col gap-1">
            <label htmlFor="addVenueRating" className="text-primary text-sm font-bold flex flex-col w-full flex-wrap grow">
              Rating <span className={`font-light text-text ${errors.rating && "text-error font-bold"}`}>(0 - 5)</span>
            </label>
            <input
              type="number"
              step="0.1"
              id="addVenueRating"
              {...register("rating")}
              className={`form-input w-full text-center ${errors.rating ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
              placeholder="0"
            />
            <p className="text-error font-light">{errors.rating?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-1">
          <h2 className="text-sm font-body">Features</h2>
          <ul className="flex justify-between">
            <li>
              <input type="checkbox" name="" id="featureWifi" className="hidden peer" {...register("meta.wifi")} />
              <label
                htmlFor="featureWifi"
                className="cursor-pointer px-3 py-1 rounded-full border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral">
                Wifi
              </label>
            </li>
            <li>
              <input type="checkbox" name="" id="featureBreakfast" className="hidden peer" {...register("meta.breakfast")} />
              <label
                htmlFor="featureBreakfast"
                className="cursor-pointer px-3 py-1 rounded-full border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral">
                Breakfast
              </label>
            </li>
            <li>
              <input type="checkbox" name="" id="featureParking" className="hidden peer" {...register("meta.parking")} />
              <label
                htmlFor="featureParking"
                className="cursor-pointer px-3 py-1 rounded-full border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral">
                Parking
              </label>
            </li>
            <li>
              <input type="checkbox" name="" id="featurePets" className="hidden peer" {...register("meta.pets")} />
              <label
                htmlFor="featurePets"
                className="cursor-pointer px-3 py-1 rounded-full border border-primary hover:bg-primary-light hover:text-neutral hover:border-primary-light peer-checked:bg-primary peer-checked:text-neutral">
                Pets
              </label>
            </li>
          </ul>
        </div>

        <div className="w-full flex flex-col gap-1 mb-1">
          <label htmlFor="addVenueAddress" className="text-primary text-sm font-bold flex justify-between w-full">
            Address
          </label>
          <input type="text" id="addVenueAddress" {...register("location.address")} className="form-input w-full focus:ring-primary-dark" placeholder="279, Shorewood Drive" />
        </div>

        <div className="w-full flex flex-col gap-1 mb-1">
          <label htmlFor="addVenueZip" className="text-primary text-sm font-bold flex justify-between w-full">
            Zip code
          </label>
          <input type="number" id="addVenueZip" {...register("location.zip")} className="form-input w-full focus:ring-primary-dark" placeholder="80201" />
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="addVenueCity" className="text-primary text-sm font-bold flex justify-between w-full">
            City <span className={`font-light text-text ${errors.location?.city && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            type="text"
            id="addVenueCity"
            {...register("location.city")}
            className={`form-input w-full ${errors.location?.city ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            placeholder="Grand Lake"
          />
          <p className="text-error font-light">{errors.location?.city?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="addVenueCountry" className="text-primary text-sm font-bold flex justify-between w-full">
            Country <span className={`font-light text-text ${errors.location?.country && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            type="text"
            id="addVenueCountry"
            {...register("location.country")}
            className={`form-input w-full ${errors.location?.country ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            placeholder="USA"
          />
          <p className="text-error font-light">{errors.location?.country?.message}</p>
        </div>

        <div className="flex justify-between">
          <div className="w-1/3 flex flex-col gap-1">
            <label htmlFor="addVenueLatitude" className="text-primary text-sm font-bold flex flex-col w-full flex-wrap">
              Latitude <span className="font-light text-text">(-90 to 90)</span>
            </label>
            <input
              type="number"
              id="addVenueLatitude"
              step="0.000001"
              {...register("location.lat")}
              className={`form-input w-full text-center ${errors.location?.lat ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
              placeholder="e.g., 34.0522"
            />
            <p className="text-error font-light">{errors.location?.lat?.message}</p>
          </div>

          <div className="w-1/3 flex flex-col gap-1">
            <label htmlFor="addVenueLongitude" className="text-primary text-sm font-bold flex flex-col w-full flex-wrap">
              Longitude <span className="font-light text-text">(-180 to 180)</span>
            </label>
            <input
              type="number"
              id="addVenueLongitude"
              step="0.000001"
              {...register("location.lng")}
              className={`form-input w-full text-center ${errors.location?.lng ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
              placeholder="e.g., -118.2437"
            />
            <p className="text-error font-light">{errors.location?.lng?.message}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {fields.map((item, index) => (
            <div key={item.id} className="w-full flex flex-col gap-1">
              <label htmlFor={`media[${index}].url`} className="text-primary text-sm font-bold flex justify-between w-full">
                Image URL{" "}
                <button type="button" onClick={() => remove(index)} className="p-1 rounded-full hover:bg-primary-light hover:text-neutral">
                  <IoTrashOutline />
                </button>
              </label>
              <input
                type="url"
                {...register(`media[${index}].url`)}
                className={`form-input w-full ${errors.media && errors.media[index]?.url ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.media && errors.media[index]?.url && <p className="text-error font-light">{errors.media[index].url.message}</p>}
            </div>
          ))}

          <button type="button" onClick={() => append({ url: "" })} className="link-primary text-sm w-max">
            Add another Image
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button type="submit" disabled={isSubmitting} className={`btn w-1/2 ${isSubmitting ? "btn-outlined" : "btn-primary"}`}>
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
            {isSubmitting ? "Updating..." : "Update venue"}
          </button>

          <button type="button" onClick={cancelEditForm} className="btn btn-outlined w-1/3">
            Cancel
          </button>
        </div>

        <div className="flex justify-end mt-2">
          <button type="button" onClick={() => setShowModal(true)} className="btn w-1/3 bg-red-700 text-neutral border-red-700 text-sm hover:bg-red-50 hover:text-red-700">
            Delete venue
          </button>
        </div>
      </form>

      <div
        id="toast"
        className={`items-center m-4 p-5 border rounded-lg shadow fixed z-50 top-0 right-0 ${showToast ? "flex" : "hidden"} ${
          isError ? "border-red-800 text-red-800 bg-red-50" : "bg-green-50 text-green-800 border-green-800"
        }`}
        role="alert">
        <div className="text-lg">
          {isDeleting && isError && "Something went wrong when deleting this venue! Please try again."}
          {isError && !isDeleting && "Something went wrong when updating this venue! Please try again."}
          {!isError && !isDeleting && (
            <div>
              Congratulations! You have updated the <span className="text-primary-light">{venue.name}</span> venue!
            </div>
          )}
          {isDeleting && !isError && (
            <div>
              You have deleted the <span className="text-primary-light">{venue.name}</span> venue!
            </div>
          )}
        </div>

        <button
          onClick={() => setShowToast(false)}
          type="button"
          className={`ms-5 p-1 rounded-full ${isError ? "hover:bg-red-800 hover:text-red-50" : "hover:bg-green-800 hover:text-green-50"}`}
          aria-label="Close">
          <IoClose size={20} />
        </button>
      </div>

      <Modal show={showModal} size="md" onClose={() => setShowModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-2 h-14 w-14 text-red-700" />
            <h3 className="mb-10 text-lg font-normal text-red-700">Are you sure you want to delete this venue?</h3>
            <div className="flex justify-evenly">
              <button onClick={handleDeleteVenue} className="btn bg-red-700 text-neutral border-red-700 hover:bg-red-50 hover:text-red-700">
                Delete
              </button>
              <button onClick={() => setShowModal(false)} className="btn btn-outlined">
                Cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
