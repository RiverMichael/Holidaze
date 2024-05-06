import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../store/auth";
import useHandleLogout from "../../hooks/useHandleLogout";

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { profile } = useAuth();
  const handleLogout = useHandleLogout();

  useEffect(() => {
    const handleOutsideUserMenuDropdownClick = (event) => {
      if (!event.target.closest("#user-menu-dropdown") && !event.target.closest("#user-menu-button")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleOutsideUserMenuDropdownClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideUserMenuDropdownClick);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <button type="button" className="hidden md:flex text-sm" id="user-menu-button" onClick={() => setIsDropdownOpen((prev) => !prev)} aria-expanded={isDropdownOpen} aria-label="Show user menu">
        <span className="sr-only">Open user menu</span>
        <figure className="w-10 h-10">
          <img src={profile.avatar} alt={`${profile.name} avatar`} className="w-full h-full rounded-full object-center object-cover" />
        </figure>
      </button>

      <div
        id="user-menu-dropdown"
        className={`${
          isDropdownOpen ? "block absolute right-0 top-8" : "hidden"
        } z-50 my-4 text-base list-none bg-secondary divide-y divide-gray-400 rounded-lg shadow  transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="px-4 py-3">
          <span className="block text-sm text-primary">{profile.name}</span>
          <span className="block text-sm  text-text truncate">{profile.email}</span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <NavLink
              to={`/profile/${profile.name}`}
              onClick={() => setIsDropdownOpen(false)}
              className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
              My profile
            </NavLink>
          </li>
          <li>
            <NavLink to="venues/add" onClick={() => setIsDropdownOpen(false)} className={({ isActive }) => `block px-4 py-2 text-sm ${isActive ? "opacity-40" : "text-text hover:bg-gray-100"}`}>
              Add Venue
            </NavLink>
          </li>
          <li>
            <button onClick={() => handleLogout()} className="block px-4 py-2 text-sm text-text hover:bg-gray-100 w-full text-left">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
