import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/holidaze_logo.png";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideNavBarMenuClick = (event) => {
      if (!event.target.closest("#navbar-menu") && !event.target.closest("#navbar-toggler")) {
        setIsNavOpen(false);
      }
    };

    const handleOutsideUserMenuDropdownClick = (event) => {
      if (!event.target.closest("#user-menu-dropdown") && !event.target.closest("#user-menu-button")) {
        setIsDropdownOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener("click", handleOutsideNavBarMenuClick);
    }

    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideUserMenuDropdownClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideNavBarMenuClick);
      document.removeEventListener("click", handleOutsideUserMenuDropdownClick);
    };
  }, [isNavOpen, isDropdownOpen]);

  return (
    <nav className="bg-background">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button type="button" onClick={() => setIsNavOpen(true)} id="navbar-toggler" className="md:hidden">
          <IoMenu size={30} className="text-primary" />
        </button>

        <Link to="/">
          <img src={Logo} alt="Holidaze logotype" className="h-8" />
        </Link>

        <div className="hidden md:block">SearchBar</div>

        <div className="flex items-center gap-5">
          <div
            id="navbar-menu"
            className={`${isNavOpen ? "p-5 h-screen absolute left-0 top-0" : "hidden"} bg-secondary md:bg-background md:block items-center md:w-full md:p-0 md:h-full md:relative gap-5`}>
            <div className="text-right">
              <button onClick={() => setIsNavOpen(false)} className="mb-16 md:hidden" aria-label="Show menu">
                <IoClose size={40} className="text-primary" />
              </button>
            </div>

            <ul className="flex flex-col px-5 md:p-0 gap-5 md:flex-row">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="about"
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="contact"
                  onClick={() => setIsNavOpen(false)}
                  className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-70 transition-colors duration-300 ease-in-out"}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="hidden md:flex text-sm border-2 border-black rounded-full"
            id="user-menu-button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            aria-label="Show user menu">
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="profile avatar" />
          </button>

          <div
            id="user-menu-dropdown"
            className={`${isDropdownOpen ? "block absolute right-5 top-12" : "hidden"} z-50 my-4 text-base list-none bg-secondary divide-y divide-gray-400 rounded-lg shadow`}>
            <div className="px-4 py-3">
              <span className="block text-sm text-primary">Laura Holiday</span>
              <span className="block text-sm  text-text truncate">laura@holiday.com</span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <NavLink to="profile" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
                  My profile
                </NavLink>
              </li>
              <li>
                <NavLink to="venues/add" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
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
