import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";

const schema = yup.object({
  name: yup.string().required("Please enter your name").min(3, "Name must be at least 3 characters long"),
  email: yup.string().email().required("Please enter a valid email address"),
  subject: yup.string().oneOf(["booking", "venue", "profile", "other"], "Please select a subject").required("Please select a subject"),
  body: yup.string().required("Please enter a message").min(10, "Message must be at least 10 characters long").max(500, "Message must be less than 500 characters long"),
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  function handleOnSubmit(data) {
    setIsSubmitting(true);
    setShowModal(true);
    console.log("Contact form data:", data);

    setTimeout(() => {
      setIsSubmitting(false);
      reset();
    }, 1000);
  }

  return (
    <>
      <form id="contactForm" onSubmit={handleSubmit(handleOnSubmit)} className="flex flex-col gap-3">
        <div className="w-full flex flex-col gap-1">
          <label htmlFor="contactFormName" className="text-sm font-bold flex justify-between w-full">
            Name <span className={`font-light ${errors.name && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            id="contactFormName"
            {...register("name")}
            className={`form-input w-full ${errors.name ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            type="text"
            placeholder="Laura Holiday"
          />
          <p className="text-error font-light">{errors.name?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="contactFormEmail" className="text-sm font-bold flex justify-between w-full">
            Email <span className={`font-light ${errors.name && "text-error font-bold"}`}>*Required</span>
          </label>
          <input
            id="contactFormEmail"
            {...register("email")}
            className={`form-input w-full ${errors.email ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            type="email"
            placeholder="laura.holiday@stud.noroff.no"
          />
          <p className="text-error font-light">{errors.email?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="contactFormSubject" className="text-sm font-bold flex justify-between w-full">
            Subject <span className={`font-light ${errors.subject && "text-error font-bold"}`}>*Required</span>
          </label>
          <select id="contactFormSubject" {...register("subject")} className={`form-input w-full ${errors.subject ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}>
            <option value="">Select a subject</option>
            <option value="booking">Booking</option>
            <option value="venue">Venue</option>
            <option value="profile">Profile</option>
            <option value="other">Other</option>
          </select>
          <p className="text-error font-light">{errors.subject?.message}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label htmlFor="contactFormMessage" className="text-sm font-bold flex justify-between w-full">
            Message <span className={`font-light ${errors.body && "text-error font-bold"}`}>*Required</span>
          </label>
          <textarea
            id="contactFormMessage"
            cols="30"
            rows="5"
            {...register("body")}
            className={`form-input w-full ${errors.body ? "form-input-error focus:ring-error" : "focus:ring-primary-dark"}`}
            placeholder="Write your message here"></textarea>
          <p className="text-error font-light">{errors.body?.message}</p>
        </div>

        <div className="flex justify-center mt-1">
          <button disabled={isSubmitting} className={`btn w-2/3 ${isSubmitting ? "btn-outlined" : "btn-primary"}`}>
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
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </div>
      </form>

      <Modal size="md" show={showModal} onClose={() => setShowModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl">Thank you for your message!</h2>
              <p className="text-text">We will get back to you as soon as possible. Our normal response time is up to 48h.</p>
            </div>
            <button onClick={() => navigate("/")} className="btn btn-primary w-full">
              Browse more venues
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
