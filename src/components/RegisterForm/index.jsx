import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API_AUTH_URL } from "../../shared/api";
import { useFetchOptions } from "../../Hooks/useFetchOptions";
import { useState, useEffect } from "react";
import doFetch from "../doFetch";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import useAuth from "../store/auth";

const schema = yup.object({
  name: yup
    .string()
    .required("Please enter your name")
    .matches(/^[A-Za-z0-9_]+$/, "Name can only use a-Z, 0-9, and _"),
  email: yup
    .string()
    .required("Please enter a valid email address")
    .matches(/^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/, "Must be a valid @stud.noroff.no email address"),
  avatar: yup.object({
    url: yup.string().url("Please enter an URL"),
  }),
  password: yup.string().min(8, "Password must be at least 8 characters long").required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  const { postData } = useFetchOptions();

  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState([]);
  const { setToken, setApiKey } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserCreated) {
      const login = async () => {
        const { password, email } = formData;
        const loginData = { email, password };
        const loginOptions = postData(loginData);
        try {
          const loginResult = await doFetch(`${API_AUTH_URL}/login`, loginOptions);
          setToken(loginResult.accessToken);
          fetchApiKey();
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } catch (error) {
          console.log("error:", error);
          setIsError(true);
        }
      };

      const fetchApiKey = async () => {
        try {
          const apiKeyResult = await doFetch(`${API_AUTH_URL}/create-api-key`, postData({}));
          console.log("apiKey:", apiKeyResult.key);
          setApiKey(apiKeyResult.key);
        } catch (error) {
          console.log("error:", error);
          setIsError(true);
        }
      };

      login();
    }
  }, [isUserCreated]);

  const handleOnSubmit = async (data) => {
    setIsSubmitting(true);

    const { passwordConfirmation, ...submitData } = data;
    if (!submitData.avatar.url) {
      delete submitData.avatar;
    }
    const options = postData(submitData);

    try {
      const result = await doFetch(`${API_AUTH_URL}/register`, options);
      setIsUserCreated(true);
      setIsError(false);
      setFormData(data);
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
      <form id="registerForm" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="mb-3">
          <label htmlFor="registerName" className="text-sm font-bold flex justify-between">
            Username
            <span className={`font-light ${errors.name && "text-error font-bold"}`}>*Required</span>
          </label>
          <input id="registerName" {...register("name")} className={`form-input w-full focus:ring-0 ${errors.name && "form-input-error"}`} type="text" placeholder="Laura Holiday" />
          <p className="text-error font-light">{errors.name?.message}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="registerEmail" className="text-sm font-bold flex justify-between">
            Email
            <span className={`font-light ${errors.email && "text-error font-bold"}`}>*Required</span>
          </label>
          <input id="registerEmail" {...register("email")} className={`form-input w-full focus:ring-0 ${errors.email && "form-input-error"}`} type="email" placeholder="laura@holiday.com" />
          <p className="text-error font-light">{errors.email?.message}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="registerAvatar" className="text-sm font-bold flex justify-between">
            Avatar URL
          </label>
          <input id="registerAvatar" {...register("avatar.url")} className={`form-input w-full focus:ring-0 ${errors.avatar && "form-input-error"}`} type="url" placeholder="https://image.jpg" />
          <p className="text-error font-light">{errors.avatar?.url.message}</p>
        </div>

        <div className="mb-3">
          <label htmlFor="registerPassword" className="text-sm font-bold flex justify-between">
            Password
            <span className={`font-light ${errors.password && "text-error font-bold"}`}>*Required</span>
          </label>
          <input id="registerPassword" {...register("password")} className={`form-input w-full focus:ring-0 ${errors.password && "form-input-error"}`} type="password" placeholder="********" />
          <p className="text-error font-light">{errors.password?.message}</p>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordConfirmation" className="text-sm font-bold flex justify-between">
            Password confirmation
            <span className={`font-light ${errors.passwordConfirmation && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            id="passwordConfirmation"
            {...register("passwordConfirmation")}
            className={`form-input w-full focus:ring-0 ${errors.passwordConfirmation && "form-input-error"}`}
            type="password"
            placeholder="********"
          />
          <p className="text-error font-light">{errors.passwordConfirmation?.message}</p>
        </div>

        <div className="flex gap-2 items-center mb-8">
          <input
            type="checkbox"
            id="registerManager"
            {...register("venueManager")}
            className="rounded border-2 w-5 h-5  border-primary hover:bg-primary-light hover:border-primary-light focus:bg-primary-light focus:border-primary-light text-primary focus:ring-0"
          />
          <label htmlFor="registerManager">I want to be a venue manager</label>
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
          {isSubmitting ? "Registering..." : "Sign up"}
        </button>
      </form>

      <div
        id="toast"
        className={` items-center m-4 p-5 border rounded-lg shadow absolute z-50 top-0 right-0 ${showToast ? "flex" : "hidden"} ${
          isError ? "border-error text-error bg-red-50" : " bg-green-50 border-green-700 text-green-700"
        }`}
        role="alert">
        <div className="text-lg">{isError ? "Something went wrong when creating you account! Please try again." : "Congratulations! You have created an account."}</div>

        <button onClick={() => setShowToast(false)} type="button" className="ms-5" aria-label="Close">
          <IoClose size={20} />
        </button>
      </div>
    </>
  );
}
