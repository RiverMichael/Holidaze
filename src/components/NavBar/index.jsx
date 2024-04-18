import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/holidaze_logo.png";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";

export default function NavBar() {
  return (
    <nav className="bg-background">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
        <button type="button" data-collapse-toggle="navbar-user" aria-controls="navbar-user" aria-expanded="false" className="md:hidden">
          <IoMenu size={30} className="text-primary" />
        </button>

        <Link to="/">
          <img src={Logo} alt="Holidaze logotype" className="h-8" />
        </Link>

        <div className="hidden md:block">SearchBar</div>

        <div className="flex items-center gap-2">
          <div id="navbar-user" className="bg-secondary md:bg-background hidden md:block items-center w-1/3 md:w-full p-5 md:p-0 h-screen md:h-full absolute md:relative left-0 top-0 gap-5">
            <div className="text-right">
              <button data-collapse-toggle="navbar-user" aria-controls="navbar-user" aria-expanded="true" className="mt-2 mb-16 md:hidden">
                <IoClose size={40} className="text-primary" />
              </button>
            </div>

            <ul className="flex flex-col px-5 md:p-0 gap-5 md:flex-row">
              <li>
                <NavLink to="/" className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="about" className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="contact" className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-70 transition-colors duration-300 ease-in-out"}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="hidden md:flex text-sm border-2 border-black rounded-full"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="profile avatar" />
          </button>

          {/* <!-- Dropdown menu --> */}
          <div className="z-50 hidden my-4 text-base list-none bg-secondary divide-y divide-gray-400 rounded-lg shadow " id="user-dropdown">
            <div className="px-4 py-3">
              <span className="block text-sm text-primary">Laura Holiday</span>
              <span className="block text-sm  text-text truncate">laura@holiday.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink to="profile" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink to="venues/add" className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
                  Add Venue
                </NavLink>
              </li>
              <li className="block px-4 py-2 text-sm text-text hover:bg-gray-100">Sign out</li>
            </ul>
          </div>

          <button type="button" className="md:hidden">
            <IoSearch size={30} className="text-primary" />
          </button>
        </div>
        <div id="navbar-menu" className="hidden">
          Navbar dropdown
        </div>
      </div>
    </nav>
  );
}
