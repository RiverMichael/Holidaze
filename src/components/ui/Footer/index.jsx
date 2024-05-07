import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../../assets/holidaze_logo.png";
import { scrollToTop } from "../../../utils/scrollToTop";

export default function Footer() {
  const location = useLocation();

  const handleNavLinks = (path) => {
    scrollToTop(path, location.pathname);
  };

  return (
    <footer className="bg-secondary md:rounded-lg md:shadow md:m-6">
      <div className="w-full  mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" onClick={() => handleNavLinks("/")}>
            <figure className="mb-4 sm:mb-0">
              <img src={Logo} alt="Holidaze logotype" className="h-6" />
            </figure>
          </Link>

          <ul className="flex flex-wrap items-center gap-3 md:gap-6 text-sm font-medium mb-6 sm:mb-0">
            <li>
              <NavLink to="/" onClick={() => handleNavLinks("/")} className={({ isActive }) => `link text-base font-normal ${isActive && "link-active"}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" onClick={() => handleNavLinks("/about")} className={({ isActive }) => `link text-base font-normal ${isActive && "link-active"}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="contact" onClick={() => handleNavLinks("/contact")} className={({ isActive }) => `link text-base font-normal ${isActive && "link-active"}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 lg:my-8 w-full rounded border border-gray-300 " />
        <span className="block text-sm sm:text-center">
          Copyright &copy; 2024 |{" "}
          <Link to="https://www.michaelriver.dev" target="_blank" className="link-primary">
            Michael Nilsson
          </Link>
        </span>
      </div>
    </footer>
  );
}
