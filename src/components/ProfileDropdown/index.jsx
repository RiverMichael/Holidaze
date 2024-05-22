import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../store/auth";
import useHandleLogout from "../../hooks/useHandleLogout";
import { IoPersonCircleOutline, IoHomeOutline, IoPowerOutline } from "react-icons/io5";

export default function ProfileDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isVenueManager } = useAuth();
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
      <button type="button" className="hidden lg:flex text-sm" id="user-menu-button" onClick={() => setIsDropdownOpen((prev) => !prev)} aria-expanded={isDropdownOpen} aria-label="Show user menu">
        <span className="sr-only">Open user menu</span>
        <figure className="w-10 h-10">
          <img src={user.avatar.url} alt={user.avatar.alt || user.name} className="w-full h-full rounded-full object-center object-cover" />
        </figure>
      </button>

      <div
        id="user-menu-dropdown"
        className={`${
          isDropdownOpen ? "block absolute right-0 top-8" : "hidden"
        } z-50 my-4 text-base list-none bg-neutral border border-secondary divide-y divide-secondary rounded-lg shadow-lg  transition-all duration-500 ease-in-out overflow-hidden`}>
        <div className="px-4 py-4">
          <span className="block font-bold text-primary">{user.name}</span>
          <span className="block text-sm  text-text truncate">{user.email}</span>
        </div>
        <ul className="py-3 flex flex-col gap-1" aria-labelledby="user-menu-button">
          <li>
            <NavLink
              to={`/profile/${user.name}`}
              onClick={() => setIsDropdownOpen(false)}
              className={({ isActive }) => `px-4 py-2 link font-normal rounded flex items-center gap-2 ${isActive ? "link-active" : "hover:bg-secondary hover:shadow-sm"}`}>
              <IoPersonCircleOutline size={20} className="text-primary" /> My profile
            </NavLink>
          </li>

          {isVenueManager && (
            <li>
              <NavLink
                to="venues/add"
                onClick={() => setIsDropdownOpen(false)}
                className={({ isActive }) => `px-4 py-2 link font-normal rounded flex items-center gap-2 ${isActive ? "link-active" : " hover:bg-secondary hover:shadow-sm"}`}>
                <IoHomeOutline size={20} className="text-primary" /> Add venue
              </NavLink>
            </li>
          )}

          <li>
            <button onClick={() => handleLogout()} className="px-4 py-2 link font-normal rounded w-full hover:bg-secondary hover:shadow-sm flex items-center gap-2">
              <IoPowerOutline size={20} className="text-primary" /> Log out
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
