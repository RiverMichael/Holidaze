import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFetchOptions } from "../../hooks/useFetchOptions";
import { useEffect, useState } from "react";
import doFetch from "../../utils/doFetch";
import { API_AUTH_URL } from "../../constants/api";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import useAuth from "../../store/auth";

const schema = yup.object({
  email: yup
    .string()
    .required("Please enter a valid email address")
    .matches(/^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/, "Must be a valid @stud.noroff.no email address"),
  password: yup.string().min(8, "Password must be at least 8 characters long").required(),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const { postData } = useFetchOptions();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { setToken, setApiKey, setProfile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn) {
      const fetchApiKey = async () => {
        try {
          const apiKeyResult = await doFetch(`${API_AUTH_URL}/create-api-key`, postData({}));
          setApiKey(apiKeyResult.key);

          setTimeout(() => {
            navigate("/");
          }, 1500);
        } catch (error) {
          console.log("error:", error);
          setIsError(true);
        }
      };
      fetchApiKey();
    }
  }, [isUserLoggedIn]);

  const handleOnSubmit = async (data) => {
    setIsSubmitting(true);

    const options = postData(data);

    try {
      const result = await doFetch(`${API_AUTH_URL}/login`, options);

      setProfile(result);
      setToken(result.accessToken);
      setIsUserLoggedIn(true);
      setIsError(false);
      reset();
    } catch (error) {
      console.log("error:", error);
      setIsError(true);
    } finally {
      setIsSubmitting(false);
      setShowToast(true);
    }
  };

  return (
    <>
      <form id="loginForm" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="text-sm font-bold flex justify-between">
            Email
            <span className={`font-light ${errors.email && "text-error font-bold"}`}>*Required</span>
          </label>
          <input id="loginEmail" {...register("email")} className={`form-input w-full focus:ring-0 ${errors.email && "form-input-error"}`} type="email" placeholder="laura@holiday.com" />
          <p className="text-error font-light">{errors.email?.message}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="text-sm font-bold flex justify-between">
            Password
            <span className={`font-light ${errors.password && "text-error font-bold"}`}>*Required</span>
          </label>
          <input id="registerPassword" {...register("password")} className={`form-input w-full focus:ring-0 ${errors.password && "form-input-error"}`} type="password" placeholder="********" />
          <p className="text-error font-light">{errors.password?.message}</p>
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
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>

      <div
        id="toast"
        className={`items-center m-4 p-5 border rounded-lg shadow fixed z-50 top-0 right-0 ${showToast ? "flex" : "hidden"} ${
          isError ? "border-error text-error bg-red-50" : " bg-green-50 border-green-700 text-green-700"
        }`}
        role="alert">
        <div className="text-lg">{isError ? "Something went wrong when trying to login to your account! Please try again." : "Congratulations! You have been logged in to your account."}</div>

        <button onClick={() => setShowToast(false)} type="button" className="ms-5" aria-label="Close">
          <IoClose size={20} />
        </button>
      </div>
    </>
  );
}
