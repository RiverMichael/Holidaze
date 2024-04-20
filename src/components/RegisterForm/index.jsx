import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Please enter your name"),
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

  function handleOnSubmit(data) {
    const { passwordConfirmation, ...submitData } = data;
    console.log("Register form data:", submitData);
  }

  return (
    <form id="registerForm" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="mb-3">
        <label htmlFor="registerName" className="text-sm font-bold flex justify-between">
          Name
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

      <button className="btn btn-primary w-full">Sign up</button>
    </form>
  );
}
