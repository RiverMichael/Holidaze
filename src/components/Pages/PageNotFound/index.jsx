import { Link } from "react-router-dom";
import useUpdateHead from "../../../hooks/useUpdateHead";

export default function PageNotFound() {
  useUpdateHead("Page not found", "Unfortunately, the page you are looking for does not exist.");

  return (
    <main className="px-5">
      <div className="p-5 sm:p-12 bg-red-50 border-2 border-error rounded shadow text-center flex flex-col gap-5">
        <h1 className="text-error">404 - Page not found</h1>
        <p className="">Oooops! We can not seem to find this page.</p>

        <Link to="/" className="underline underline-offset-2 hover:opacity-60">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
