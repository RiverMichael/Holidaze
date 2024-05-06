import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/holidaze_logo.png";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import ProfileDropdown from "../ProfileDropdown";
import useAuth from "../../store/auth";
import useHandleLogout from "../../hooks/useHandleLogout";
import { scrollToTop } from "../../utils/scrollToTop";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { isAuthenticated, profile } = useAuth();
  const handleLogout = useHandleLogout();
  const location = useLocation();

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

  const handleNavLinks = (path) => {
    scrollToTop(path, location.pathname);
    setIsNavOpen(false);
  };

  return (
    <>
      <nav className="bg-neutral">
        <div className="w-full flex flex-wrap items-center justify-between mx-auto">
          <button type="button" onClick={() => setIsNavOpen(true)} id="navbar-toggler" className="lg:hidden">
            <IoMenu size={30} className="text-primary" />
          </button>

          <Link to="/" onClick={() => handleNavLinks("/")}>
            <img src={Logo} alt="Holidaze logotype" className="h-8" />
          </Link>

          <div className="hidden lg:block grow">
            <SearchBar />
          </div>

          <div className="flex items-center">
            <div
              id="navbar-menu"
              className={`${
                isNavOpen ? "flex p-5 h-screen absolute left-0 top-0 z-50" : "hidden"
              } bg-secondary lg:bg-neutral lg:flex flex-col lg:flex-row items-center lg:w-full lg:p-0 lg:h-full lg:relative gap-5`}>
              <div className="flex w-full justify-end mb-16 lg:hidden">
                <button onClick={() => setIsNavOpen(false)} aria-label="Close menu">
                  <IoClose size={40} className="text-primary" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-5 lg:items-center grow justify-between px-5 mb-5 lg:mb-0 lg:p-0">
                <ul className="flex flex-col gap-5 lg:flex-row">
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => handleNavLinks("/")}
                      className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="about"
                      onClick={() => handleNavLinks("/about")}
                      className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="contact"
                      onClick={() => handleNavLinks("/contact")}
                      className={({ isActive }) => `font-bold text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`}>
                      Contact
                    </NavLink>
                  </li>
                </ul>

                {!isAuthenticated ? (
                  <div className="flex flex-col lg:flex-row gap-2">
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
                      to={`/profile/${profile.name}`}
                      onClick={() => setIsNavOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-2 lg:hidden text-text ${isActive ? "opacity-50" : "text-primary hover:opacity-50 transition-colors duration-300 ease-in-out"}`
                      }>
                      <figure className="w-10 h-10">
                        <img src={profile.avatar} alt={`${profile.name} avatar`} className="w-full h-full rounded-full object-center object-cover" />
                      </figure>
                      {profile.name}
                    </NavLink>

                    <button onClick={() => handleLogout()} className="lg:hidden btn btn-outlined text-sm bg-secondary">
                      Log out
                    </button>

                    <ProfileDropdown />
                  </div>
                )}
              </div>
            </div>

            <button type="button" id="search-toggler" className="lg:hidden">
              <IoSearch size={30} className="text-primary" onClick={() => setIsSearchVisible(!isSearchVisible)} />
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full mt-5 lg:hidden">{isSearchVisible && <SearchBar />}</div>
    </>
  );
}
