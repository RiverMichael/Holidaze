import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFetchOptions } from "../../../hooks/useFetchOptions";
import { useState } from "react";
import doFetch from "../../../utils/doFetch";
import { API_BASE_URL } from "../../../constants/apiURL";
import useAuth from "../../../store/auth";

const schema = yup.object({
  avatar: yup.object({
    url: yup.string().url("Please enter a valid URL"),
  }),
  venueManager: yup.boolean(),
});

export default function UpdateProfileForm({ profile, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: { url: profile?.avatar?.url || "" },
      venueManager: profile?.venueManager || false,
    },
    mode: "onChange",
  });

  const { updateData } = useFetchOptions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const { updateAvatar, setVenueManager } = useAuth();

  const handleOnSubmit = async (data) => {
    setIsSubmitting(true);
    const options = updateData(data);

    try {
      const result = await doFetch(`${API_BASE_URL}/profiles/${profile.name}`, options);
      onSuccess(result.data);
      setIsError(false);
      updateAvatar(data.avatar.url);
      setVenueManager(data.venueManager);
    } catch (error) {
      console.log("error:", error);
      setIsError(true);
      setIsAlertShowing(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form id="updateProfileForm" onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-2">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="updateAvatar" className="text-sm font-bold flex justify-between w-full">
            Avatar URL
          </label>
          <input
            id="updateAvatar"
            {...register("avatar.url")}
            className={`form-input w-full ${errors.avatar ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            type="url"
            placeholder="https://image.jpg"
          />
          <p className="text-error font-light">{errors.avatar?.url.message}</p>
        </div>

        <div className="flex gap-2 items-center mb-5">
          <input
            type="checkbox"
            id="updateManagerStatus"
            {...register("venueManager")}
            className="rounded border-2 w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
          />
          <label htmlFor="updateManagerStatus">I want to be a venue manager</label>
        </div>

        <button disabled={isSubmitting} className={`btn w-full ${isSubmitting ? "btn-outlined" : "btn-primary"}`}>
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
          {isSubmitting ? "Updating..." : "Update profile"}
        </button>
      </form>

      {isError && (
        <div role="alert" className="text-red-800 bg-red-50 p-2 border border-red-800 rounded shadow">
          <p>There was an error updating your profile. Please try again.</p>
        </div>
      )}
    </>
  );
}
