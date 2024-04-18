import { Link, NavLink } from "react-router-dom";
import Logo from "../../../assets/holidaze_logo.png";

export default function Footer() {
  return (
    <footer className="bg-secondary md:rounded-lg md:shadow md:m-6">
      <div className="w-full  mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/">
            <figure className="mb-4 sm:mb-0">
              <img src={Logo} alt="Holidaze logotype" className="h-6" />
            </figure>
          </Link>

          <ul className="flex flex-wrap items-center gap-3 md:gap-6 text-sm font-medium mb-6 sm:mb-0">
            <li>
              <NavLink to="/" className={({ isActive }) => `text-base ${isActive ? "opacity-40" : "hover:text-gray-400"}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" className={({ isActive }) => `text-base ${isActive ? "opacity-40" : "hover:text-gray-400"}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="contact" className={({ isActive }) => `text-base ${isActive ? "opacity-40" : "hover:text-gray-400"}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 lg:my-8 w-full rounded border border-gray-300 " />
        <span className="block text-sm sm:text-center">
          Copyright &copy; 2024 |{" "}
          <Link to="https://www.michaelriver.dev" target="_blank" className="hover:text-gray-400">
            Michael Nilsson
          </Link>
        </span>
      </div>
    </footer>
  );
}
