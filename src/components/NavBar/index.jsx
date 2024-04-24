import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/holidaze_logo.png";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ProfileDropdown from "../ProfileDropdown";
import useAuth from "../../store/auth";
import useHandleLogout from "../../hooks/useHandleLogout";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated, profile } = useAuth();
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const handleOutsideNavBarMenuClick = (event) => {
      if (!event.target.closest("#navbar-menu") && !event.target.closest("#navbar-toggler")) {
        setIsNavOpen(false);
      }
    };

    if (isNavOpen) {
      document.addEventListener("click", handleOutsideNavBarMenuClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideNavBarMenuClick);
    };
  }, [isNavOpen]);

  return (
    <nav className="bg-neutral">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button type="button" onClick={() => setIsNavOpen(true)} id="navbar-toggler" className="md:hidden">
          <IoMenu size={30} className="text-primary" />
        </button>

        <Link to="/">
          <img src={Logo} alt="Holidaze logotype" className="h-8" />
        </Link>

        <div className="hidden md:block">
          <SearchBar />
        </div>

        <div className="flex items-center gap-5">
          <div
            id="navbar-menu"
            className={`${
              isNavOpen ? "flex p-5 h-screen absolute left-0 top-0" : "hidden"
            } bg-secondary md:bg-neutral md:flex flex-col md:flex-row items-center md:w-full md:p-0 md:h-full md:relative gap-5`}>
            <div className="flex w-full justify-end">
              <button onClick={() => setIsNavOpen(false)} className="mb-16 md:hidden" aria-label="Show menu">
                <IoClose size={40} className="text-primary" />
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-5 md:items-center grow justify-between px-5 mb-5 md:mb-0 md:p-0">
              <ul className="flex flex-col gap-5 md:flex-row">
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
                    className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                    Contact
                  </NavLink>
                </li>
              </ul>

              {!isAuthenticated ? (
                <div className="flex flex-col md:flex-row gap-2">
                  <NavLink to="login" onClick={() => setIsNavOpen(false)} className="btn btn-outlined w-full">
                    Login
                  </NavLink>
                  <NavLink to="register" onClick={() => setIsNavOpen(false)} className="btn btn-primary w-full">
                    Sign up
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <NavLink
                    to="profile"
                    onClick={() => setIsNavOpen(false)}
                    className={({ isActive }) => `flex items-center gap-2 md:hidden text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                    <figure className="w-10 h-10">
                      <img src={profile.avatar} alt={`${profile.name} avatar`} className="w-full h-full rounded-full object-center object-cover" />
                    </figure>
                    {profile.name}
                  </NavLink>

                  <button onClick={() => handleLogout()} className="md:hidden btn btn-outlined text-sm bg-secondary">
                    Log out
                  </button>

                  <ProfileDropdown />
                </div>
              )}
            </div>
          </div>

          <button type="button" className="md:hidden">
            <IoSearch size={30} className="text-primary" />
          </button>
        </div>
      </div>
    </nav>
  );
}
