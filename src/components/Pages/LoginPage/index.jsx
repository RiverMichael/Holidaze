import useUpdateHead from "../../../hooks/useUpdateHead";
import LoginForm from "../../LoginForm";
import { Link } from "react-router-dom";
export default function LoginPage() {
  useUpdateHead("Login", "Login to your Holidaze account");

  return (
    <main className="flex flex-col gap-8 px-5 container max-w-sm">
      <div>
        <h1>Login</h1>
        <p className="text-primary font-heading font-bold text-lg">to your account</p>
      </div>

      <section className="flex flex-col gap-2">
        <LoginForm />
        <Link to="/register" className="link-primary text-center">
          Register a new account
        </Link>
      </section>
    </main>
  );
}
