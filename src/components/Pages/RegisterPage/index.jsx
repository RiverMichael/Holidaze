import { Link } from "react-router-dom";
import useUpdateHead from "../../../hooks/useUpdateHead";
import RegisterForm from "../../forms/RegisterForm";

export default function RegisterPage() {
  useUpdateHead("Register", "Register a new account at Holidaze");

  return (
    <main className="flex flex-col gap-8 px-5 container max-w-sm">
      <div>
        <h1>Register</h1>
        <p className="text-primary font-heading font-bold text-lg">a new account</p>
      </div>

      <section className="flex flex-col gap-2">
        <RegisterForm />
        <Link to="/login" className="link-primary text-center">
          Already have an account?
        </Link>
      </section>
    </main>
  );
}
